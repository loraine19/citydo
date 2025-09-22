import { useParams } from 'react-router-dom';
import CTAMines from '../../../common/CTA';
import SubHeader from '../../../common/appComps/SubHeader';
import { Action } from '../../../../../domain/entities/frontEntities';
import { GenereMyActions, } from '../../../../views/viewsEntities/utilsService';
import DI from '../../../../../di/ioc';
import { Skeleton, SkeletonGrid } from '../../../common/Skeleton';
import { useAlertStore } from '../../../../../application/stores/alert.store';
import GroupDetailCard from './GroupDetailCard';
import { useRef, useCallback } from 'react';
import { useUxStore } from '../../../../../application/stores/ux.store';
import { HandleHideParams } from '../../../../../application/useCases/utils.useCase';

export default function GroupDetailPage() {
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0;
    const groupIdViewModelFactory = DI.resolve('groupIdViewModel');
    const { group, isLoading, error, refetch } = groupIdViewModelFactory(idS);
    const deleteGroup = async (id: number) => await DI.resolve('deleteGroupUseCase').execute(id);
    const { setOpen, open } = useAlertStore(state => state);
    const handleOpen = () => setOpen(!open)
    const myActions = group && GenereMyActions(group, "groupe", deleteGroup)



    //// CONTACT ACTIONS
    const MemberShipActions: Action[] = !group ? [] : [
        {
            iconImage: 'diversity_3',
            icon: group.ImModo ? 'Je suis conciliateur' : 'Devenir conciliateur',
            title: "Confirmer mon rôle " + group?.name,
            body: `En tant que membre du groupe, vous pouvez devenir conciliateur pour aider à résoudre les litiges et les différends  liés aux services au sein du groupe.`,
            function: async () => {
                await group.toogleModo();
                await refetch();
                handleOpen()
            },
            color: group.ImModo ? 'red' : 'orange',
        },
        {
            iconImage: 'groups',
            icon: group.ImIn ? 'Je suis membre' : 'Rejoindre le groupe',
            title: "Rejoindre le groupe " + group?.name,
            body: `En tant que membre du groupe, vous pouvez participer aux discussions, aux décisions et aux activités du groupe.`,
            function: async () => {
                await group.toogleMember();
                await refetch();
                handleOpen()
            },
            color: group.ImIn ? 'red' : 'cyan'
        }
    ]
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
            <main>
                <div className="sectionHeader ">
                    <SubHeader
                        type={`Groupes ${group?.categoryS ?? ""}`} closeBtn />
                </div>
                <section
                    ref={divRef}
                    onScroll={() => {
                        handleHideCallback()
                    }}>
                    <div className={`DetailCardDiv ${!hideNavBottom ? "hideCTA" : ""}`}>
                        {!isLoading && !error && group ?
                            <GroupDetailCard
                                actions={myActions}
                                refetch={refetch}
                                group={group} /> :
                            <Skeleton />}
                    </div>
                    {/* ARTICLES */}
                    <article className='grid grid-rows-[auto,1fr] py-5  lg:-ml-5'>
                        <h3>Articles</h3>
                        <SkeletonGrid count={3} />
                    </article>
                </section>
            </main>
            {(!isLoading && !error && group) &&
                <footer className={` ${hideNavBottom ? 'hidden' : ''}`}>
                    {group?.ImModo ?
                        <CTAMines
                            actions={myActions} /> :
                        <CTAMines
                            actions={MemberShipActions}
                        />
                    }
                </footer>}

        </>
    )
}

