import { Radio, Typography } from "@material-tailwind/react";
import { VoteOpinion } from "../../../../../domain/entities/Vote";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import { VoteDTO } from "../../../../../infrastructure/DTOs/VoteDTO";
import DI from "../../../../../di/ioc";
import { useState } from "react";
import { AlertModal } from "../../../common/AlertModal";
import { AlertValues } from "../../../../../domain/entities/Error";
import { useAlertStore } from "../../../../../application/stores/alert.store";
import { Icon } from "../../../common/IconComp";

export const VoteCard = ({ vote, refetch, open, close }: { vote: PoolSurveyView, refetch: (opinion: VoteOpinion) => void, open: boolean, close: () => void }) => {
    const [opinion, setOpinion] = useState<VoteOpinion>(vote.myOpinion ?? VoteOpinion.OK)

    const { handleApiError } = useAlertStore(state => state)
    const voteDTO: VoteDTO = new VoteDTO({
        targetId: vote.id,
        target: vote.type,
        opinion
    });
    const postVote = async (data: VoteDTO) => await DI.resolve('postVoteUseCase').execute(data)
    const updateVote = async (data: VoteDTO) => await DI.resolve('updateVoteUseCase').execute(data)

    const body =
        <Radio
            orientation="horizontal"
            className="w-full h-max py-4 px-4 items-center justify-center gap-4 flex md:gap-6 overflow-auto">
            <div className="flex items-center w-full flex-1 gap-2">
                <Radio.Item
                    id="no"
                    name="vote-no"
                    value={VoteOpinion.NO}
                    color='red'
                    checked={voteDTO.opinion === VoteOpinion.NO}
                    onChange={() => setOpinion(VoteOpinion.NO)}
                >
                    <Radio.Indicator
                        className="!border border-red-500/50 rounded-full flex !bg-white ">
                        <Icon
                            fill
                            size="lg"
                            color='red'
                            icon='check_circle'
                        />
                    </Radio.Indicator>
                    <Typography
                        as="label"
                        htmlFor="no"
                        className="text-sm font-normal text-gray-600 pl-8">
                        Contre
                    </Typography>
                </Radio.Item>
            </div>
            <div className="flex items-center w-full flex-1 gap-2">
                <Radio.Item
                    id="wo"
                    name="vote-wo"
                    value={VoteOpinion.WO}
                    color='orange'
                    checked={voteDTO.opinion === VoteOpinion.WO}
                    onChange={() => setOpinion(VoteOpinion.WO)}
                >
                    <Radio.Indicator
                        className="!border border-orange-500/50 rounded-full flex !bg-white ">
                        <Icon
                            fill
                            size="lg"
                            color='orange'
                            icon='check_circle'
                        />
                    </Radio.Indicator>
                    <Typography
                        as="label"
                        htmlFor="wo"
                        className="text-sm font-normal text-gray-600 pl-8 whitespace-nowrap">
                        Pas d'avis
                    </Typography>
                </Radio.Item>
            </div>
            <div className="flex items-center flex-1 gap-2">
                <Radio.Item
                    id="ok"
                    name="vote-ok"
                    value={VoteOpinion.OK}
                    color='green'
                    checked={voteDTO.opinion === VoteOpinion.OK}
                    onChange={() => setOpinion(VoteOpinion.OK)}
                >
                    <Radio.Indicator
                        className="!border border-green-500/50 rounded-full flex !bg-white ">
                        <Icon
                            fill
                            size="lg"
                            color='green'
                            icon='check_circle'
                        />
                    </Radio.Indicator>
                    <Typography
                        as="label"
                        htmlFor="ok"
                        className="text-sm font-normal text-gray-600 pl-8">
                        Pour
                    </Typography>
                </Radio.Item>
            </div>
        </Radio>
    const [voteNotification] = useState<string | undefined>(undefined)

    const alertValues: AlertValues = {
        handleConfirm: async () => {
            try {
                const data = vote.IVoted ? await updateVote(voteDTO) : await postVote(voteDTO)
                if (!data) handleApiError('Erreur lors de la soumission du vote')
                await refetch(opinion);
                close();
            } catch (error) {
                close()
                handleApiError(error ?? 'Erreur lors de la soumission du vote')
            }
        },
        title: `${vote.IVoted ? 'Modifier mon vote ' : 'Voter'} pour ${vote.title} `,
        confirmString: vote.IVoted ? 'Modifier' : 'Confirmer',
        element: body,
        disableConfirm: false,
        isOpen: open,
        close: close,
        notif: voteNotification
    }
    return (
        <div className="bg-cyan-100">
            <AlertModal values={alertValues} />
        </div>
    )
}
