import { useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Action } from '../../../../domain/entities/frontEntities';
import CTAMines from '../../common/CTA';
import SubHeader from '../../common/SubHeader';
import PoolDetailCard from './voteCards/PoolDetailCard';
import { GenereMyActions } from '../../../views/viewsEntities/utilsService';
import DI from '../../../../di/ioc';
import { Skeleton, SkeletonGrid } from '../../common/Skeleton';
import { PoolSurveyStatus } from '../../../../domain/entities/PoolSurvey';
import { HandleHideParams } from '../../../../application/useCases/utils.useCase';
import { useUxStore } from '../../../../application/stores/ux.store';
import { VoteValues } from './voteCards/VoteCard';
import { useAlertStore } from '../../../../application/stores/alert.store';

export default function PoolDetailPage() {

    //// PARAMS
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0

    //// VIEW MODEL
    const poolIdViewModelFactory = DI.resolve('poolIdViewModel');
    const { pool, isLoading, refetch, error } = poolIdViewModelFactory(idS)

    //// FUNCTIONS
    const deletePool = async (id: number) => await DI.resolve('deletePoolUseCase').execute(id)
    const myActions: Action[] = pool && GenereMyActions(pool, "vote/cagnotte", deletePool)

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

    //// HANDLE VOTE
    const { setAlertValues } = useAlertStore(state => state)
    const handleVote = () => setAlertValues(VoteValues(pool, refetch))

    return (<>

        <main>
            <div className='sectionHeader'>
                <SubHeader
                    type={`Cagnotte `}
                    link={`/vote`}
                    closeBtn />
            </div>
            <section
                ref={divRef}
                onScroll={() => {
                    handleHideCallback()
                }}>
                <div className="DetailCardDiv ">
                    {isLoading || !pool || error ?
                        <Skeleton /> :
                        <PoolDetailCard
                            setOpen={handleVote}
                            pool={pool} />
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
                {(pool?.mine && !pool?.close) ?
                    <CTAMines actions={myActions} /> :

                    <CTAMines actions={[{
                        disabled: pool?.close,
                        function: () => { },
                        directFunction: () => handleVote(),
                        icon: pool?.IVoted ? 'Modifier mon vote' :
                            pool?.status !== PoolSurveyStatus.PENDING ?
                                'Cette cagnotte est terminé' : 'Voter'
                        ,
                        iconImage: pool?.close ? 'block' : pool.IVoted ? 'edit' : 'smart_card_reader',

                    }]} />

                }
            </footer>
        </main>
    </>
    )
}

