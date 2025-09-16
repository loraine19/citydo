import { useParams } from 'react-router-dom';
//import parse from 'html-react-parser';
import CTAMines from '../../common/CTA';
import SubHeader from '../../common/SubHeader';
import { EventDetailCard } from './eventComps/EventDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import DI from '../../../../di/ioc';
import { Skeleton, SkeletonGrid } from '../../common/Skeleton';
import { GenereMyActions } from '../../../views/viewsEntities/utilsService';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { EventStatus } from '../../../../domain/entities/Event';
import { useCallback, useEffect, useRef, useState } from 'react';
import NotifDiv from '../../common/NotifDiv';
import { EventView } from '../../../views/viewsEntities/eventViewEntities';
import { HandleHideParams } from '../../../../application/useCases/utils.useCase';
import { useUxStore } from '../../../../application/stores/ux.store';


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

    return (
        <>
            <main data-cy="event-details-page">
                <div className="sectionHeader">
                    <SubHeader
                        type={`évenement ${event?.label ?? ''}`}
                        place={`${event?.Address?.address ?? ''} ${event?.Address?.city ?? ''}`}
                        closeBtn />

                    {notif &&
                        <NotifDiv
                            isLoading={isLoading}
                            refetch={refetch}
                            notif={notif}
                        />}

                </div>
                <section
                    id='refDiv'
                    className={expanded ? 'overflow-auto' : 'overflow-hidden'}
                    ref={divRef}
                    onScroll={() => {
                        handleHideCallback();
                    }}>
                    <div className={`DetailCardDiv ${expanded ? 'expandedCardDiv' : 'hideCTA'} `}>
                        {!isLoading && event ?
                            <EventDetailCard

                                EventLoad={event}
                                refetch={async () => await updateEvent()}
                                expand={expanded}
                                setExpand={setExpanded} />
                            :
                            <Skeleton />}
                    </div>

                    {/* ARTICLES */}
                    <article className='grid grid-rows-[auto,1fr] py-5  lg:-ml-5'>
                        <h3>Articles</h3>
                        <SkeletonGrid count={3} />
                    </article>

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