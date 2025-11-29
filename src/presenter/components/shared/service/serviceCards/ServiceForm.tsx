import { useEffect, useMemo, useState } from "react";
import { Profile } from "../../../../../domain/entities/Profile";
import { useUserStore } from "../../../../../application/stores/user.store";
import { ImageBtn } from "../../../common/ImageBtn";
import { Icon } from "../../../common/IconComp";
import { DateChip } from "../../../common/ChipDate";
import { hardLevels, serviceCategories, skillLevels } from "../../../../constants";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import GroupSelect from "../../../common/GroupSelect";
import Chip from "../../../common/adaptatersComps/Chip";
import { RadioGroup } from "../../../common/adaptatersComps/RadioGroup";
import { Select } from "../../../common/adaptatersComps/Select";
import CTAMines from "../../../common/CTA";
import { CardLarge } from "../../base/baseComps/Cards";
import { Input } from "../../base/baseComps/Inputs";
import { useNavStore } from "../../../../../application/stores/nav.store";
import FormHeadSection from "../../base/baseComps/FormHeadSection";
import { Button } from "../../base/baseComps/Buttons";

interface ServiceFormProps {
    formik: any;
}
export function ServiceForm({ formik }: ServiceFormProps) {
    const { user } = useUserStore();
    const userProfile: Profile = user.Profile;
    const [imgBlob, setImgBlob] = useState<string | undefined>(formik.values.image);
    const [groupId, setGroupId] = useState<string | undefined>(formik.values.groupId);
    const [expand, setExpand] = useState<boolean>(false);

    // Stepper logic
    const [show, setShow] = useState(true);
    const [showCard, setShowCard] = useState(false);


    // Points calculation
    const [points, setPoints] = useState<string>(formik.values.points?.join(' à ') || '0 à 1');
    useEffect(() => {
        const updatedValues = new ServiceView(formik.values as ServiceView, user)
        formik.setValues(updatedValues);
        setPoints(updatedValues?.points?.join(' à ') || '0 à 1');
    }, [formik.values.hard, formik.values.skill, formik.values.type]);

    // AppBar Section
    const { setDetailSection } = useNavStore((state) => state);
    const label = formik.values.category
        ? serviceCategories.find((c: any) => c.value === formik.values.category)?.label
        : '';
    const SearchSection = useMemo(() => (
        <FormHeadSection
            showProps={(!showCard) ? undefined : {
                show, setShow,
                text: show ? "Saisir Informations principales" : "Modifier Informations principales",
                color: (formik.errors.groupId || formik.errors.category) ? "error" : "slate"
            }}
            infosChipValue={
                (formik.values.id ? "Modifier votre service " : "Créer votre service ")
                + " / " + (formik.values.typeS ?? '...')
                + " / " + (label ?? '...')
            }
        />
    ), [show, formik.values, label, formik.errors, showCard]);

    useEffect(() => {
        setDetailSection(SearchSection);
        return () => setDetailSection(undefined);
    }, [SearchSection, setDetailSection, formik.values, label, formik.errors, show, showCard]);

    const start = formik.values.createdAt || new Date();

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full overflow-hidden">
            <main className={`hBottomForm`}>
                <section className={` ${show ? 'overflow-hidden' : 'overflow-auto '}`}>
                    <div className={`pt-2  max-h-max w-full flex flex-col gap-2 ${(show) ? 'md3-animation-slide-down' : 'md3-animation-slide-out-up h-0'}`}>
                        <h6 className="md3-card-subhead pt-4">Informations principales</h6>
                        <div className="flex flex-col flex-wrap gap-4 flex-1 w-full">
                            <RadioGroup
                                variant="Input"
                                name={"type"}
                                orientation="horizontal"
                                options={[
                                    { id: "demande-radio", label: "Demande", value: "GET" },
                                    { id: "offre-radio", label: "Offre", value: "DO" },
                                ]}
                                value={formik.values.type}
                                onChangeProps={(val) => formik.setFieldValue("type", val)}
                                disabled={formik.values.statusValue > 0}
                            />
                            {formik.values.category &&

                                <Select
                                    disabled={formik.values.statusValue > 0}
                                    variant="Input"
                                    value={formik?.values?.category}
                                    options={serviceCategories}
                                    formik={formik}
                                    name="category"
                                    placeholder="Choisir la catégorie"
                                />}

                            <GroupSelect
                                groupId={groupId}
                                setGroupId={setGroupId}
                                formik={formik}
                                user={user}
                                disabled={formik.values.statusValue > 0}
                            />
                            {
                                (!formik.errors.groupId && !formik.errors.category && formik.values.groupId && formik.values.category) &&
                                <Button
                                    color='sky'
                                    type='button'
                                    onClick={() => {
                                        setShowCard(true);
                                        setShow(false);
                                    }}>
                                    Continuer
                                </Button>
                            }
                        </div>
                    </div>
                    <CardLarge
                        className={`mb-8 ${(showCard && !show) ?
                            `md3-animation-slide-up ` :
                            'md3-animation-slide-out-down'}`}
                        form
                        expanded={expand}
                        setExpanded={setExpand}
                        image={
                            <CardLarge.Image
                                className="md3-sky-container"
                                src={imgBlob || formik.values.image || undefined}
                                alt={formik.values.title || 'image'}
                            />
                        }
                    >
                        <CardLarge.Chips className="justify-between px-4">
                            <ImageBtn
                                variant="tonal"
                                className={"relative pb-1"}
                                formik={formik}
                                imgBlob={imgBlob || formik.values.image}
                                setImgBlob={setImgBlob}
                            />
                            <DateChip
                                prefix=" "
                                start={start}
                            />
                        </CardLarge.Chips>
                        <CardLarge.Divider />
                        <CardLarge.MidSection className="md:px-8 flex flex-col">
                            <h6>Informations</h6>
                            <div className="flex flex-1 flex-col gap-4">
                                <Input
                                    error={!!formik.errors.title}
                                    label={"Titre"}
                                    name="title"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                    helperText={formik.errors.title ?? `${formik.values.title?.length ?? 0}/40`}
                                />
                                <Input
                                    error={!!formik.errors.description}
                                    className={``}
                                    label='Description'
                                    rows={6}
                                    name="description"
                                    multiline
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                        formik.handleChange(e);
                                        const textarea = e.target as HTMLTextAreaElement;
                                        textarea.style.height = '8rem';
                                        textarea.style.height = textarea.scrollHeight + 'px';
                                        if (e.target.value === '') {
                                            textarea.style.height = '8rem';
                                        }
                                    }}
                                    value={formik.values.description}
                                    helperText={`${formik.errors.description ?? (`${formik.values.description?.length ?? 0}/300`)}`}
                                />
                            </div>
                        </CardLarge.MidSection>
                        <CardLarge.Divider />
                        <CardLarge.MidSection className="md:px-8 max-h-max flex flex-col">
                            <h6>Niveaux</h6>
                            <div className="flex flex-1 !py-2 flex-col gap-4">
                                <div className="flex flex-col xs:flex-row gap-4 ">
                                    {formik.values.skill && <Select
                                        bgColor="var(--md3-primary-container)"
                                        variant="Input"
                                        name={'skill'}
                                        formik={formik}
                                        value={formik.values.skill?.toString()}
                                        options={skillLevels}
                                        placeholder="Compétence"
                                    />}
                                    {formik.values.hard && <Select
                                        bgColor="var(--md3-primary-container)"
                                        placeholder="Pénibilité"
                                        variant="Input"
                                        name={'hard'}
                                        formik={formik}
                                        value={formik.values.hard?.toString()}
                                        options={hardLevels}
                                    />}
                                </div>
                                <Chip
                                    className="!px-3 h-[2.8rem] !rounded-md"
                                    size='medium'
                                    value={`${points} pts`}
                                    icon={
                                        <Icon
                                            color={formik.values.type === "do" ?
                                                "green" : "orange"}
                                            icon="toll"
                                            size="md"
                                            style=""
                                            fill={userProfile?.points > parseInt(points[0])}
                                        />}
                                />
                            </div>
                        </CardLarge.MidSection>
                    </CardLarge>
                </section>
            </main>
            {(showCard && !show) &&
                <CTAMines
                    actions={[
                        {
                            disabled: formik.values.statusValue > 0,
                            type: 'submit',
                            icon: formik.values.statusValue > 0 ? 'Non modifiable : ' + formik.values.statusS : `enregistrer`,
                            iconImage: formik.isSubmitting ? "progress_activity" : formik.values?.id ? "check" : "send",
                            direct: true,
                            function: () => { }
                        }
                    ]}
                />}
        </form>
    );
}
