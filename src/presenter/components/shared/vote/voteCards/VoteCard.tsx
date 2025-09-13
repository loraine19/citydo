import { Radio, Typography } from "@material-tailwind/react";
import { VoteOpinion } from "../../../../../domain/entities/Vote";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import { VoteDTO } from "../../../../../infrastructure/DTOs/VoteDTO";
import DI from "../../../../../di/ioc";
import { useState } from "react";
import { useAlertStore } from "../../../../../application/stores/alert.store";
import { Icon } from "../../../common/IconComp";
import { AlertValues } from "../../../../../domain/entities/Error";

const body = (
    voteDTO: VoteDTO, setOpinion: (opinion: VoteOpinion) => void
) => (
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
                onChange={() => {
                    voteDTO.opinion = VoteOpinion.NO;
                    setOpinion(VoteOpinion.NO);
                }}
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
                onChange={() => {
                    voteDTO.opinion = VoteOpinion.WO;
                    setOpinion(VoteOpinion.WO);
                }}
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
                onChange={() => {
                    voteDTO.opinion = VoteOpinion.OK;
                    setOpinion(VoteOpinion.OK);
                }}
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
    </Radio>)

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
        confirmString: vote.IVoted ? 'Modifier' : 'Confirmer - ',
        element: body(voteDTO, setOpinion),
        disableCancel: false,
        close: () => setOpen(false)
    }
}



