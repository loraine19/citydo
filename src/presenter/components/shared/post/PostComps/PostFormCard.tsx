import { Card, CardHeader, CardBody, Input, Textarea, Checkbox, Typography } from "@material-tailwind/react";
import { useState } from "react";
import SubHeader from "../../../common/SubHeader";
import { ImageBtn } from "../../../common/ImageBtn";
import { DateChip } from "../../../common/ChipDate";
import { postCategories } from "../../../../constants";
import { PostCategory } from "../../../../../domain/entities/Post";
import { Icon } from "../../../common/IconComp";
import GroupSelect from "../../../common/GroupSelect";
import { useUserStore } from "../../../../../application/stores/user.store";
import { InputError } from "../../../common/adaptatersComps/input";
import { Select } from "../../../common/adaptatersComps/Select";
import CTAMines from "../../../common/CTA";


interface PostFormCardProps {
    formik: any;
}

export function PostFormCard({ formik }: PostFormCardProps) {
    const [imgBlob, setImgBlob] = useState<string>(formik.values.image || '');
    const checkShare = (word: string) => formik.values?.shareA?.toString().toLowerCase().includes(word);
    const start = formik.values.createdAt ? new Date(formik.values.createdAt) : new Date();
    const [groupId, setGroupId] = useState<number | String | undefined>(formik.values.Group?.id);
    const user = useUserStore((state) => state.user);

    const haveImage = formik.values.image ? true : false;


    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full overflow-hidden">
            <main>
                <div className="sectionHeader gap-2">
                    <SubHeader
                        type={formik.values.title ? `Modifier mon annonce ` : "Créer mon annonce "}
                        place={PostCategory[formik.values.category as keyof typeof PostCategory] || ''}
                        closeBtn
                    />
                    <div className="w-respLarge flex flex-col lg:flex-row lg:gap-4 pb-2 pt-2 gap-2">
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
                </div>
                <section >
                    <div className={`FormCardDiv `}>
                        <Card className={`${haveImage ? "FormDetailGrid " : "FixCardNoImage "} `}>
                            <CardHeader className={haveImage ?
                                "FixCardHeader" :
                                "FixCardHeaderNoImage pt-16 pb-0"} >
                                <div className={`${start ? 'ChipDiv !justify-end absolute top-3' : 'invisible'}`}>
                                    <DateChip
                                        prefix="publié le"
                                        start={start} />
                                </div>
                                <ImageBtn
                                    className="!absolute z-40 !h-max top-4 !left-3 mb-1"
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
                            <CardBody className={`${(imgBlob || formik.values.image) ? ' max-h-full' : ' h-max '} FixCardBody `}>
                                <div className="overflow-auto h-full pt-2">
                                    <Input className={`inputStandart ${formik.errors.title ? 'error' : ''}`}
                                        placeholder={"Titre"}
                                        name="title"
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                    />
                                    <InputError mt error={formik.errors.title} />
                                    <div className='flex flex-col min-h-max  pt-1 '>
                                        <div className='flex flex-col '>
                                            <Textarea
                                                isError={!!formik.errors.description}
                                                className={`inputStandart`}
                                                placeholder='Description'
                                                rows={4}
                                                resize={true}
                                                name="description"
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                    formik.handleChange(e);
                                                    const textarea = e.target as HTMLTextAreaElement;
                                                    textarea.style.height = '2.5rem';
                                                    textarea.style.height = textarea.scrollHeight + 'px';
                                                }}
                                                defaultValue={formik.values.description}
                                            />
                                            <InputError mt error={formik.errors.description} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 justify-center pt-6 w-full">
                                        <div className="flex items-center gap-4 pb-1">
                                            <div className="flex items-center gap-2 px-4">
                                                <Checkbox
                                                    className={`border-none shadow-none hover:shadow-none data-[checked=true]:bg-transparent`}
                                                    id='phone-checkbox'
                                                    type="checkbox"
                                                    name="shareA"
                                                    value="PHONE"
                                                    onChange={formik.handleChange}
                                                    checked={checkShare("phone")} >
                                                    <Checkbox.Indicator
                                                        className="relative opacity-100 flex items-center justify-center">
                                                        <Icon style={'opacity-0 group-data-[checked=true]:opacity-100 absolute top-[50%] translate-y-[-50%] -left-1'}
                                                            bg
                                                            size='sm'
                                                            color={formik.errors.shareA ? 'red' : 'slate'}
                                                            icon={""}
                                                        />
                                                        <Icon style={'opacity-100 group-data-[checked=true]:opacity-0 !absolute top-[50%] translate-y-[-50%] -left-1'}
                                                            bg
                                                            size='sm'
                                                            color={formik.errors.shareA ? 'red' : 'rose'}
                                                            icon={"check"}
                                                        />
                                                    </Checkbox.Indicator>

                                                </Checkbox>
                                                <Typography
                                                    as="label"
                                                    htmlFor="default-checkbox"
                                                    className="cursor-pointer text-sm text-foreground"
                                                >
                                                    Téléphone
                                                </Typography>
                                            </div>

                                            <div className="flex items-center gap-2 px-4">
                                                <Checkbox
                                                    className={`border-none shadow-none hover:shadow-none data-[checked=true]:bg-transparent`}
                                                    id='email-checkbox'
                                                    type="checkbox"
                                                    name="shareA"
                                                    value="EMAIL"
                                                    onChange={formik.handleChange}
                                                    checked={checkShare("email")}>
                                                    <Checkbox.Indicator
                                                        className="relative opacity-100 flex items-center justify-center">
                                                        <Icon style={'opacity-0 group-data-[checked=true]:opacity-100 absolute top-[50%] translate-y-[-50%] -left-1'}
                                                            bg
                                                            size='sm'
                                                            color={formik.errors.checkbox ? 'red' : 'slate'}
                                                            icon={""}
                                                        />
                                                        <Icon style={'opacity-100 group-data-[checked=true]:opacity-0 !absolute top-[50%] translate-y-[-50%] -left-1'}
                                                            bg
                                                            size='sm'
                                                            color={formik.errors.checkbox ? 'red' : 'rose'}
                                                            icon={"check"}
                                                        />
                                                    </Checkbox.Indicator>
                                                </Checkbox>
                                                <Typography
                                                    as="label"
                                                    htmlFor="email-checkbox"
                                                    className="cursor-pointer text-foreground text-sm"
                                                >
                                                    Email
                                                </Typography>
                                            </div>
                                        </div>
                                        <InputError mt tips="Choisir un moyen de contact" error={formik.errors.share} />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </section>
            </main>
            <CTAMines
                actions={[
                    {
                        type: 'submit',
                        icon: formik.values?.id ? "Modifier l'annonce" : "Créer l'annonce",
                        iconImage: formik.values?.id ? "save_as" : "save",
                        direct: true,
                        function: formik.handleSubmit
                    }
                ]} />
        </form>
    );
}