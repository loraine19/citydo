import { useParams } from 'react-router-dom';
//import parse from 'html-react-parser';
import CTAMines from '../../common/CTA';
import { EventDetailCard } from './eventComps/EventDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { GenereMyActions } from '../../../views/viewsEntities/utilsService';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { EventCategory, EventStatus } from '../../../../domain/entities/Event';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EventView } from '../../../views/viewsEntities/eventViewEntities';
import { HandleHideParams } from '../../../../application/useCases/utils.useCase';
import { useUxStore } from '../../../../application/stores/ux.store';
import { useNavStore } from '../../../../application/stores/nav.store';
import FormHeadSection from '../base/baseComps/FormHeadSection';


export default function EventDetailPage() {
    //// PARAMS 
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0;

    //// VIEW MODEL
    const eventIdViewModelFactory = DI.resolve('eventIdViewModel');
    const { event, isLoading, refetch, error, update } = eventIdViewModelFactory(idS);
    const deleteEvent = async (id: number) => await DI.resolve('deleteEventUseCase').execute(id);
    const myActions = event && GenereMyActions(event, "evenement", deleteEvent)

    //// HANDLE API ERROR
    const { handleApiError } = useAlertStore(state => state);
    const [notif, setNotif] = useState<string>('');

    //// NOTIFICATION
    useEffect(() => {
        if (error) setNotif(error.message)
        else setNotif('');
        event && setButtons(buttonsGenerator(event));
    }, [isLoading, error]);

    //// UPDATE EVENT
    const updateEvent = async () => {
        const data = await update()
        const array = buttonsGenerator(data as EventView)
        setButtons([...array]);
    }

    //// ACTIONS
    const buttonsGenerator = (eventUp: EventView): Action[] => [
        {
            iconImage: eventUp?.Igo ? 'person_cancel' : 'person_add',
            icon: eventUp?.Igo ? 'Annuler votre participation' : 'Participer',
            title: eventUp?.Igo ? `Annuler votre participation ` : `Participer à l'évenement`,
            body: eventUp?.Igo ? `Voulez-vous vraiment annuler votre participation à ${eventUp?.title}` :
                `Confirmer votre participation à ${eventUp?.title}`,
            function: async () => {
                const data = await eventUp?.toogleParticipate();
                try {
                    if (data) updateEvent()
                } catch (error) {
                    handleApiError(error ?? 'Erreur lors de la mise à jour de votre participation')
                }
            }
        }
    ]
    const [buttons, setButtons] = useState<Action[]>(buttonsGenerator(event as EventView))

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

    //// HANDLE EXPAND CARD 
    const [expanded, setExpanded] = useState<boolean>(false);

    //// TO NAV BAR
    const { setDetailSection } = useNavStore((state) => state);

    const SearchSection = useMemo(() => (
        <FormHeadSection
            isLoading={isLoading}
            notif={notif}
            refetch={refetch}
            error={error}
            infosChipValue={`évenement / ${EventCategory[event?.category as keyof typeof EventCategory] ?? '...'} / ${event?.Address?.city ?? '...'} `} >
        </FormHeadSection>
    ), [isLoading]);

    useEffect(() => {
        setDetailSection(SearchSection);
        return () => {
            setDetailSection(undefined);
        }
    }, [SearchSection, isLoading]);
    return (
        <>
            <main


                data-cy="event-details-page">

                <section
                    id='refDiv'
                    className={expanded ? 'overflow-auto' : 'overflow-hidden'}
                    ref={divRef}
                    onScroll={() => {
                        handleHideCallback();
                    }}>
                    <div
                        className={`DetailCardDiv hideCTA   `}>
                        {!isLoading && event ?
                            <EventDetailCard

                                EventLoad={event}
                                refetch={async () => await updateEvent()}
                                expand={expanded}
                                setExpand={setExpanded} />
                            :
                            <Skeleton />}
                    </div>



                </section>
            </main >
            <footer className={`footer ${hideNavBottom ? 'hidden' : ''}`} >
                {(!isLoading && event && !error) && <>
                    {event?.mine && !isLoading ?
                        <CTAMines
                            actions={myActions}
                            disabled1={event?.status !== EventStatus.PENDING}
                            disabled2={event?.status !== EventStatus.PENDING} />
                        :
                        <CTAMines
                            disabled1={false}
                            disabled2={event?.Igo}
                            actions={buttons} />
                    }
                </>}
            </footer>

        </>
    );
}