import { useEffect, useState } from "react";
import SubHeader from "../../../common/SubHeader";
import { ImageBtn } from "../../../common/ImageBtn";
import { DateChip } from "../../../common/ChipDate";
import { surveyCategories } from "../../../../constants";
import { VoteTarget } from "../../../../../domain/entities/Vote";
import DI from "../../../../../di/ioc";
import { useUserStore } from "../../../../../application/stores/user.store";
import GroupSelect from "../../../common/GroupSelect";
import CTAMines from "../../../common/CTA";
import { CardLarge } from "../../base/baseComps/Cards";
import { Input } from "../../base/baseComps/Inputs";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { RadioGroup } from "../../../common/adaptatersComps/RadioGroup";
import { Select } from "../../../common/adaptatersComps/Select";

type PoolSurveyFormProps = {
    formik: any;
    type: VoteTarget;
    setType: any;
};

export function VoteForm({ formik, type, setType }: PoolSurveyFormProps) {
    const start = formik.values.createdAt ? new Date(formik.values.createdAt) : new Date();
    const [imgBlob, setImgBlob] = useState<string | undefined>(formik.values.image);
    const { user } = useUserStore(state => state);
    const { users: fetchedUsers, isLoading, refetch } = DI.resolve('userViewModel')(formik.values.groupId ?? 0);
    const [users, setUsers] = useState<{ value: any, label: any }[]>(fetchedUsers.map((user: any) => ({ value: user?.id, label: user?.Profile?.firstName })));
    const [expand, setExpand] = useState<boolean>(false);

    useEffect(() => {
        refetch();
        setUsers(fetchedUsers.map((user: any) => ({ value: user?.id, label: user?.Profile?.firstName })));
    }, [isLoading, formik.values.groupId, type]);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col h-full overflow-hidden">
            <main>
                <div className="sectionHeader">
                    <div className=" flex flex-col grid-cols-[55%_auto] lg:grid grid-rows-1  gap-2 py-3">
                        <div className="flex gap-2 flex-1 w-full ">
                            <RadioGroup
                                value={formik.values.typeS ?? type}
                                onChange={setType}
                                options={[
                                    { value: VoteTarget.SURVEY, label: "Sondage", id: 'sondage-radio' },
                                    { value: VoteTarget.POOL, label: "Cagnotte", id: 'cagnotte-radio' }
                                ]}
                            />

                            {type === VoteTarget.POOL && (
                                <Select
                                    value={formik.values.beneficiary}
                                    options={users}
                                    placeholder="Bénéficiaire"
                                    name="beneficiary"
                                    formik={formik}
                                />
                            )}
                            {type === VoteTarget.SURVEY && (
                                <Select
                                    value={formik.values.category}
                                    options={surveyCategories}
                                    placeholder="Catégorie"
                                    name="category"
                                    formik={formik}
                                />
                            )}
                        </div>
                        <GroupSelect
                            formik={formik}
                            user={user}
                        />
                    </div>
                    <SubHeader
                        form
                        type={formik.values.id ?
                            `Modifier votre ${formik.values.typeS} ` :
                            `Créer votre ${formik.values.typeS === 'POOL' ? 'cagnotte ' : formik.values.typeS === 'SURVEY' ? 'sondage ' : 'vote'}`}
                        closeBtn
                        place={formik.values.id ? formik.values.title : ''}
                    />
                </div>
                <section>
                    <div className="DetailCardDiv hideCTAForm ">
                        <CardLarge
                            form
                            expanded={expand}
                            setExpanded={setExpand}
                            image={
                                <CardLarge.Image
                                    className="md3-rose-container"
                                    src={(imgBlob || formik.values.image) ?? undefined}
                                    alt={formik.values.title || 'image'}
                                />
                            }
                        >
                            <CardLarge.Chips className="justify-between px-4">
                                <ImageBtn
                                    variant="outlined"
                                    color={'slate'}
                                    className="relative pb-1"
                                    formik={formik}
                                    setImgBlob={setImgBlob}
                                />
                                <DateChip
                                    prefix="publié le"
                                    start={start}
                                />
                                {formik.values?.UserBenef && formik.values?.typeS === VoteTarget.POOL && (
                                    <ProfileDiv profile={formik.values?.UserBenef} />
                                )}
                            </CardLarge.Chips>
                            <CardLarge.MidSection className="!mx-4 md3-card-section-border flex flex-col">
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
                                        rows={4}
                                        name="description"
                                        multiline
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                            formik.handleChange(e);
                                            const textarea = e.target as HTMLTextAreaElement;
                                            textarea.style.height = '2.5rem';
                                            textarea.style.height = textarea.scrollHeight + 'px';
                                            if (e.target.value === '') {
                                                textarea.style.height = '2.5rem';
                                            }
                                        }}
                                        value={formik.values.description}
                                        helperText={formik.errors.description ?? `${formik.values.description?.length ?? 0}/300`}
                                    />
                                </div>
                            </CardLarge.MidSection>
                        </CardLarge>
                    </div>
                </section>
            </main>
            <CTAMines
                actions={[
                    {
                        title: 'Enregistrer',
                        iconImage: formik.values?.id ? "save_as" : "save",
                        icon: formik.values?.pourcent > 1
                            ? 'Non modifiable votes en cours  ' + formik.values.pourcent + '%'
                            : `Enregistrer`,
                        type: "submit",
                        disabled: formik.values?.pourcent > 1,
                        function: () => { }
                    }
                ]}
            />
        </form>
    );
}
