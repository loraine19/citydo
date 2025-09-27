import { useParams } from 'react-router-dom';
import CTAMines from '../../../common/CTA';
import GroupDetailCard from './GroupDetailCard';
import { Action } from '../../../../../domain/entities/frontEntities';
import DI from '../../../../../di/ioc';
import { Skeleton } from '../../../common/Skeleton';
import { GenereMyActions } from '../../../../views/viewsEntities/utilsService';
import { useAlertStore } from '../../../../../application/stores/alert.store';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HandleHideParams } from '../../../../../application/useCases/utils.useCase';
import { useUxStore } from '../../../../../application/stores/ux.store';
import { useNavStore } from '../../../../../application/stores/nav.store';
import FormHeadSection from '../../base/baseComps/FormHeadSection';

export default function GroupDetailPage() {
    // PARAMS
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0;

    // VIEW MODEL
    const groupIdViewModelFactory = DI.resolve('groupIdViewModel');
    const { group, isLoading, error, refetch, update } = groupIdViewModelFactory(idS);
    const deleteGroup = async (id: number) => await DI.resolve('deleteGroupUseCase').execute(id);
    const myActions = group && GenereMyActions(group, "groupe", deleteGroup);

    // HANDLE API ERROR
    const { handleApiError } = useAlertStore(state => state);
    const [notif, setNotif] = useState<string>('');

    // NOTIFICATION
    useEffect(() => {
        if (error) setNotif(error.message);
        else setNotif('');
        group && setButtons(buttonsGenerator(group));
    }, [isLoading, error]);

    // UPDATE GROUP
    const updateGroup = async () => {
        const data = await update();
        const array = buttonsGenerator(data);
        setButtons([...array]);
    };

    // ACTIONS
    const buttonsGenerator = (groupUp: any): Action[] => [
        {
            iconImage: groupUp?.ImModo ? 'person_cancel' : 'person_add',
            icon: groupUp?.ImModo ? 'Quitter conciliateur' : 'Devenir conciliateur',
            title: groupUp?.ImModo ? `Quitter le rôle de conciliateur` : `Devenir conciliateur`,
            body: groupUp?.ImModo
                ? `Voulez-vous vraiment quitter le rôle de conciliateur dans ${groupUp?.name} ?`
                : `Confirmer votre rôle de conciliateur dans ${groupUp?.name}`,
            function: async () => {
                try {
                    await groupUp?.toogleModo();
                    await updateGroup();
                } catch (error) {
                    handleApiError(error ?? 'Erreur lors de la mise à jour de votre rôle');
                }
            }
        },
        {
            iconImage: groupUp?.ImIn ? 'person_cancel' : 'person_add',
            icon: groupUp?.ImIn ? 'Quitter le groupe' : 'Rejoindre le groupe',
            title: groupUp?.ImIn ? `Quitter le groupe` : `Rejoindre le groupe`,
            body: groupUp?.ImIn
                ? `Voulez-vous vraiment quitter le groupe ${groupUp?.name} ?`
                : `Confirmer votre participation au groupe ${groupUp?.name}`,
            function: async () => {
                try {
                    await groupUp?.toogleMember();
                    await updateGroup();
                } catch (error) {
                    handleApiError(error ?? 'Erreur lors de la mise à jour de votre participation');
                }
            }
        }
    ];
    const [buttons, setButtons] = useState<Action[]>(buttonsGenerator(group));

    // HANDLE SCROLL
    const utils = DI.resolve('utils');
    const divRef = useRef(null);

    // HANDLE HIDE
    const { hideNavBottom, setHideNavBottom } = useUxStore();
    const handleHide = (params: HandleHideParams) => utils.handleHide(params);
    const handleHideCallback = useCallback(() => {
        const params: HandleHideParams = { divRef, setHide: setHideNavBottom };
        handleHide(params);
    }, [divRef]);

    // HANDLE EXPAND CARD
    const [expanded, setExpanded] = useState<boolean>(false);

    // TO NAV BAR
    const { setDetailSection } = useNavStore((state) => state);

    const SearchSection = useMemo(() => (
        <FormHeadSection
            isLoading={isLoading}
            notif={notif}
            refetch={refetch}
            error={error}
            infosChipValue={` groupe  ${group?.categoryS ? ('/' + group?.categoryS) : ''} `} >
        </FormHeadSection>
    ), [isLoading, notif, refetch, error]);

    useEffect(() => {
        setDetailSection(SearchSection);
        return () => {
            setDetailSection(undefined);
        }
    }, [SearchSection, isLoading]);

    return (
        <>
            <main data-cy="group-details-page">
                <section
                    id='refDiv'
                    className={expanded ? 'overflow-auto' : 'overflow-hidden'}
                    ref={divRef}
                    onScroll={() => {
                        handleHideCallback();
                    }}>
                    <div className={`!h-full hBottomFab flex pt-4 `}>
                        {!isLoading && group && !error ?
                            <GroupDetailCard
                                group={group}
                                refetch={async () => await updateGroup()}
                                expand={expanded}
                                setExpand={setExpanded}
                                actions={myActions}
                            />
                            :
                            <Skeleton />}
                    </div>
                </section>
            </main>
            <footer className={`footer ${hideNavBottom ? 'hidden' : ''}`}>
                {(!isLoading && group && !error) && (
                    <CTAMines
                        actions={buttons}
                        disabled1={false}
                        disabled2={group?.ImModo}
                    />
                )}
            </footer>
        </>
    );
}
