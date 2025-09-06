import { Card, CardHeader, Typography, CardBody, Input, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import SubHeader from "../../../common/SubHeader";
import { Profile } from "../../../../../domain/entities/Profile";
import { useUserStore } from "../../../../../application/stores/user.store";
import { ImageBtn } from "../../../common/ImageBtn";
import { Icon } from "../../../common/IconComp";
import { DateChip } from "../../../common/ChipDate";
import { hardLevels, serviceCategories, skillLevels } from "../../../../constants";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import GroupSelect from "../../../common/GroupSelect";
import { InputError } from "../../../common/adaptatersComps/input";
import Chip from "../../../common/adaptatersComps/Chip";
import { RadioGroup } from "../../../common/adaptatersComps/RadioGroup";
import { Select } from "../../../common/adaptatersComps/Select";
import CTAMines from "../../../common/CTA";

export function ServiceForm(props: { formik: any }) {
    const { formik } = props;
    const { user } = useUserStore();

    // DEBUT LOGIQUE CALCUL POUR CHAMPS POINTS ds form
    const [points, setPoints] = useState<string>(formik.values.points?.join(' à ') || '0 à 1');

    useEffect(() => {
        const updatedValues = new ServiceView(formik.values as ServiceView, user)
        formik.setValues(updatedValues);
        setPoints(updatedValues?.points?.join(' à ') || '0 à 1');
    }, [formik.values.hard, formik.values.skill, formik.values.type]);


    const userProfile: Profile = user.Profile;
    const start = formik.values.createdAt || new Date()
    const haveImage = formik.values.image ? true : false;
    const [imgBlob, setImgBlob] = useState<string | undefined>(formik.values.image);
    const [groupId, setGroupId] = useState<string | undefined>(formik.values.groupId);


    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col h-full overflow-hidden">
            <main>
                <div className="sectionHeader">
                    <SubHeader
                        type={formik.values.id ? `Modifier votre service ` : "Créer votre service "}
                        place={formik.values.title}
                        closeBtn
                    />
                    <div className="w-respLarge flex flex-col grid-cols-[55%_auto] lg:grid grid-rows-1  gap-2 py-3">
                        <div className="flex gap-2 flex-1 w-full ">
                            <RadioGroup
                                name={"type"}
                                orientation="horizontal"
                                options={[
                                    { id: "demande-radio", label: "Demande", value: "GET" },
                                    { id: "offre-radio", label: "Offre", value: "DO" },
                                ]}
                                value={formik.values.type}
                                onChange={(val) =>
                                    formik.setFieldValue("type", val)}
                                disabled={formik.values.statusValue > 0}
                            />
                            <Select
                                options={serviceCategories}
                                disabled={formik.values.statusValue > 0}
                                name={"category"}
                                value={formik.values.category}
                                placeholder="Catégorie"
                                formik={formik}
                            />
                        </div>
                        <GroupSelect
                            groupId={groupId}
                            setGroupId={setGroupId}
                            formik={formik}
                            user={user}
                            disabled={formik.values.statusValue > 0} />
                    </div>
                </div>
                <section>
                    <div className={`FormCardDiv !pb-8 `}>
                        <Card className={`${haveImage ? "FormDetailGrid " : "FixCardNoImage "} `}>
                            <CardHeader className={haveImage ?
                                "FixCardHeader" :
                                "FixCardHeaderNoImage pt-16 pb-0"} >
                                <ImageBtn
                                    className="!absolute z-40 !h-max !left-3  top-3"
                                    formik={formik}
                                    setImgBlob={setImgBlob} />
                                <img
                                    onError={(e) => e.currentTarget.src = '/images/placeholder.jpg'}
                                    src={imgBlob || formik.values.image || null}
                                    alt={formik.values.title || 'image'}
                                    width={100}
                                    height={100}
                                    className={haveImage ? "CardImage" : "hidden"}
                                />
                                <div className={`${start ? 'ChipDiv !justify-end top-3 right-3' : 'invisible'}`}>
                                    <DateChip
                                        prefix="publié le"
                                        start={start} />
                                </div>

                            </CardHeader>
                            <CardBody className='FixCardBody '>
                                <div className='py-2 h-full -mt-2 '>
                                    <Input className={`inputStandart ${formik.errors.title ? 'error' : ''}`}
                                        placeholder={"Titre"}
                                        name="title"
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                    />
                                    <InputError mt error={formik.errors.title} />
                                    <div className='flex flex-col h-max gap-5 pt-2 min-h-max '>
                                        <div className=' relative flex flex-col flex-1 '>
                                            <Textarea
                                                rows={3}
                                                aria-rowcount={3}
                                                isError={!!formik.errors.description}
                                                className={`inputStandart max-h-fit min-h-full`}
                                                placeholder='Description'
                                                resize={true}
                                                name="description"
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                    formik.handleChange(e);
                                                    const textarea = e.target as HTMLTextAreaElement;
                                                    textarea.style.height = 'fit-content';

                                                    textarea.style.height = textarea.scrollHeight + 'px';
                                                }}
                                                defaultValue={formik.values?.description}
                                            />
                                            <InputError mt error={formik.errors.description} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center py-3 mt-2 h-max ">
                                        <Typography className='text-xs'>Difficulté du service: </Typography>
                                        <div className="flex flex-col flex-1 h-full gap-y-3 md:flex-row justify-between">
                                            <div className="flex gap-2"> <div>
                                                <Select
                                                    simple
                                                    name={'skill'}
                                                    formik={formik}
                                                    value={formik.values.skill?.toString()}
                                                    options={skillLevels}
                                                    placeholder="Compétence"
                                                />
                                            </div>
                                                <div>
                                                    <Select
                                                        placeholder="Pénibilité"
                                                        simple
                                                        name={'hard'}
                                                        formik={formik}
                                                        value={formik.values.hard?.toString()}
                                                        options={hardLevels} />
                                                </div>

                                            </div>
                                            <div className="pt-2">
                                                <Chip
                                                    size="sm"
                                                    value={`${points} pts`}
                                                    className="grayChip -mr-2 "
                                                    icon={
                                                        <Icon
                                                            color={formik.values.type === "do" ?
                                                                "green" : "orange"}
                                                            icon="toll"
                                                            size="sm"
                                                            style=" ml-0.5"
                                                            fill={userProfile?.points > parseInt(points[0])}
                                                        />}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </section>
            </main >

            <CTAMines
                actions={[
                    {
                        disabled: formik.values.statusValue > 0,
                        type: 'submit',
                        icon: formik.values.statusValue > 0 ? 'Non modifiable : ' + formik.values.statusS : `enregistrer`,
                        iconImage: formik.values?.id ? "save_as" : "save",
                        function: () => { }
                    }
                ]} />
        </form >
    )
}