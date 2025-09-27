import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "../../../../../application/stores/user.store";
import { surveyCategories } from "../../../../constants";
import { VoteTarget } from "../../../../../domain/entities/Vote";
import DI from "../../../../../di/ioc";
import GroupSelect from "../../../common/GroupSelect";
import CTAMines from "../../../common/CTA";
import { CardLarge } from "../../base/baseComps/Cards";
import { Input } from "../../base/baseComps/Inputs";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { RadioGroup } from "../../../common/adaptatersComps/RadioGroup";
import { Select } from "../../../common/adaptatersComps/Select";
import { ImageBtn } from "../../../common/ImageBtn";
import { DateChip } from "../../../common/ChipDate";
import FormHeadSection from "../../base/baseComps/FormHeadSection";
import { useNavStore } from "../../../../../application/stores/nav.store";
import { Button } from "../../base/baseComps/Buttons";

type PoolSurveyFormProps = {
    formik: any;
    type: VoteTarget;
    setType: any;
};

export function VoteForm({ formik, type, setType }: PoolSurveyFormProps) {
    const user = useUserStore((state) => state.user);
    const start = formik.values.createdAt ? new Date(formik.values.createdAt) : new Date();
    const [imgBlob, setImgBlob] = useState<string | undefined>(formik.values.image);
    const { users: fetchedUsers, refetch } = DI.resolve('userViewModel')(formik.values.groupId ?? 0);
    const [users, setUsers] = useState<{ value: any, label: any }[]>([]);
    const [expand, setExpand] = useState<boolean>(false);

    // Stepper logic
    const [show, setShow] = useState(true);
    const [showCard, setShowCard] = useState(false);

    // Header section with useMemo
    const { setDetailSection } = useNavStore((state) => state);
    const label = formik.values.typeS === 'POOL' ? 'Cagnotte' : formik.values.typeS === 'SURVEY' ? 'Sondage' : '...';
    const HeadSection = useMemo(() => (
        <FormHeadSection
            showProps={(!showCard) ? undefined : {
                show, setShow,
                text: show ? "Saisir Informations principales" : "Modifier Informations principales",
                color: (formik.errors.groupId || formik.errors.category) ? "error" : "slate"
            }}
            infosChipValue={
                (formik.values.id ? "Modifier " : "Créer ") + 'un vote / ' + (label ?? '...')
            }
        />
    ), [show, formik.values, formik.errors, label, showCard]);

    useEffect(() => {
        setDetailSection(HeadSection);
        return () => setDetailSection(undefined);
    }, [HeadSection, setDetailSection, formik.errors, formik.values, show]);

    useEffect(() => {
        refetch();
    }, [formik.values.groupId, type]);

    useEffect(() => {
        setUsers(fetchedUsers.map((user: any) => ({
            value: user?.id,
            label: user?.Profile?.firstName
        })));
    }, [fetchedUsers]);

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full overflow-hidden">
            <main >
                <section className={` hBottomForm flex ${show ? 'overflow-hidden' : 'overflow-auto '}`}>
                    <div className={`pt-2 max-h-max w-full flex flex-col  gap-2 ${(show) ? 'md3-animation-slide-down' : 'md3-animation-slide-out-up h-0'}`}>
                        <h6 className="md3-card-subhead pt-4">
                            Informations principales
                        </h6>
                        <div className="flex flex-col flex-wrap gap-4 flex-1 w-full">
                            <RadioGroup
                                variant="Input"
                                value={formik.values.typeS ?? type}
                                name="typeS"
                                orientation="horizontal"
                                onChange={(val) => { formik.setFieldValue("typeS", val); setType(val); }}
                                options={[
                                    { value: VoteTarget.SURVEY, label: "Sondage", id: 'sondage-radio' },
                                    { value: VoteTarget.POOL, label: "Cagnotte", id: 'cagnotte-radio' }
                                ]}
                            />

                            {type === VoteTarget.SURVEY && (
                                <Select
                                    variant="Input"
                                    value={formik.values.category}
                                    options={surveyCategories}
                                    placeholder="Catégorie"
                                    name="category"
                                    formik={formik}
                                />
                            )}
                            <GroupSelect
                                formik={formik}
                                user={user}
                            />
                            {(type === VoteTarget.POOL && formik.values.groupId) && (
                                <Select
                                    variant="Input"
                                    value={formik.values.beneficiary}
                                    options={users}
                                    placeholder={formik.errors.beneficiary ?? `Bénéficiaire`}
                                    name="beneficiary"
                                    formik={formik}
                                />
                            )}
                            {
                                (!formik.errors.groupId && !formik.errors.category && formik.values.groupId && (type === VoteTarget.POOL && formik.values.beneficiary || type === VoteTarget.SURVEY && formik.values.category)) &&
                                <Button
                                    color='orange'
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
                        className={`mb-3 ${(showCard && !show) ?
                            `md3-animation-slide-up ` : 'md3-animation-slide-out-down'}`}
                        form
                        expanded={expand}
                        setExpanded={setExpand}
                        image={
                            <CardLarge.Image
                                className="md3-rose-container"
                                src={imgBlob || formik.values.image || undefined}
                                alt={formik.values.title || 'image'}
                            />
                        }
                    >
                        <CardLarge.Chips className="justify-between px-4">
                            <ImageBtn
                                imgBlob={imgBlob || formik.values.image}
                                variant="tonal"
                                className="relative pb-1"
                                formik={formik}
                                setImgBlob={setImgBlob}
                            />
                            <DateChip
                                prefix=" "
                                start={start}
                            />
                            {formik.values?.UserBenef && formik.values?.typeS === VoteTarget.POOL && (
                                <ProfileDiv profile={formik.values?.UserBenef} />
                            )}
                        </CardLarge.Chips>
                        <CardLarge.Divider />
                        <CardLarge.MidSection className="md:px-8 flex flex-col">
                            <span className="md3-card-subhead">Informations</span>
                            <div className="flex flex-1 flex-col gap-4">
                                <Input
                                    error={!!formik.errors.title}
                                    label="Titre"
                                    name="title"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                    helperText={formik.errors.title ?? `${formik.values.title?.length ?? 0}/40`}
                                />
                                <Input
                                    error={!!formik.errors.description}
                                    label="Description"
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
                                    helperText={formik.errors.description ?? `${formik.values.description?.length ?? 0}/300`}
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
                            title: formik.values?.id ? 'Modifier' : 'Enregistrer',
                            iconImage: formik.isSubmitting ? "progress_activity" : formik.values?.id ? "check" : "send",
                            icon: formik.values?.pourcent > 1
                                ? 'Non modifiable votes en cours  ' + formik.values.pourcent + '%'
                                : (formik.values?.id ? 'Modifier' : 'Enregistrer'),
                            type: "submit",
                            disabled: formik.values?.pourcent > 1,
                            function: () => { }
                        }
                    ]}
                />}
        </form>
    );
}
