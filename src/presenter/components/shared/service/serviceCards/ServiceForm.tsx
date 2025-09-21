import { Input, Textarea } from "@material-tailwind/react";
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
import { CardLarge } from "../../base/baseComps/Cards";
import { ServiceCategory } from "../../../../../domain/entities/Service";

export function ServiceForm(props: { formik: any }) {
    const { formik } = props;
    const { user } = useUserStore();

    const [points, setPoints] = useState<string>(formik.values.points?.join(' à ') || '0 à 1');

    useEffect(() => {
        const updatedValues = new ServiceView(formik.values as ServiceView, user)
        formik.setValues(updatedValues);
        setPoints(updatedValues?.points?.join(' à ') || '0 à 1');
    }, [formik.values.hard, formik.values.skill, formik.values.type]);

    const userProfile: Profile = user.Profile;
    const start = formik.values.createdAt || new Date();
    const [imgBlob, setImgBlob] = useState<string | undefined>(formik.values.image);
    const [groupId, setGroupId] = useState<string | undefined>(formik.values.groupId);
    const [expand, setExpand] = useState<boolean>(false);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col h-full overflow-hidden">
            <main>
                <div className="sectionHeader">

                    <div className=" flex flex-col grid-cols-[55%_auto] lg:grid grid-rows-1  gap-2 py-3">
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
                    <SubHeader
                        form
                        type={formik.values.id ? `Modifier votre service ` : "Créer votre service " + '/ ' + formik.values.typeS}
                        place={ServiceCategory[formik.values.category as keyof typeof ServiceCategory] || ''}
                        closeBtn
                    />
                </div>
                <section>
                    <div className="DetailCardDiv hideCTAForm">
                        <CardLarge
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
                            <CardLarge.Chips className="justify-between px-2 pt-1">
                                <ImageBtn
                                    className="!relative -mt-1 mb-2 ml-2"
                                    formik={formik}
                                    setImgBlob={setImgBlob}
                                />
                                <DateChip
                                    prefix="publié le"
                                    start={start}
                                />
                            </CardLarge.Chips>
                            <CardLarge.Headline>
                                <Input
                                    className={`inputStandart ${formik.errors.title ? 'error' : ''}`}
                                    placeholder={"Titre"}
                                    name="title"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                />
                                <InputError mt error={formik.errors.title} />
                            </CardLarge.Headline>
                            <CardLarge.SupportingText>
                                <Textarea
                                    rows={2}
                                    aria-rowcount={2}
                                    isError={!!formik.errors.description}
                                    className={`inputStandart max-h-fit min-h-full`}
                                    placeholder='Description'
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
                                    defaultValue={formik.values?.description}
                                />
                                <InputError mt error={formik.errors.description} />
                            </CardLarge.SupportingText>
                            <CardLarge.Media className="flex flex-col py-3 mt-4 h-max">
                                <span className="md3-card-supporting-text !pl-0">Difficulté du service: </span>
                                <div className="flex  flex-col flex-1 h-full gap-6 md:flex-row ">
                                    <div className="flex border  rounded-3xl border-[var(--md3-outline)] p-3 gap-[5vw]">
                                        <div>
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
                                    <div className="pr-4 h-full flex border  rounded-3xl  p-3 flex-col  justify-between gap-2">
                                        <span className="md3-card-supporting-text">Points </span>
                                        <Chip
                                            size='medium'
                                            value={`${points} pts`}
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
                            </CardLarge.Media>
                        </CardLarge>
                    </div>
                </section>
            </main>
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
        </form>
    );
}
