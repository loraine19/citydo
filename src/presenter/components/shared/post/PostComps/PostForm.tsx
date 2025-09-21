import { useState } from "react";
import SubHeader from "../../../common/SubHeader";
import { ImageBtn } from "../../../common/ImageBtn";
import { DateChip } from "../../../common/ChipDate";
import { postCategories } from "../../../../constants";
import { PostCategory } from "../../../../../domain/entities/Post";
import GroupSelect from "../../../common/GroupSelect";
import { useUserStore } from "../../../../../application/stores/user.store";
import { InputError } from "../../../common/adaptatersComps/input";
import { Select } from "../../../common/adaptatersComps/Select";
import CTAMines from "../../../common/CTA";
import { CardLarge } from "../../base/baseComps/Cards";
import { Checkbox } from "../../base/baseComps/Selectors";
import { Input } from "../../base/baseComps/Inputs";


interface PostFormCardProps {
    formik: any;
}

export function PostFormCard({ formik }: PostFormCardProps) {
    const [imgBlob, setImgBlob] = useState<string>(formik.values.image || '');
    const checkShare = (word: string) => formik.values?.shareA?.toString().toLowerCase().includes(word);
    const start = formik.values.createdAt ? new Date(formik.values.createdAt) : new Date();
    const [groupId, setGroupId] = useState<number | String | undefined>(formik.values.Group?.id);
    const user = useUserStore((state) => state.user);
    const [expand, setExpand] = useState<boolean>(false);


    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full overflow-hidden">
            <main>
                <div className="sectionHeader gap-2">
                    <div className=" flex flex-col lg:flex-row lg:gap-4 pb-2 pt-2 gap-2">
                        <Select
                            options={postCategories}
                            placeholder="Choisir la catégorie"
                            formik={formik}
                            name="category"
                        />
                        <GroupSelect
                            groupId={groupId?.toString()}
                            setGroupId={setGroupId}
                            formik={formik}
                            user={user} />
                    </div>
                    <SubHeader
                        form
                        type={formik.values.title ? `Modifier mon annonce ` : "Créer mon annonce "}
                        place={PostCategory[formik.values.category as keyof typeof PostCategory] || ''}
                        closeBtn
                    />
                </div>
                <section >
                    <div className={`DetailCardDiv hideCTAForm`}>
                        <CardLarge
                            form
                            expanded={expand}
                            setExpanded={setExpand}
                            image={
                                <CardLarge.Image
                                    className="md3-rose-container"
                                    src={(imgBlob || formik.values.image) ?? null}
                                    alt={formik.values.title || 'image'}
                                >

                                </CardLarge.Image>
                            }>
                            <CardLarge.Chips className="justify-between  px-4">

                                <ImageBtn
                                    variant="outlined"
                                    color={'slate'}
                                    className={"relative pb-1"}
                                    formik={formik}
                                    setImgBlob={setImgBlob}
                                />
                                <DateChip
                                    prefix="publié le"
                                    start={start} />
                            </CardLarge.Chips>

                            <CardLarge.MidSection className="!mx-4 md3-card-section-border flex flex-col">
                                <span className="md3-card-subhead">Informations</span>
                                <div className="flex flex-1 flex-col  gap-4">

                                    <Input
                                        className={`inputStandart ${formik.errors.title ? 'error' : ''}`}
                                        label={"Titre"}
                                        name="title"
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                        error={!!formik.errors.title}
                                        helperText={formik.errors.title ?? `${formik.values.title ? formik.values.title.length : 0}/40`}
                                    />


                                    <Input
                                        error={!!formik.errors.description}
                                        className={``}
                                        label='Description'
                                        rows={1}
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
                                        helperText={`${formik.errors.description ?? formik.values.description ? formik.values.description.length : 0}/500`}
                                    />
                                </div>
                            </CardLarge.MidSection>
                            <CardLarge.MidSection className="!mx-4 md3-card-section-border flex flex-col">
                                <span className="md3-card-subhead">{formik?.errors?.shareA ?? 'Contact'}</span>
                                <div className="flex flex-1   gap-4">

                                    <Checkbox
                                        color="rose"
                                        label="Téléphone"
                                        id='phone-checkbox'
                                        name="shareA"
                                        value="PHONE"
                                        onChange={(e: any) => {
                                            formik.handleChange(e);

                                        }}
                                        checked={checkShare("phone")} >
                                    </Checkbox>

                                    <Checkbox
                                        color="rose"
                                        label="Email"
                                        id='email-checkbox'
                                        name="shareA"
                                        value="EMAIL"
                                        onChange={(e: any) => formik.handleChange(e)}
                                        checked={checkShare("email")}>
                                    </Checkbox>
                                </div>

                            </CardLarge.MidSection>
                        </CardLarge>
                    </div>
                </section>
            </main >
            <CTAMines
                actions={[
                    {
                        type: 'submit',
                        icon: formik.values?.id ? "Modifier l'annonce" : "Créer l'annonce",
                        iconImage: formik.values?.id ? "save_as" : "save",
                        direct: true,
                        function: () => { }
                    }
                ]} />
        </form >
    );
}