import { useEffect, useMemo, useState } from "react";
import { CardLarge } from "../../base/baseComps/Cards";
import { Input } from "../../base/baseComps/Inputs";
import { Button } from "../../base/baseComps/Buttons";
import { useNavStore } from "../../../../../application/stores/nav.store";
import { ImageBtn } from "../../../common/ImageBtn";
import { Select } from "../../../common/adaptatersComps/Select";
import FormHeadSection from "../../base/baseComps/FormHeadSection";
import ServiceIssueCard from "./ServiceIssueCard";
import { IssueStep } from "../../../../../domain/entities/Issue";
import CTAMines from "../../../common/CTA";
import { User } from "../../../../../domain/entities/User";
import { Service } from "../../../../../domain/entities/Service";
import { IssueView } from "../../../../views/viewsEntities/issueViewEntity";
import { Icon } from "../../../common/IconComp";
import Chip from "../../../common/adaptatersComps/Chip";
import { Action } from "../../../../../domain/entities/frontEntities";
import DI from "../../../../../di/ioc";
import { generateContact } from '../../../../views/viewsEntities/utilsService';
import { useNavigate } from "react-router";
import { AvatarUser } from "../../../common/AvatarUser";

type IssueFormProps = { issue: IssueView, service?: Service, formik: any };

export const IssueForm: React.FC<IssueFormProps> = ({ issue, formik, service }) => {
    const Service = service ? service : issue.Service;
    const [groupId, setGroupId] = useState<number>(Service?.groupId ?? 0)
    const [imgBlob, setImgBlob] = useState<string>(formik?.values?.image ?? issue.image);
    const [show, setShow] = useState(true);
    const [showCard, setShowCard] = useState(!formik ? true : false);
    const navigate = useNavigate();

    //// VIEW MODEL
    const deleteIssue = async (id: number) => await DI.resolve('deleteIssueUseCase').execute(id);
    const respIssue = async (id: number, step: IssueStep) => await DI.resolve('respIssueUseCase').execute(id, step);
    const finishIssue = async (id: number, pourcent: number) => await DI.resolve('finishIssueUseCase').execute(id, pourcent);

    //// MODO STATE
    const [modoOnId, setModoOnId] = useState<number>(0)
    const modosFactory = (groupId: number) => DI.resolve('modosViewModel')(groupId)
    const { modos } = modosFactory(groupId);



    /// FETCH MODOS
    useEffect(() => {
        setGroupId(Service?.groupId ?? issue?.Service?.groupId ?? 0)
    }, [issue, service, formik?.values]);


    //// ACTIONS
    const MyActions: Action[] = [{
        iconImage: issue?.stepValue < 2 ? 'send' : '',
        icon: issue?.stepValue < 2 ? 'Modifier ' : '',
        title: 'Modifier la conciliation',
        body: 'Aller à la page de modification de la conciliation',
        color: 'orange',
        function: () => { navigate('/conciliation/edit/' + issue?.serviceId) }
    },
    {
        iconImage: 'close',
        icon: issue?.stepValue <= 3 ? 'Supprimer ' : issue?.statusS,
        title: 'Supprimer la conciliation',
        body: <>Voulez-vous vraiment supprimer la conciliation sur <br /><hr /> {issue?.Service?.title}</>,
        color: 'error',
        function: async () => {
            const data = await deleteIssue(issue?.serviceId);
            data && navigate('/service?search=myservices')
        }
    }]

    const ChoiceModoSelect: JSX.Element = issue &&
        <div className=' pb-20 z-50 overflow-hidden pt-2'>
            <Select
                placeholder={modoOnId === 0 ? '' : 'Modérateur choisi'}
                variant='Input'
                bgColor="var(--md3-primary-container)"
                name={"userIdModoOn"}
                value={(formik?.values?.userIdModoOn?.toString() ?? issue?.userIdModoOn?.toString() ?? '0')}
                onChangeFunction={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    formik && formik.setFieldValue("userIdModoOn", parseInt(e?.target?.value));
                    setModoOnId(parseInt(e?.target?.value))
                }}
                options={modos ? modos.map((modo: User) => ({
                    value: modo?.id?.toString(),
                    label:
                        <div className="flex items-center gap-2">
                            <AvatarUser Profile={modo?.Profile} avatarSize="md" />
                            <div>{modo?.Profile?.firstName} {modo?.Profile?.lastName}</div>
                        </div>
                })) : []}>

            </Select >
        </div >

    const RespActions = [
        {
            iconImage: issue.status === IssueStep.STEP_1 ? 'send' : 'pending_actions',
            icon: issue.status === IssueStep.STEP_1 ? 'Choisir mon modérateur' : issue.statusS,
            title: 'Choisir mon modérateur',
            body: ChoiceModoSelect,
            function: () => { navigate('/conciliation/edit/' + issue.serviceId) }
        }]

    const [pourcent, setPourcent] = useState({ IModo: 100, other: 0 })
    const userImodo = issue.ImModo ? issue?.Service?.User : issue?.Service?.UserResp
    const otherModo = issue.ImModo ? issue?.Service?.UserResp : issue?.Service?.User

    const pourcentInput =
        <div className="flex flex-col gap-4 p-4">
            <p>
                {`${userImodo?.Profile?.firstName} recevera ce pourcentage sur la moitié des points du service et ${otherModo?.Profile?.firstName} recevera l'autre moitié`}
            </p>
            <div className='flex gap-8'>
                <Input
                    label={`Pourcentage de ${userImodo?.Profile?.firstName}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPourcent({ ...pourcent, IModo: parseInt(e.target?.value), other: 100 - parseInt(e.target?.value) })}
                    value={pourcent?.IModo}
                    type="number"
                    name="pourcent"
                />
                <Input
                    label={`Pourcentage de ${otherModo?.Profile?.firstName}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPourcent({ ...pourcent, other: parseInt(e.target.value), IModo: 100 - parseInt(e.target.value) })}
                    value={pourcent.other}
                    type="number"
                    name="pourcent"
                />
            </div>
        </div>

    const ModoActions = [
        {
            icon: ((issue?.ImModo && issue?.statusS === IssueStep.STEP_1) || (issue?.ImModoOn && issue?.statusS === IssueStep.STEP_2))
                ? `Accepter la conciliation pour ${issue?.ImModo
                    ? issue?.Service?.User?.Profile?.firstName ?? ''
                    : issue?.Service?.UserResp?.Profile?.firstName ?? ''}`
                : '',
            title: 'Vous avez été choisi comme modérateur ',
            body: (() => {
                const contactUser = issue?.ImModo ? issue?.User : issue?.UserOn;
                return contactUser
                    ? `Vous pouvez contacter l'utilisateur qui vous à choisi : ${generateContact(contactUser)}`
                    : "Aucun utilisateur à contacter.";
            })(),
            function: async () => {
                const update = issue?.ImModo ? IssueStep.STEP_1 : IssueStep.STEP_2
                const data = await respIssue(issue?.serviceId, update)
                data && navigate('/service?search=myservices')
            }
        },
        {
            iconImg: 'check',
            icon: (issue?.stepValue > 2 && (((issue?.ImModo && issue?.statusS === IssueStep.STEP_3) || (issue?.ImModoOn && issue?.statusS === IssueStep.STEP_4))) ?
                'Cloturer le litige' :
                issue.statusS),
            title: `Attribution de la moitié des points la conciliation`,
            body: pourcentInput,
            function: async () => {
                const data = await finishIssue(issue?.serviceId, pourcent?.IModo)
                data && navigate('/service?search=myservices')
            }
        }]



    // AppBar Section
    const { setDetailSection } = useNavStore((state) => state);
    const label = Service?.title || '';
    const SearchSection = useMemo(() => (
        <FormHeadSection
            showProps={(!showCard || !formik) ? undefined : {
                show, setShow,
                text: show ? "Saisir Informations principales" : "Modifier Informations principales",
                color: (formik?.errors?.date) ? "error" : "slate"
            }}
            infosChipValue={
                (formik?.values?.id ? "Modifier votre demande de conciliation" :
                    formik ? "Créer une conciliation " : "Détails de la conciliation ")
                + " / " + (label ?? '...')
            }
        />
    ), [show, formik?.values, label, formik?.errors, showCard]);

    useEffect(() => {
        setDetailSection(SearchSection);
        return () => setDetailSection(undefined);
    }, [SearchSection, setDetailSection, formik?.errors, formik?.values, show,]);

    const start = new Date(Service?.createdAt).toLocaleDateString('fr-FR');



    //// HANDLE EXPAND
    const [expand, setExpand] = useState<boolean>(issue?.image ? false : true);

    //// TO NAV BAR
    useEffect(() => {
        setDetailSection(SearchSection);
        return () => {
            setDetailSection(undefined);
        }
    }, [SearchSection]);


    return (
        <form
            onSubmit={formik?.handleSubmit}
            className="flex flex-col h-full overflow-hidden w-full">
            <main className="hBottomForm">
                <section className={`${(show) ? 'overflow-hidden' : 'overflow-auto '}`}>
                    <div className={`pt-2 max-h-max w-full flex flex-col gap-2 
                        ${(show && formik) ? 'md3-animation-slide-down' : 'md3-animation-slide-out-up h-0'}`}>
                        <h6 className="md3-card-subhead pt-4">Informations principales</h6>
                        <div className="flex flex-col flex-wrap gap-4 flex-1 w-full">
                            <Input

                                leadingIcon={
                                    <Icon
                                        fill size='lg'
                                        icon='calendar_today'
                                        onClick={() => {
                                            (document.getElementsByName("date")[0] as HTMLInputElement).showPicker();
                                        }} />}
                                label="Date du problème"
                                type="date-local"
                                min={start}
                                name="date"
                                onChange={formik?.handleChange}
                                value={formik?.values?.date || start}
                                error={!!formik?.errors?.date}
                                helperText={formik?.errors?.date}
                            />
                            <Input
                                multiline
                                rows={6}
                                error={!!formik?.errors?.description}
                                label='Description'
                                name="description"
                                helperText={`${formik?.errors?.description ?? (`${formik?.values?.description?.length ?? 0}/300`)}`}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    formik.handleChange(e);
                                    const textarea = e.target as HTMLTextAreaElement;
                                    textarea.style.height = '8rem';
                                    textarea.style.height = textarea.scrollHeight + 'px';
                                    if (e.target.value === '') {
                                        textarea.style.height = '8rem';
                                    }
                                }}
                                value={formik?.values?.description}
                            />
                            <Button
                                color='error'
                                type='button'
                                onClick={() => {
                                    setShowCard(true);
                                    setShow(false);
                                }}>
                                Continuer
                            </Button>
                        </div>
                    </div>
                    <CardLarge
                        className={`mb-8 w-full ${(showCard && (!show || !formik)) ?
                            `md3-animation-slide-up ` : 'md3-animation-slide-out-down'}`}
                        form
                        expanded={expand}
                        setExpanded={setExpand}
                        image={
                            <CardLarge.Image
                                className="md3-sky-container"
                                src={imgBlob || formik?.values?.image || undefined}
                                alt={formik?.values?.title || 'image'}
                            />
                        }
                    >
                        <CardLarge.Chips className="justify-end px-4">
                            {formik &&
                                <div className="flex flex-1">
                                    <ImageBtn
                                        variant="tonal"
                                        formik={formik}
                                        imgBlob={imgBlob || formik?.values?.image}
                                        setImgBlob={setImgBlob}
                                    />
                                </div>}
                            <Chip
                                variant="tonal"
                                value={issue.statusS ?? ''} />
                            <Chip
                                value={formik?.values?.date || start}
                            />
                        </CardLarge.Chips>
                        <CardLarge.Divider />
                        <CardLarge.SupportingText className="md:px-8 flex flex-col gap-2">
                            <h6>Description du probleme</h6>
                            {formik?.values?.description ?? issue?.description}
                        </CardLarge.SupportingText>
                        <CardLarge.Divider />
                        <CardLarge.MidSection className="md:px-8 gap-2 flex flex-col">
                            <h6>Modérateurs</h6>
                            <div className="flex flex-col gap-4">
                                {modos &&
                                    <Select
                                        formik={formik}
                                        variant="Input"
                                        bgColor="var(--md3-primary-container)"
                                        name={"userIdModo"}
                                        value={formik?.values?.userIdModo?.toString() ??
                                            issue.userIdModo?.toString() ?? '0'}
                                        disabled={((issue.mine && !issue.UserModo || formik)) ? false : true}
                                        onChangeFunction={formik.handleChange}
                                        options={modos.map((modo: User) => ({
                                            value: modo?.id?.toString(),
                                            label:
                                                <div className="flex items-center gap-2">
                                                    <AvatarUser Profile={modo?.Profile} avatarSize="md" />
                                                    <div>{modo?.Profile?.firstName} {modo?.Profile?.lastName}</div>
                                                </div>
                                        }))}
                                        placeholder={`Modérateur de ${Service.User?.Profile?.firstName} ${formik?.values?.userIdModo ? '' : 'choix en cours...'}`}
                                    />}
                                {issue.userIdModoOn}
                                <Select
                                    variant="Input"
                                    bgColor="var(--md3-primary-container)"
                                    name={"userIdModoOn"}
                                    onChangeFunction={formik.handleChange}
                                    formik={formik}
                                    value={formik?.values?.userIdModoOn?.toString() ?? issue.userIdModoOn?.toString() ?? '0'}
                                    disabled={(!issue.mine || issue.UserModoOn) ? true : false}
                                    options={modos && modos.map((modo: User) => ({
                                        value: modo?.id?.toString(),
                                        label:
                                            <div className="flex items-center gap-2">
                                                <AvatarUser Profile={modo?.Profile} avatarSize="md" />
                                                <div>{modo?.Profile?.firstName} {modo?.Profile?.lastName}</div>
                                            </div>
                                    }))}
                                    placeholder={`Modérateur de ${Service.UserResp?.Profile?.firstName}
                                        ${formik?.values?.userIdModoOn ? '' : ': choix en cours...'}`}
                                />
                            </div>
                        </CardLarge.MidSection>
                        <CardLarge.Divider />
                        <CardLarge.MidSection className="md:px-8 flex flex-col ">
                            <h6>Service lié</h6>
                            <ServiceIssueCard service={Service} />
                        </CardLarge.MidSection>
                    </CardLarge>
                </section>
            </main>
            {(showCard && !show && formik) &&
                <CTAMines
                    actions={[
                        {
                            disabled: formik?.values?.statusS > IssueStep.STEP_2,
                            type: 'submit',
                            icon: formik?.values?.statusS > IssueStep.STEP_2 ? 'Non modifiable' : `Enregistrer`,
                            iconImage: formik.isSubmitting ? "progress_activity" : formik.values?.id ? "check" : "send",
                            direct: true,
                            function: () => { }
                        }
                    ]}
                />}
            {issue?.mine &&
                <CTAMines
                    key={'mine'}
                    disabled1={issue?.stepValue >= 2}
                    disabled2={issue?.stepValue >= 4}
                    actions={MyActions} />}
            {issue?.onMe &&
                <CTAMines
                    key={'onMe'}
                    disabled1={issue?.stepValue >= 1}
                    disabled2={issue?.stepValue >= 3}
                    actions={RespActions} />}
            {(issue?.ImModo || issue?.ImModoOn) &&
                <CTAMines
                    key={'ImModo'}
                    disabled1={(issue?.ImModo && issue?.statusS !== IssueStep.STEP_1) || (issue?.ImModoOn && issue?.statusS !== IssueStep.STEP_2)}
                    disabled2={(issue?.ImModo && issue?.statusS !== IssueStep.STEP_3) || (issue?.ImModoOn && issue?.statusS !== IssueStep.STEP_4)}
                    actions={ModoActions} />
            }
        </form>
    );
};
