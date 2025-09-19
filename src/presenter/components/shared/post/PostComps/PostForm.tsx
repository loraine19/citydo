import { Input, Textarea, } from "@material-tailwind/react";
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
                            <CardLarge.Chips className="justify-between  px-2 pt-1">
                                <ImageBtn
                                    className="!relative -mt-1 mb-2 ml-2"
                                    formik={formik}
                                    setImgBlob={setImgBlob} />
                                <DateChip
                                    prefix="publié le"
                                    start={start} />
                            </CardLarge.Chips>

                            <CardLarge.Headline >
                                <Input className={`inputStandart ${formik.errors.title ? 'error' : ''}`}
                                    placeholder={"Titre"}
                                    name="title"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                />
                                <InputError mt error={formik.errors.title} />
                            </CardLarge.Headline>
                            <CardLarge.SupportingText className=" ">
                                <div className=''>
                                    <Textarea
                                        isError={!!formik.errors.description}
                                        className={`inputStandart`}
                                        placeholder='Description'
                                        rows={2}
                                        resize={true}
                                        name="description"
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                            formik.handleChange(e);
                                            const textarea = e.target as HTMLTextAreaElement;
                                            textarea.style.height = '2.5rem';
                                            textarea.style.height = textarea.scrollHeight + 'px';
                                            if (e.target.value === '') {
                                                textarea.style.height = '2.5rem';
                                            }
                                        }}
                                        defaultValue={formik.values.description}
                                    />
                                    <InputError mt error={formik.errors.description} />
                                </div>
                            </CardLarge.SupportingText>
                            <CardLarge.Media className="flex pb-4 justify-center ">
                                <div className="flex items-center gap-4 pb-1">
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
                                <InputError
                                    mt
                                    tips="Choisir un moyen de contact"
                                    error={formik.errors.shareA} />
                            </CardLarge.Media>
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