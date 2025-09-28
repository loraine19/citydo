
import { VoteOpinion } from "../../../../../domain/entities/Vote";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import { VoteDTO } from "../../../../../infrastructure/DTOs/VoteDTO";
import DI from "../../../../../di/ioc";
import { useState } from "react";
import { useAlertStore } from "../../../../../application/stores/alert.store";
import { AlertValues } from "../../../../../domain/entities/Error";
import { RadioGroup } from "../../../common/adaptatersComps/RadioGroup";

interface BodyProps {
    voteDTO: VoteDTO;
    setOpinion: (opinion: VoteOpinion) => void;
}

const BodyVote = ({ voteDTO, setOpinion }: BodyProps) => {
    const [opinion, setLocalOpinion] = useState<VoteOpinion>(voteDTO.opinion);
    return (
        <RadioGroup
            variant="text"
            orientation='vertical'
            className="w-full flex-1 gap-3 !p-3 hover:!bg-none"
            value={opinion}
            setValue={setOpinion}
            onChangeProps={(value) => {
                const val = value as VoteOpinion;
                voteDTO.opinion = val;
                setLocalOpinion(value as VoteOpinion);
                setOpinion(val);
            }}
            options={[
                { id: 'NO', label: 'Contre', value: VoteOpinion.NO, color: 'error' },
                { id: 'WO', label: 'Pas d\'avis', value: VoteOpinion.WO, color: 'orange' },
                { id: 'OK', label: 'Pour', value: VoteOpinion.OK, color: 'green' }
            ]}
        >

        </RadioGroup>
    );
}

export const VoteValues = (vote: PoolSurveyView,
    refetch: (opinion: VoteOpinion) => void): AlertValues => {
    const postVote = async (data: VoteDTO) => await DI.resolve('postVoteUseCase').execute(data)
    const updateVote = async (data: VoteDTO) => await DI.resolve('updateVoteUseCase').execute(data)
    const { handleApiError, setOpen } = useAlertStore(state => state)
    const [opinion, setOpinion] = useState<VoteOpinion>(vote.myOpinion ?? VoteOpinion.OK)

    const voteDTO: VoteDTO = new VoteDTO({
        targetId: vote.id,
        target: vote.type,
        opinion
    });

    return {
        handleConfirm: async () => {
            try {
                const data = vote.IVoted ? await updateVote(voteDTO) : await postVote(voteDTO)
                if (!data) handleApiError('Erreur lors de la soumission du vote')
                refetch(opinion);
                close();
            } catch (error) {
                setOpen(false)
                handleApiError(error ?? 'Erreur lors de la soumission du vote')
            }
        },
        title: `${vote.IVoted ? 'Modifier mon vote ' : 'Voter'} pour ${vote.title} `,
        confirmString: vote.IVoted ? 'Modifier' : 'Confirmer ',
        element: <BodyVote voteDTO={voteDTO} setOpinion={setOpinion} />,
        disableCancel: false,
        disableConfirm: false,
        close: () => setOpen(false)
    }
}



