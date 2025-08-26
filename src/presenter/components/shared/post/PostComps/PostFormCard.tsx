import { Select, Card, CardHeader, Button, CardBody, Input, Textarea, Checkbox } from "@material-tailwind/react";
import { useState } from "react";
import { Label } from "../../../../../domain/entities/frontEntities"
import SubHeader from "../../../common/SubHeader";
import { ImageBtn } from "../../../common/ImageBtn";
import { DateChip } from "../../../common/ChipDate";
import { postCategories } from "../../../../constants";
import { PostCategory } from "../../../../../domain/entities/Post";
import { Icon } from "../../../common/IconComp";
import GroupSelect from "../../../common/GroupSelect";
import { useUserStore } from "../../../../../application/stores/user.store";
import { InputError } from "../../../common/adaptatersComps/input";


interface PostFormCardProps {
    formik: any;
}

export function PostFormCard({ formik }: PostFormCardProps) {
    const [imgBlob, setImgBlob] = useState<string>(formik.values.image || '');
    const checkShare = (word: string) => formik.values?.shareA?.toString().toLowerCase().includes(word);
    const start = formik.values.createdAt ? new Date(formik.values.createdAt) : new Date();
    const [groupId, setGroupId] = useState<number | String | undefined>(formik.values.Group?.id);
    const user = useUserStore((state) => state.user);


    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full overflow-hidden">
            <main>
                <div className="sectionHeader gap-2">
                    <SubHeader
                        type={formik.values.title ? `Modifier mon annonce ` : "Créer mon annonce "}
                        place={PostCategory[formik.values.category as keyof typeof PostCategory] || ''}
                        closeBtn
                    />
                    <div className="w-respLarge flex flex-col lg:flex-row !gap-4 pb-2 pt-4">
                        <Select
                            className="rounded-full shadow bg-white border-none capitalize"
                            label={formik.errors.category ? formik.errors.category as string : "Choisir la catégorie"}
                            name="category"
                            labelProps={{ className: `${formik.errors.category && "error"} before:border-none after:border-none` }}
                            value={formik.values.category || ""}
                            onChange={(val: any) => { formik.setFieldValue('category', val) }} >
                            {postCategories.map((category: Label, index: number) => (
                                <Select.Option
                                    className="rounded-full my-1 capitalize"
                                    value={category.value}
                                    key={index}
                                >
                                    {category.label}
                                </Select.Option>
                            ))}
                        </Select>
                        <GroupSelect
                            groupId={groupId?.toString()}
                            setGroupId={setGroupId}
                            formik={formik}
                            user={user} />
                    </div>
                </div>
                <section className={`flex pb-1 flex-1 relative pt-6`}>
                    <Card className={`${(imgBlob || formik.values.image) ?
                        "FixCard" :
                        "FixCardNoImage"} w-respLarge`}>
                        <CardHeader
                            className={(imgBlob || formik.values.image) ?
                                "FixCardHeader" :
                                "FixCardHeaderNoImage  pt-16"}
                            floated={imgBlob || formik.values.image ?
                                true : false} >
                            <div className={`${start ? 'ChipDiv !justify-end' : 'invisible'}`}>
                                <DateChip
                                    prefix="publié le"
                                    start={start} />
                            </div>
                            <ImageBtn
                                className="!absolute z-40 !h-max bottom-0 !left-3 mb-1"
                                formik={formik}
                                setImgBlob={setImgBlob} />
                            <img
                                onError={(e) => e.currentTarget.src = "/images/placeholder.jpg"}
                                src={(imgBlob || formik.values.image) ?? null}
                                alt={formik.values.title || 'image'}
                                width={100}
                                height={100}
                                className={(imgBlob || formik.values.image) ?
                                    "CardImage" : "hidden"}
                            />
                        </CardHeader>
                        <CardBody className="FixCardBody">
                            <div className="CardOverFlow  justify-between gap-4">
                                <Input className={`inputStandart ${formik.errors.title ? 'error' : ''}`}
                                    placeholder={"Titre"}
                                    name="title"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                />
                                <InputError error={formik.errors.title} />
                                <div className='flex flex-col lg:flex-row gap-5 pt-2 h-full '>
                                    <div className='flex flex-col flex-1  '>
                                        <Textarea
                                            className={`inputStandart min-h-full ${formik.errors.description ? 'error' : ''}`}
                                            placeholder='Description'
                                            rows={2}
                                            resize={true}
                                            name="description"
                                            onChange={formik.handleChange}
                                            defaultValue={formik.values.description}
                                        //  // containerProps={{ className: "grid h-full pb-1" }}
                                        />
                                        <InputError mt error={formik.errors.description} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 justify-center pt-4 h-full w-full">
                                    <div className="flex items-center gap-[10%]">
                                        <Checkbox
                                            className="checked:bg-rose-500 border-rose-500 checked:border-rose-700"
                                            type="checkbox"
                                            name="shareA"
                                            value="PHONE"
                                            //  label="telephone"
                                            onChange={formik.handleChange}
                                            checked={checkShare("phone")}
                                        />
                                        <Checkbox
                                            className="checked:bg-rose-500 border-rose-500 checked:border-rose-700"
                                            type="checkbox"
                                            name="shareA"
                                            value="EMAIL"
                                            // label="email"
                                            onChange={formik.handleChange}
                                            checked={checkShare("email")}
                                        />
                                    </div>
                                    <InputError mt tips="Choisir un moyen de contact" error={formik.errors.share} />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </section>
            </main>
            <footer className="CTA">
                <Button
                    size='lg'
                    type="submit"
                    className="lgBtn bg-rose-500">
                    <Icon
                        size='lg'
                        icon={formik.values?.id ? "save_as" : "save"}
                        color="white" />
                    {formik.values?.id ? "Modifier l'annonce" : "Créer l'annonce"}
                </Button>
            </footer>
        </form>
    );
}