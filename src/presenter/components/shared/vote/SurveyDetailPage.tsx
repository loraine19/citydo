import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CTAMines from '../../common/CTA';
import SubHeader from '../../common/SubHeader';
import SurveyDetailCard from './voteCards/SurveyDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import { Skeleton } from '../../common/Skeleton';
import { GenereMyActions, } from '../../../views/viewsEntities/utilsService';
import DI from '../../../../di/ioc';
import { VoteCard } from './voteCards/VoteCard';
import { Button } from '@material-tailwind/react';
import { Icon } from '../../common/IconComp';
import { PoolSurveyStatus } from '../../../../domain/entities/PoolSurvey';


export default function SurveyDetailPage() {
    const pageColor = 'orange'

    //// PARAMS
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0

    //// VIEW MODEL 
    const surveyIdViewModelFactory = DI.resolve('surveyIdViewModel');
    const { survey, isLoading, refetch, error } = surveyIdViewModelFactory(idS);
    const deleteSurvey = async (id: number) => await DI.resolve('deleteSurveyUseCase').execute(id)

    //// FUNCTIONS
    const myActions: Action[] = GenereMyActions(survey, "vote/sondage", deleteSurvey)
    const [openVote, setOpenVote] = useState(false);


    return (
        <>
            <VoteCard
                open={openVote}
                close={() => setOpenVote(false)}
                vote={survey}
                refetch={refetch} />
            <main>
                <div className='sectionHeader'>
                    <SubHeader
                        type={`sondage ${survey?.categoryS}`}
                        link='/vote'
                        closeBtn />
                </div>
                <section>
                    {isLoading || !survey || error ?
                        <Skeleton
                            className='!rounded-2xl flex pt-8 pb-1 h-full' /> :
                        <SurveyDetailCard
                            setOpen={setOpenVote}
                            survey={survey} />
                    }
                </section>
                {survey?.mine ?
                    <CTAMines actions={myActions} /> :
                    <footer className={`CTA `}>
                        <Button
                            disabled={survey?.status !== PoolSurveyStatus.PENDING}
                            size='lg'
                            className={`bg-${pageColor} lgBtn w-respLarge min-h-max`}
                            onClick={() => setOpenVote(true)} >
                            <Icon
                                size='lg'
                                fill
                                color='white'
                                icon={survey.IVoted ? 'edit' : 'smart_card_reader'} />
                            {survey.IVoted ? 'Modifier mon vote' :
                                survey?.status !== PoolSurveyStatus.PENDING ?
                                    'Ce sondage est terminé' : 'Voter'}
                        </Button>
                    </footer>
                }
            </main>
        </>

    );
}

