import { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import CTAMines from '../../common/CTA';
import SubHeader from '../../common/SubHeader';
import SurveyDetailCard from './voteCards/SurveyDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import { Skeleton, SkeletonGrid } from '../../common/Skeleton';
import { GenereMyActions, } from '../../../views/viewsEntities/utilsService';
import DI from '../../../../di/ioc';
import { VoteCard } from './voteCards/VoteCard';
import { PoolSurveyStatus } from '../../../../domain/entities/PoolSurvey';
import { HandleHideParams } from '../../../../application/useCases/utils.useCase';
import { useUxStore } from '../../../../application/stores/ux.store';


export default function SurveyDetailPage() {

    //// PARAMS
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0

    //// VIEW MODEL 
    const surveyIdViewModelFactory = DI.resolve('surveyIdViewModel');
    const { survey, isLoading, refetch, error } = surveyIdViewModelFactory(idS);
    const deleteSurvey = async (id: number) => await DI.resolve('deleteSurveyUseCase').execute(id)

    //// FUNCTIONS
    const myActions: Action[] = GenereMyActions(survey, "vote/sondage", deleteSurvey)
    const [openVote, setOpenVote] = useState(false)

    //// HANDLE SCROLL
    const utils = DI.resolve('utils')
    const divRef = useRef(null);

    //// HANDLE HIDE 
    const { hideNavBottom, setHideNavBottom } = useUxStore()
    const handleHide = (params: HandleHideParams) => utils.handleHide(params)
    const handleHideCallback = useCallback(() => {
        const params: HandleHideParams = { divRef, setHide: setHideNavBottom }
        handleHide(params)
    }, [divRef]);


    return (
        <>
            <VoteCard
                open={openVote}
                close={() => setOpenVote(false)}
                vote={survey}
                refetch={refetch} />
            <main >
                <div className="sectionHeader">
                    <SubHeader
                        hideImage={!hideNavBottom || !survey?.image}
                        image={survey?.image}
                        type={`sondage ${survey?.categoryS}`}
                        link='/vote'
                        closeBtn />
                </div>
                <section
                    ref={divRef}
                    onScroll={() => {
                        handleHideCallback()
                    }}>
                    <div className="DetailCardDiv ">
                        {isLoading || !survey || error ?
                            <Skeleton
                                className='!rounded-2xl flex pt-8 pb-1 h-full' /> :
                            <SurveyDetailCard
                                setOpen={setOpenVote}
                                survey={survey} />
                        }
                    </div>

                    {/* ARTICLES */}
                    <article className='grid grid-rows-[auto,1fr] py-5  lg:-ml-5'>
                        <SubHeader
                            type="Autres cagnottes"
                            place={'dans ce groupe '} />
                        <SkeletonGrid count={3} />
                    </article>

                </section>

                <footer className={`footer ${hideNavBottom ? 'hidden' : ''}`} >
                    {survey?.mine ?
                        <CTAMines actions={myActions} /> :
                        <CTAMines actions={[{
                            disabled: survey?.status !== PoolSurveyStatus.PENDING,
                            function: () => setOpenVote(true),
                            icon: survey?.IVoted ? 'Modifier mon vote' :
                                survey?.status !== PoolSurveyStatus.PENDING ?
                                    'Ce sondage est terminé' : 'Voter'
                            ,
                            iconImage: survey.IVoted ? 'edit' : 'smart_card_reader',


                        }
                        ]} />

                    }
                </footer>
            </main>
        </>

    );
}

