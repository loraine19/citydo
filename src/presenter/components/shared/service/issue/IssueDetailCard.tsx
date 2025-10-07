import { useEffect, useMemo, useState } from "react";
import { CardLarge } from "../../base/baseComps/Cards";
import { Input } from "../../base/baseComps/Inputs";
import { Button } from "../../base/baseComps/Buttons";
import { useNavStore } from "../../../../../application/stores/nav.store";
import { ImageBtn } from "../../../common/ImageBtn";
import { Select } from "../../../common/adaptatersComps/Select";
import FormHeadSection from "../../base/baseComps/FormHeadSection";
import { ProfileDiv } from "../../../common/ProfilDiv";
import ServiceIssueCard from "./ServiceIssueCard";
import { IssueStep } from "../../../../../domain/entities/Issue";
import CTAMines from "../../../common/CTA";
import { User } from "../../../../../domain/entities/User";
import { Service } from "../../../../../domain/entities/Service";
import { IssueView } from "../../../../views/viewsEntities/issueViewEntity";
import { Icon } from "../../../common/IconComp";
import Chip from "../../../common/adaptatersComps/Chip";

type IssueFormProps = { issue: IssueView, service?: Service, formik: any, modos: User[], expand: boolean, setExpand: (e: boolean) => void };

export const IssueForm: React.FC<IssueFormProps> = ({ issue, formik, service, modos, expand, setExpand }) => {
    const Service = service ? service : issue.Service;
    const [imgBlob, setImgBlob] = useState<string>(formik?.values?.image ?? issue.image);
    const [show, setShow] = useState(true);
    const [showCard, setShowCard] = useState(!formik ? true : false);

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

    return (
        <form onSubmit={formik?.handleSubmit} className="flex flex-col h-full overflow-hidden w-full">
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
                                color='sky'
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
                            {formik?.values?.description ?? issue.description}
                        </CardLarge.SupportingText>
                        <CardLarge.Divider />
                        <CardLarge.MidSection className="md:px-8 flex flex-col">
                            <h6>Modérateur</h6>
                            <div className="flex flex-col gap-4">
                                <Select
                                    variant="Input"
                                    bgColor="var(--md3-primary-container)"
                                    name={"userIdModo"}
                                    value={formik?.values?.userIdModo?.toString() ?? issue.userIdModo?.toString() ?? '0'}
                                    disabled={(!issue.mine || issue.UserModo) ? true : false}
                                    options={modos.map((modo: User) => ({
                                        value: modo.id.toString(),
                                        label: <ProfileDiv size="xs" profile={modo} />
                                    }))}
                                    placeholder={`Modérateur de ${Service.User?.Profile?.firstName}`}
                                />
                                {issue.userIdModoOn}
                                <Select
                                    variant="Input"
                                    bgColor="var(--md3-primary-container)"
                                    name={"userIdModoOn"}
                                    value={formik?.values?.userIdModoOn?.toString() ?? issue.userIdModoOn?.toString() ?? '0'}
                                    disabled={(!issue.mine || issue.UserModoOn) ? true : false}
                                    options={modos.map((modo: User) => ({
                                        value: modo.id.toString(),
                                        label: <ProfileDiv size="xs" profile={modo} />
                                    }))}
                                    placeholder={`Modérateur de ${Service.UserResp?.Profile?.firstName}`}
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
        </form>
    );
};
