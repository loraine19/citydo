//src/infrastructure/services/serviceService.ts
import { Flag } from "../../../domain/entities/Flag";
import { Service, ServiceCategory, ServiceStep, ServiceType, SkillLevel, HardLevel } from "../../../domain/entities/Service"
import { AssistanceLevel, Profile } from "../../../domain/entities/Profile";
import { User } from "../../../domain/entities/User";


export class ServiceView extends Service {
    actif?: boolean;
    IResp: boolean;
    flagged: boolean;
    mine: boolean;
    isLate: boolean;
    points: number[];
    categoryS: string;
    typeS: string;
    statusS: string
    statusValue: number
    isNew: boolean;
    isResp: boolean;
    isValidated: boolean;
    isFinish: boolean;
    inIssue: boolean;

    constructor(service: Service, user: User) {
        super(service);
        if (!service) throw new Error('Impossible de récupérer le service')
        this.IResp = service?.userIdResp ? service.userIdResp === user?.id : false;
        this.flagged = service?.Flags ? service?.Flags?.some((flag: Flag) => flag.userId === user?.id) : false;
        this.mine = service?.userId === user?.id;
        this.points = this.GetPoints(service, user?.Profile);

        this.categoryS = ServiceCategory[service?.category as string as keyof typeof ServiceCategory]
        this.typeS = ServiceType[service?.type as string as keyof typeof ServiceType]
        this.statusS = ServiceStep[service?.status as string as keyof typeof ServiceStep]
        this.statusValue = Object.keys(ServiceStep).indexOf(service?.status as string)

        this.isNew = this.statusS === ServiceStep.STEP_0 ? true : false;
        this.isResp = this.statusS === ServiceStep.STEP_1 ? true : false;
        this.isValidated = this.statusS === ServiceStep.STEP_2 ? true : false;
        this.isFinish = this.statusS === ServiceStep.STEP_3 ? true : false;
        this.inIssue = this.statusS === ServiceStep.STEP_4 ? true : false;
        this.isLate = this.isLateCalc(service?.createdAt, 15) && this.isNew
    }

    private isLateCalc = (date: Date, days: number) => new Date(date) < new Date((new Date().getTime() - days * 24 * 60 * 60 * 1000)) ? true : false

    private GetPoints = (service: Service, user?: Profile): number[] => {
        const userResp = service?.UserResp?.Profile ?? null
        const userP = user ?? service?.User?.Profile
        const hard = parseInt(HardLevel[service?.hard as unknown as keyof typeof HardLevel]) || parseInt(HardLevel.LEVEL_0)
        const skill = parseInt(SkillLevel[service?.skill as unknown as keyof typeof SkillLevel]) || parseInt(SkillLevel.LEVEL_0)
        const userPoints = parseInt(AssistanceLevel[userP?.assistance as keyof typeof AssistanceLevel]) || 0
        const userRespPoints: number = userResp ? parseInt(AssistanceLevel[userResp?.assistance as keyof typeof AssistanceLevel]) : 0
        const base = Number(((hard / 2 + skill / 2) + 1).toFixed(1))
        const points =
            userResp ?
                [base + userRespPoints / 2] :
                ServiceType[service?.type as string as keyof typeof ServiceType] === ServiceType.DO ?
                    [base + userPoints / 2] :
                    [base, (base + 2)]
        return points
    }



}