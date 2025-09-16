import { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import CTAMines from '../../common/CTA';
import SubHeader from '../../common/SubHeader';
import SurveyDetailCard from './voteCards/SurveyDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import { Skeleton, SkeletonGrid } from '../../common/Skeleton';
import { GenereMyActions, } from '../../../views/viewsEntities/utilsService';
import DI from '../../../../di/ioc';
import { VoteValues } from './voteCards/VoteCard';
import { HandleHideParams } from '../../../../application/useCases/utils.useCase';
import { useUxStore } from '../../../../application/stores/ux.store';
import { useAlertStore } from '../../../../application/stores/alert.store';


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
    const { setAlertValues, setOpen } = useAlertStore()

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

    //// VOTE VALUES
    const voteValues = VoteValues(survey, refetch);

    //// HANDLE EXPAND CARD 
    const [expand, setExpand] = useState(false);

    return (
        <>
            <main >
                <div className="sectionHeader">
                    <SubHeader
                        type={`sondage ${survey?.categoryS}`}
                        link='/vote'
                        closeBtn />
                </div>
                <section
                    id='refDiv'
                    className={`${expand ? 'overflow-auto' : ''}`}
                    ref={divRef}
                    onScroll={() => {
                        handleHideCallback()
                    }}>

                    <div className={`DetailCardDiv ${!hideNavBottom ? survey.isMine ? "hideCTA" : "hideCTA" : ""}`}>
                        {isLoading || !survey || error ?
                            <Skeleton
                                className='!rounded-3xl flex pt-8 pb-1 h-full' /> :
                            <SurveyDetailCard
                                expand={expand}
                                setExpand={setExpand}
                                setOpen={setOpen}
                                survey={survey} />
                        }
                    </div>

                    {/* ARTICLES */}
                    <article className='grid grid-rows-[auto,1fr] py-5  lg:-ml-5'>
                        <h3>Articles</h3>
                        <SkeletonGrid count={3} />
                    </article>

                </section>

                <footer className={`footer ${hideNavBottom ? 'hidden' : ''}`} >
                    {(survey?.mine && !survey?.close) ?
                        <CTAMines actions={myActions} /> :
                        <CTAMines

                            actions={[{
                                disabled: survey?.close,
                                direct: true,
                                function: () => {
                                    console.log(voteValues)
                                    setAlertValues(voteValues)
                                    setOpen(true)

                                },
                                icon: survey?.IVoted ? 'Modifier mon vote' :
                                    survey?.close ?
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

