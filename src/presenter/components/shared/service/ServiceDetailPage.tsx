import { useNavigate, useParams } from 'react-router-dom';
import { ServiceStep } from '../../../../domain/entities/Service';
import CTAMines from '../../common/CTA';
import SubHeader from '../../common/SubHeader';
import ServiceDetailComp from './serviceCards/ServiceDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { generateContact, GenereMyActions, getEnumVal, isLate } from '../../../views/viewsEntities/utilsService';
import { ContactDiv } from '../../common/ContactDiv';
import { User } from '../../../../domain/entities/User';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { ServiceView } from '../../../views/viewsEntities/serviceViewEntity';
import { useEffect, useState } from 'react';

export default function ServiceDetailPage() {

    //// TODO 
    // notif div refetch

    //// PARAMS
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0;

    //// HANDLE API ERROR
    const { handleApiError } = useAlertStore()
    const navigate = useNavigate()

    //// VIEW MODEL
    const serviceIdViewModelFactory = DI.resolve('serviceIdViewModel');
    const { service, isLoading, error, update } = serviceIdViewModelFactory(idS);

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
                                const data = await respService(service.id)
                                if (data.error || !data) handleApiError(data.error)
                                else updateService();
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
                        color: 'green',
                        iconImage: 'check',
                        icon: 'Valider ',
                        title: `Accepter la reponse de ${service.UserResp?.Profile.firstName}`,
                        body: `${service?.title} <br> Nous envoyerons un message à ${service.UserResp?.email} - ${service.UserResp?.Profile.phone} , ${service?.points} points seront débités de votre compte, et crédités à ${service.UserResp?.Profile.firstName} après validation de la fin du service`,
                        function: async () => {
                            const data = await validRespService(service.id);
                            if (data.error || !data) handleApiError(data.error)
                            else updateService();
                        },
                    },
                    {
                        color: 'orange',
                        iconImage: 'close',
                        icon: 'Refuser ',
                        title: `Refuser la reponse de ${service.UserResp?.Profile.firstName}`,
                        body: `${service?.title} <br> Nous envoyerons un message à ${service.UserResp?.email} - ${service.UserResp?.Profile.phone}`,
                        function: async () => {
                            const data = await cancelRespService(service.id)
                            if (data.error || !data) handleApiError(data.error)
                            else updateService();
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
                            const data = await finishService(service.id);
                            if (data.error || !data) handleApiError(data.error)
                            else updateService();
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
                            if (service.isResp) {
                                const data = await cancelRespService(service.id);
                                if (data.error) handleApiError(data.error)
                                else updateService();
                            }
                            else if (service.isValidated) navigate(`/conciliation/create/${service.id}`)
                            else alert('Service déjà répondu');
                        },
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
            const updatedActions = generateActions(service);
            setActions([...updatedActions]);
        }
        console.log(actions, service, isLoading)
    }, [isLoading, error])

    const updateService = async () => {
        const data = await update();
        setActions(generateActions(data));
    }

    return (
        <>
            <main>
                <div className="px-4 sectionHeader">
                    <SubHeader type={`${typeS ?? ''} de service ${categoryS ?? ''}`} closeBtn />
                </div>
                <section>
                    {isLoading || error || !service ?
                        <Skeleton />
                        :
                        <ServiceDetailComp
                            service={service}
                            mines={mine}
                        />}
                </section>
            </main>
            <footer>
                {!isLoading && !error && service &&
                    <CTAMines
                        actions={actions}
                        disabled1={disabled1} />}
            </footer>
        </>
    );
}
