import { useParams } from 'react-router-dom';
//import parse from 'html-react-parser';
import CTAMines from '../../common/CTA';
import SubHeader from '../../common/SubHeader';
import { EventDetailCard } from './eventComps/EventDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { GenereMyActions } from '../../../views/viewsEntities/utilsService';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { EventStatus } from '../../../../domain/entities/Event';
import { useEffect, useState } from 'react';
import NotifDiv from '../../common/NotifDiv';
import { EventView } from '../../../views/viewsEntities/eventViewEntities';


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

    useEffect(() => {
        if (error) setNotif(error.message)
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
            color: eventUp?.Igo ? 'red' : 'cyan',
            iconImage: eventUp?.Igo ? 'cancel' : 'person',
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

    return (
        <>
            <main data-cy="event-details-page">
                <div className="sectionHeader">
                    <SubHeader
                        type={`évenement ${event?.label ?? ''}`}
                        place={` ${event?.Address?.address ?? ''} ${event?.Address?.city ?? ''}`}
                        closeBtn />

                </div>
                <section>
                    {!isLoading && event ?
                        <EventDetailCard
                            EventLoad={event}
                            refetch={async () => await updateEvent()} /> :
                        <Skeleton />}
                    {notif &&
                        <NotifDiv
                            isLoading={isLoading}
                            refetch={refetch}
                            notif={notif}
                        />}
                </section>
            </main>
            <footer >
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