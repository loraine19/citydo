import { useEffect, useMemo, useState } from "react";
import { Profile } from "../../../../../domain/entities/Profile";
import { useUserStore } from "../../../../../application/stores/user.store";
import { ImageBtn } from "../../../common/ImageBtn";
import { Icon } from "../../../common/IconComp";
import { DateChip } from "../../../common/ChipDate";
import { hardLevels, serviceCategories, skillLevels } from "../../../../constants";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import GroupSelect from "../../../common/GroupSelect";
import Chip from "../../../common/adaptatersComps/Chip";
import { RadioGroup } from "../../../common/adaptatersComps/RadioGroup";
import { Select } from "../../../common/adaptatersComps/Select";
import CTAMines from "../../../common/CTA";
import { CardLarge } from "../../base/baseComps/Cards";
import { Input } from "../../base/baseComps/Inputs";
import { useNavStore } from "../../../../../application/stores/nav.store";
import FormHeadSection from "../../base/baseComps/FormHeadSection";
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


    ////FOR APPBAR
    const { setDetailSection } = useNavStore((state) => state);
    const [show, setShow] = useState(true);
    const SearchSection = useMemo(() => (
        <FormHeadSection
            showProps={{
                show, setShow,
                text: (formik.errors.groupId || formik.errors.category) ? "Veuillez choisir une catégorie et un groupe" : 'modifier groupe et catégorie',
                color: (formik.errors.groupId || formik.errors.category) ? "error" : "slate"
            }}
            infosChipValue={formik.values.id ?
                `Modifier votre service ` : "Créer votre service "
                + '/ ' + (formik.values.typeS ?? '...')
                + ' / ' + (ServiceCategory[formik.values.category as keyof typeof ServiceCategory] ?? '...')} >
        </FormHeadSection>
    ), [show, formik.values, formik.errors]);

    useEffect(() => {
        setDetailSection(SearchSection);
        return () => {
            setDetailSection(undefined);
        }
    }, [SearchSection, show, formik.values, formik.errors]);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col h-full overflow-hidden">
            <main className="wRespXLMargin">

                <section>
                    <div className="DetailCardDiv hideCTAForm">
                        <div className="flex flex-col gap-2">
                            {<div className={`p-2 max-h-max w-full flex flex-col grid-cols-[auto_auto] lg:grid grid-rows-1 gap-2
                                 ${show ? 'md3-menu-enter' : 'md3-menu-leave h-0.5'} `}>
                                <div className="flex flex-wrap gap-2 flex-1 w-full ">
                                    <RadioGroup
                                        variant="Input"
                                        name={"type"}
                                        orientation="horizontal"
                                        options={[
                                            { id: "demande-radio", label: "Demande", value: "GET" },
                                            { id: "offre-radio", label: "Offre", value: "DO" },
                                        ]}
                                        value={formik.values.type}
                                        onChange={(val) => formik.setFieldValue("type", val)}
                                        disabled={formik.values.statusValue > 0}
                                    />
                                    <Select
                                        variant="Input"
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
                            </div>}
                            <CardLarge
                                className={`${!show ? "animSheet" : "animSheetRev"}`}
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
                                            error={!!formik.errors.title}
                                            label={"Titre"}
                                            name="title"
                                            onChange={formik.handleChange}
                                            value={formik.values.title}
                                            helperText={formik.errors.title ?? `${formik.values.title?.length ?? 0}/40`} />
                                        <Input
                                            error={!!formik.errors.description}
                                            className={``}
                                            label='Description'
                                            rows={3}
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
                                            helperText={`${formik.errors.description ?? (`${formik.values.description?.length ?? 0}/300`)}`}
                                        />
                                    </div>
                                </CardLarge.MidSection>
                                <CardLarge.MidSection className="!mx-4 md3-card-section-border max-h-max flex flex-col">
                                    <span className="md3-card-subhead">Niveaux</span>
                                    <div className="flex flex-1  !py-2 flex-col gap-4">
                                        <div className="flex flex-col xs:flex-row gap-4 ">
                                            <Select
                                                variant="Input"
                                                name={'skill'}
                                                formik={formik}
                                                value={formik.values.skill?.toString()}
                                                options={skillLevels}
                                                placeholder="Compétence" />
                                            <Select
                                                placeholder="Pénibilité"
                                                variant="Input"
                                                name={'hard'}
                                                formik={formik}
                                                value={formik.values.hard?.toString()}
                                                options={hardLevels} />
                                        </div>
                                        <Chip
                                            className="!px-3 h-[2.8rem] !rounded-md"
                                            size='medium'
                                            value={`${points} pts`}
                                            icon={
                                                <Icon
                                                    color={formik.values.type === "do" ?
                                                        "green" : "orange"}
                                                    icon="toll"
                                                    size="md"
                                                    style=""
                                                    fill={userProfile?.points > parseInt(points[0])}
                                                />}
                                        />
                                    </div>
                                </CardLarge.MidSection>
                            </CardLarge>
                        </div>
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
        </form >
    );
}
