import { Select, Card, CardHeader, Button, Typography, CardBody, Input, Textarea, Checkbox, Option } from "@material-tailwind/react";
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
                                <Option
                                    className="rounded-full my-1 capitalize"
                                    value={category.value}
                                    key={index}
                                >
                                    {category.label}
                                </Option>
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
                                <Input
                                    label={formik.errors.title ? formik.errors.title as string : "titre"}
                                    name="title"
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                    error={Boolean(formik.errors.title)}
                                />
                                <div className="flex flex-col lg:flex-row gap-5 pt-3 h-full">
                                    <div className="flex flex-col flex-1 pt-1">
                                        <Textarea
                                            rows={2}
                                            resize={true}
                                            variant="static"
                                            label={formik.errors.description ? formik.errors.description as string : "Description"}
                                            error={Boolean(formik.errors.description)}
                                            name="description"
                                            onChange={formik.handleChange}
                                            className="focus:outline-none min-h-full"
                                            value={formik.values.description}
                                            containerProps={{ className: "grid h-full" }}
                                            labelProps={{ className: "before:content-none after:content-none" }}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center pt-4 h-full w-full">
                                    <Typography className={`${formik.errors.share && "error"} text-xs`}>
                                        {formik.errors.share ? formik.errors.share as string : "partager"}
                                    </Typography>
                                    <div className="flex items-center gap-[10%]">
                                        <Checkbox
                                            className="checked:bg-rose-500 border-rose-500 checked:border-rose-700"
                                            type="checkbox"
                                            name="shareA"
                                            value="PHONE"
                                            label="telephone"
                                            onChange={formik.handleChange}
                                            checked={checkShare("phone")}
                                        />
                                        <Checkbox
                                            className="checked:bg-rose-500 border-rose-500 checked:border-rose-700"
                                            type="checkbox"
                                            name="shareA"
                                            value="EMAIL"
                                            label="email"
                                            onChange={formik.handleChange}
                                            checked={checkShare("email")}
                                        />
                                    </div>
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