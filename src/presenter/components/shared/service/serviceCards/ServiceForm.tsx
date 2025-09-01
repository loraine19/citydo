import { Card, CardHeader, Button, Typography, CardBody, Input, Textarea, CardFooter } from "@material-tailwind/react";
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
    //const end = new Date(new Date().getTime() + (1 * dayMS)).toLocaleDateString('fr-FR')
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
                    <div className="wRespXL flex flex-col grid-cols-[1fr_1fr_1fr] lg:grid grid-rows-1 lg:gap-3 gap-2 pt-2">
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
                            placeholder="Choisir une catégorie"
                            formik={formik}

                        />
                        <GroupSelect
                            groupId={groupId}
                            setGroupId={setGroupId}
                            formik={formik}
                            user={user}
                            disabled={formik.values.statusValue > 0} />
                    </div>
                </div>
                <section className={`flex pb-4 flex-1 relative pt-8 overflow-hidden`}>
                    <Card className={`${haveImage ? "CardDetailGrid " : "FixCardNoImage "} `}>
                        <CardHeader className={haveImage ?
                            "FixCardHeader" :
                            "FixCardHeaderNoImage pt-16 pb-0"} >
                            <div className={`${start ? 'ChipDiv !justify-end top-3 right-3' : 'invisible'}`}>
                                <DateChip
                                    prefix="publié le"
                                    start={start} />
                            </div>
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
                        </CardHeader>
                        <CardBody className='FixCardBody '>
                            <div className='overflow-auto py-2 h-full -mt-2 '>
                                <Input className={`inputStandart ${formik.errors.title ? 'error' : ''}`}
                                    placeholder={"Titre"}
                                    name="title"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                />
                                <InputError mt error={formik.errors.title} />
                                <div className='flex flex-col h-max gap-5 pt-2 min-h-max '>
                                    <div className=' relative flex flex-col flex-1 gap-3 '>
                                        <Textarea
                                            className={`inputStandart min-h-full ${formik.errors.description ? 'error' : ''}`}
                                            placeholder='Description'
                                            rows={3}
                                            resize={true}
                                            name="description"
                                            onChange={formik.handleChange}
                                            defaultValue={formik.values.description}
                                        />
                                        <InputError error={formik.errors.description} />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center py-3 mt-2 h-max ">
                                    <Typography className='text-xs'>Difficulté du service: </Typography>
                                    <div className="flex flex-col gap-y-2 md:flex-row justify-between">
                                        <div>
                                            <Select
                                                simple
                                                name={'skill'}
                                                formik={formik}
                                                value={formik.values.skill?.toString()}
                                                options={skillLevels}
                                                placeholder="Niveau de compétence"
                                            />
                                        </div>
                                        <div>
                                            <Select
                                                placeholder="Niveau de difficulté"
                                                simple
                                                name={'hard'}
                                                formik={formik}
                                                value={formik.values.hard?.toString()}
                                                options={hardLevels} />
                                        </div>


                                        <div className="h-full flex flex-col gap-4 py-3 md:py-0 justify-between">
                                            <Chip
                                                size="sm"
                                                value={`${points} points`}
                                                className="flex-1 GrayChip lowercase !font-medium rounded-full max-h-max flex items-center justify-center gap-2 max-w-max px-5"
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
                                            <InputError tips={'Nombres de points'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CardFooter className="DetailCardFooter" />
                        </CardBody>
                    </Card>
                </section>
            </main >
            <footer className="CTA">
                <Button
                    size='lg'
                    type="submit"
                    disabled={formik.values.statusValue > 0}
                    className="lgBtn bg-sky-500 wRespXL">
                    <Icon
                        disabled
                        size='lg'
                        color="white"
                        icon={formik.values.statusValue <= 0 ? 'save' : 'block'}
                    />
                    {formik.values.statusValue > 0 ? 'Non modifiable : ' + formik.values.statusS : `enregistrer`}
                </Button>

            </footer>
        </form >
    )
}