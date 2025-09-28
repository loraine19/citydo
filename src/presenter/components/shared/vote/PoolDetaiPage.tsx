import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Action } from '../../../../domain/entities/frontEntities';
import CTAMines from '../../common/CTA';
import PoolDetailCard from './voteCards/PoolDetailCard';
import { GenereMyActions } from '../../../views/viewsEntities/utilsService';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { PoolSurveyStatus } from '../../../../domain/entities/PoolSurvey';
import { HandleHideParams } from '../../../../application/useCases/utils.useCase';
import { useUxStore } from '../../../../application/stores/ux.store';
import { VoteValues } from './voteCards/VoteCard';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { useNavStore } from '../../../../application/stores/nav.store';
import FormHeadSection from '../base/baseComps/FormHeadSection';

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

    //// HANDLE EXPAND CARD
    const [expand, setExpand] = useState(false);

    //// TO NAV BAR
    const { setDetailSection } = useNavStore((state) => state);

    const SearchSection = useMemo(() => (
        <FormHeadSection
            isLoading={isLoading}
            notif={error}
            refetch={refetch}
            error={error}
            infosChipValue={`cagnotte / pour ${pool?.UserBenef?.Profile?.firstName ?? '...'} `} >
        </FormHeadSection>
    ), [isLoading, hideNavBottom]);

    useEffect(() => {
        setDetailSection(SearchSection);
        return () => {
            setDetailSection(undefined);
        }
    }, [SearchSection, isLoading, hideNavBottom]);

    return (<>

        <main data-cy="pool-details-page" className={`hBottomFab`}>
            <section
                id='refDiv'
                className={`${expand ? 'overflow-auto' : ''}`}
                ref={divRef}
                onScroll={() => {
                    handleHideCallback()
                }}>

                <div className={`!h-full  flex py-3 `}>
                    {isLoading || !pool || error ?
                        <Skeleton /> :
                        <PoolDetailCard
                            expand={expand}
                            setExpand={setExpand}
                            setOpen={handleVote}
                            pool={pool} />
                    }
                </div>
            </section>
            <footer className={`footer ${hideNavBottom ? 'hidden' : ''}`} >
                {(pool?.mine && !pool?.close) ?
                    <CTAMines actions={myActions} /> :

                    <CTAMines actions={[{
                        disabled: pool?.close,
                        direct: true,
                        function: () => handleVote(),
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

