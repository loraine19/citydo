import { Radio } from "@material-tailwind/react";
import { VoteOpinion } from "../../../../../domain/entities/Vote";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import { VoteDTO } from "../../../../../infrastructure/DTOs/VoteDTO";
import DI from "../../../../../di/ioc";
import { useState } from "react";
import { AlertModal } from "../../../common/AlertModal";
import { AlertValues } from "../../../../../domain/entities/Error";
import { useAlertStore } from "../../../../../application/stores/alert.store";

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
        <Radio>
            <div className="flex md:gap-10 overflow-auto">
                <Radio.Item
                    name="vote"
                    label="Contre"
                    value={VoteOpinion.NO}
                    color='red'
                    checked={voteDTO.opinion === VoteOpinion.NO}
                    onChange={() => setOpinion(VoteOpinion.NO)}
                />
                <Radio.Item
                    name="vote"
                    label="pas d'avis"
                    value={VoteOpinion.NO}
                    color='orange'
                    checked={voteDTO.opinion === VoteOpinion.WO}
                    onChange={() => setOpinion(VoteOpinion.WO)}
                />
                <Radio.Item
                    name="vote"
                    label="Pour"
                    value={VoteOpinion.OK}
                    color='green'
                    checked={voteDTO.opinion === VoteOpinion.OK}
                    onChange={() => setOpinion(VoteOpinion.OK)}
                />
            </div>
        </Radio>
    const [voteNotification] = useState<string | undefined>(undefined)

    const alertValues: AlertValues = {
        handleConfirm: async () => {
            const ok = vote.IVoted ? await updateVote(voteDTO) : await postVote(voteDTO)
            if (ok.error) {
                handleApiError(ok.error.message)
            }
            else {
                refetch(opinion);
                close();
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
