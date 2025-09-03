//src/infrastructure/services/serviceService.ts
import { User } from "../../../domain/entities/User";
import { Pool, PoolSurveyStatus, Survey, SurveyCategory } from "../../../domain/entities/PoolSurvey";
import { Vote, VoteOpinion, VoteTarget } from "../../../domain/entities/Vote";
import { Flag } from "../../../domain/entities/Flag";
import DI from "../../../di/ioc";
import { VoteDTO } from "../../../infrastructure/DTOs/VoteDTO";
import { Group } from "../../../domain/entities/Group";


export class PoolSurveyView {
    id: number = 0;
    flagged: boolean = false;
    mine: boolean = false;
    IVoted: boolean = false;
    myOpinion?: VoteOpinion | null = null;
    typeS: string = 'cagnotte';
    type: VoteTarget = VoteTarget.POOL;
    pourcent: number = 0;
    needed: number = 0;
    title: string = '';
    description: string = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    Votes: Vote[] = [];
    User: User = {} as User;
    userId: number = 0;
    UserBenef?: User = {} as User;
    userIdBenef?: number = 0;
    image?: string = '';
    category?: SurveyCategory = SurveyCategory.CATEGORY_1;
    categoryS?: string = SurveyCategory[SurveyCategory.CATEGORY_1 as string as keyof typeof SurveyCategory];
    Flags?: Flag[] = [];
    status?: PoolSurveyStatus = PoolSurveyStatus.PENDING;
    toogleVote!: (opinion: VoteOpinion) => Promise<PoolSurveyView>;
    Group: Group = {} as Group;
    close: boolean = false;

    constructor
        (base: Pool | Survey, user: User) {
        if (!base) throw new Error('Impossible de récupérer le sondage ou la cagnotte')
        if ('userIdBenef' in base) {
            Object.assign(this, base);
            this.flagged = false;
            this.typeS = 'cagnotte'
            this.type = VoteTarget.POOL;
            this.toogleVote = async (opinion: VoteOpinion) => {
                const voteDto: VoteDTO = { targetId: base.id, target: VoteTarget.POOL, opinion }
                this.IVoted ? await DI.resolve('updateVoteUseCase').execute(voteDto) : await DI.resolve('postVoteUseCase').execute(voteDto);
                const updatedEvent = await DI.resolve('getPoolByIdUseCase').execute(base.id);
                return new PoolSurveyView(updatedEvent, user)
            }
        }
        if ('category' in base) {
            Object.assign(this, base);
            this.flagged = base?.Flags?.some(flag => flag?.userId === user?.id);
            this.typeS = 'sondage';
            this.type = VoteTarget.SURVEY;
            this.categoryS = SurveyCategory[base.category as string as keyof typeof SurveyCategory];
            this.image = base?.image
            this.toogleVote = async (opinion: VoteOpinion) => {
                const voteDto: VoteDTO = { targetId: base.id, target: VoteTarget.SURVEY, opinion }
                this.IVoted ? await DI.resolve('updateVoteUseCase').execute(voteDto) : await DI.resolve('postVoteUseCase').execute(voteDto);
                const updated = await DI.resolve('getSurveyByIdUseCase').execute(base.id);
                return new PoolSurveyView(updated, user)
            }
        }
        this.mine = base.userId === user?.id || false;
        this.pourcent = Math.round(base?.Votes?.filter(vote => vote.opinion === VoteOpinion.OK).length / (base.neededVotes) * 100);
        this.needed = base.status === PoolSurveyStatus.PENDING ? Math.round(base.neededVotes) - base.Votes.filter(vote => vote.opinion === VoteOpinion.OK).length : 0;
        this.IVoted = base?.Votes?.some(vote => vote.userId === user?.id);
        this.myOpinion = base?.Votes?.find(vote => vote.userId === user?.id)?.opinion || null;
        this.status = base.status;
        this.close = base?.status !== PoolSurveyStatus.PENDING;
    }

}

