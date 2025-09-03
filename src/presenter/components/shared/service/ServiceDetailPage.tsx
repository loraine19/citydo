import { useNavigate, useParams } from 'react-router-dom';
import { ServiceStep } from '../../../../domain/entities/Service';
import CTAMines from '../../common/CTA';
import SubHeader from '../../common/SubHeader';
import ServiceDetailComp from './serviceCards/ServiceDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import DI from '../../../../di/ioc';
import { Skeleton, SkeletonGrid } from '../../common/Skeleton';
import { generateContact, GenereMyActions, getEnumVal, isLate } from '../../../views/viewsEntities/utilsService';
import { ContactDiv } from '../../common/ContactDiv';
import { User } from '../../../../domain/entities/User';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { ServiceView } from '../../../views/viewsEntities/serviceViewEntity';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HandleHideParams } from '../../../../application/useCases/utils.useCase';
import NotifDiv from '../../common/NotifDiv';
import { useUxStore } from '../../../../application/stores/ux.store';

export default function ServiceDetailPage() {

    const [notif, setNotif] = useState<string>('');

    //// PARAMS
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0;

    //// HANDLE API ERROR
    const { handleApiError } = useAlertStore()
    const navigate = useNavigate()

    //// VIEW MODEL
    const serviceIdViewModelFactory = DI.resolve('serviceIdViewModel');
    const { service, isLoading, error, update, refetch } = serviceIdViewModelFactory(idS);

    //// ACTIONS
    const deleteService = async (id: number) => await DI.resolve('deleteServiceUseCase').execute(id);
    const respService = async (id: number) => await DI.resolve('respServiceUseCase').execute(id);
    const cancelRespService = async (id: number) => await DI.resolve('cancelRespServiceUseCase').execute(id);
    const validRespService = async (id: number) => await DI.resolve('validRespServiceUseCase').execute(id);
    const finishService = async (id: number) => await DI.resolve('finishServiceUseCase').execute(id);

    //// STATUS
    const statusInt = getEnumVal(service.statusS, ServiceStep)
    const isLateValue = (isLate(service.createdAt, 15) && statusInt < 1)
    const { typeS, categoryS, mine } = service

    //// UPDATE FUNCTION 
    const updateService = async () => {
        alert('up')
        try {
            const data = await update();
            const actions = generateActions(data);
            refetch();
            setActions([...actions]);

        } catch (error) {
            handleApiError(error);
        }
    }

    //// ACTIONS
    const myAction: Action[] = GenereMyActions(service, "service", deleteService, isLateValue);
    const generateActions = (service: ServiceView): Action[] => {
        let actions: Action[] = [];
        switch (true) {
            case (!service.IResp && !service.mine || service.isFinish):
                actions = [
                    {
                        iconImage: service.isNew ? 'person' : service.isFinish ? 'check' : 'block',
                        icon: service.isNew ? 'Répondre au service' : service.isFinish ? 'ce service est terminé' : service.statusS,
                        title: service.isNew ? 'Nous envoyerons un message à ' + service.User?.email + ' pour le premier contact' : '55',
                        body: service?.title,
                        function: service.isNew ?
                            async () => {
                                try {
                                    if (!service.isResp) {
                                        const data = await respService(service.id)
                                        if (data.error) handleApiError(data.error);
                                        else updateService();
                                    }
                                } catch (error) {
                                    handleApiError(error ?? "Erreur lors de l'annulation de la réponse");
                                }

                            } :
                            () => { alert('Service déjà répondu'); },
                    },
                ];
                break;
            case (service.mine && service.isNew):
                actions = [...myAction];
                if (isLateValue && !service.isResp) {
                    actions.push({
                        color: 'cyan',
                        icon: 'Relancer',
                        title: 'Relancer le service - ',
                        body: 'Relancer le service',
                        //// TODO: add function to relancer
                        function: () => { console.log('Relancer le service'); },
                    });
                }
                break;
            case (service.mine && service.isResp):
                actions = [
                    ...myAction,

                    {
                        color: 'orange',
                        iconImage: 'close',
                        icon: 'Refuser ',
                        title: `Refuser la reponse de ${service.UserResp?.Profile.firstName}`,
                        body: `${service?.title} <br> Nous envoyerons un message à ${service.UserResp?.email} - ${service.UserResp?.Profile.phone}`,
                        function: async () => {
                            try {
                                const data = await cancelRespService(service.id);
                                if (data.error || !data) handleApiError(data.error);
                                else updateService();
                            } catch (error) {
                                handleApiError(error ?? "Erreur lors de l'annulation de la réponse");
                            }
                        },
                    }, {
                        color: 'green',
                        iconImage: 'check',
                        icon: 'Valider ',
                        title: `Accepter la reponse de ${service.UserResp?.Profile.firstName}`,
                        body: `${service?.title} <br> Nous envoyerons un message à ${service.UserResp?.email} - ${service.UserResp?.Profile.phone} , ${service?.points} points seront débités de votre compte, et crédités à ${service.UserResp?.Profile.firstName} après validation de la fin du service`,
                        function: async () => {
                            try {
                                const data = await validRespService(service.id);
                                if (data.error || !data) handleApiError(data.error)
                                else updateService();
                            } catch (error) {
                                handleApiError(error ?? "Erreur lors de la validation de la réponse");
                            }
                        },
                    },
                ];
                break;
            case (service.mine && service.isValidated):
                actions = [
                    {
                        color: 'cyan',
                        iconImage: 'diversity_3',
                        icon: 'Besoin d\'aide ?',
                        title: 'Ouvrir une demande de conciliation',
                        body: <div>
                            Avant d'ouvrir une demande d'aide pouvez contacter
                            <ContactDiv
                                user={service.UserResp as User} />
                        </div>,
                        function: () => navigate(`/conciliation/create/${service.id}`),
                    },
                    {
                        color: 'green',
                        iconImage: 'check',
                        icon: 'terminer',
                        title: 'Terminer le service',
                        body: `${service?.title}<br> et crediter ${service.UserResp?.Profile.firstName} <br> de ${service?.points} points, Nous enverrons un message à ${service.UserResp?.email} `,
                        function: async () => {
                            try {
                                const data = await finishService(service.id);
                                if (data.error || !data) handleApiError(data.error);
                                else updateService();
                            } catch (error) {
                                handleApiError(error ?? "Erreur lors de la finalisation du service");
                            }

                        }
                    },
                ];
                break;
            case (service.IResp && !service.isFinish && !service.inIssue):
                actions = [
                    {
                        color: service.isResp ? 'orange' : 'red',
                        iconImage: 'close',
                        icon: service.isResp ? 'Annuler votre réponse' : service.isValidated ? "Besoin d'aide ?" : '142',
                        title: service.isResp ? 'Annuler votre réponse' : service.isValidated ? "Ouvrir une demande de conciliation?" : '143',
                        body: service.isResp ? service?.title : service.isValidated ? `Avant d'ouvrir une demande d'aide pouvez contacter ${generateContact(service.User)}` : '144',
                        function: async () => {
                            try {
                                if (service.isResp) {
                                    const data = await cancelRespService(service.id);
                                    if (data.error) handleApiError(data.error);
                                    else updateService();
                                }
                                else if (service.isValidated) navigate(`/conciliation/create/${service.id}`);
                            } catch (error) {
                                handleApiError(error ?? "Erreur lors de l'annulation de la réponse");
                            }
                        }

                    },
                ];
                break;
            case (service.inIssue && (service.mine || service.IResp)):
                actions = [
                    {
                        color: 'red',
                        iconImage: 'expand_content',
                        icon: 'Voir le litige',
                        title: 'Voir le litige',
                        body: 'Voir le litige',
                        function: () => navigate(`/conciliation/${service.id}`),
                    },
                ];
                break;
            default:
                break;
        }

        return isLoading ? [] as Action[] : actions;
    }

    const disabled1 = (!mine && !service.IResp && statusInt >= 1) || service.isFinish

    const [actions, setActions] = useState<Action[]>(generateActions(service))

    useEffect(() => {
        if (!isLoading && !error && service) {
            error ? setNotif(error.message) : setNotif('');
            const updatedActions = generateActions(service);
            setActions([...updatedActions]);
        }
    }, [isLoading, error])



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
            <main >
                <div className="sectionHeader">
                    <SubHeader
                        hideImage={!hideNavBottom || !service?.image}
                        image={service?.image}
                        type={`${typeS ?? ''} de service ${categoryS ?? ''}`}
                        closeBtn />
                    {notif &&
                        <NotifDiv
                            isLoading={isLoading}
                            refetch={refetch}
                            notif={notif}
                        />}

                </div>
                <section
                    ref={divRef}
                    onScroll={() =>
                        handleHideCallback()}>
                    <div className="DetailCardDiv">
                        {isLoading || error || !service ?
                            <Skeleton />
                            :

                            <ServiceDetailComp
                                service={service}
                                mines={mine}
                            />
                        }

                    </div>


                    {/* ARTICLES */}
                    <article className='grid grid-rows-[auto,1fr] py-5 lg:-ml-5'>
                        <SubHeader
                            type="Autres services"
                            place={'dans ce groupe '} />
                        <SkeletonGrid count={3} />
                    </article>

                </section>
            </main>
            <footer className={`footer ${hideNavBottom ? 'hidden' : ''}`} >
                {!isLoading && !error && service &&
                    <CTAMines
                        actions={actions}
                        disabled1={disabled1} />}
            </footer>
        </>
    );
}
