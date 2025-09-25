import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "../../../../../application/stores/user.store";
import { AddressDTO } from "../../../../../infrastructure/DTOs/AddressDTO";
import { eventCategories, EventImage } from "../../../../constants";
import { getLabel, dayMS, formatDateForDB } from "../../../../views/viewsEntities/utilsService";
import AddressMapOpen from "../../../common/mapComps/AddressMapOpen";
import { AddressInputOpen } from "../../../common/mapComps/AddressInputOpen";
import { ImageBtn } from "../../../common/ImageBtn";
import { DateChip } from "../../../common/ChipDate";
import GroupSelect from "../../../common/GroupSelect";
import { Select } from "../../../common/adaptatersComps/Select";
import CTAMines from "../../../common/CTA";
import { CardLarge } from "../../base/baseComps/Cards";
import { Input } from "../../base/baseComps/Inputs";
import { ProgressBar } from "../../base/baseComps/Sliders";
import { Icon } from "../../../common/IconComp";
import { useNavStore } from "../../../../../application/stores/nav.store";
import FormHeadSection from "../../base/baseComps/FormHeadSection";
import { Button } from "../../base/baseComps/Buttons";

interface EventFormProps {
    formik: any;
    Address: AddressDTO;
    setAddress: any;
}

export function EventForm({ formik, Address, setAddress }: EventFormProps) {
    const user = useUserStore((state) => state.user);
    const [imgBlob, setImgBlob] = useState<string>(formik.values.image ?? formik.values.blob ?? EventImage[formik.values.category as keyof typeof EventImage] ?? EventImage.default ?? '');
    const [groupId, setGroupId] = useState<string | number | undefined>(formik.values.Group?.id);
    const [expand, setExpand] = useState<boolean>(false);

    // Stepper logic
    const [show, setShow] = useState(true);
    const [showCard, setShowCard] = useState(false);

    const pourcentParticipants = Math.floor((formik.values.Participants?.length) / (formik.values.participantsMin || 1) * 100) || 0;
    const today = new Date(new Date().getTime() + (1 * dayMS)).toISOString().slice(0, 16).replace('Z', '');

    useEffect(() => {
        setAddress(Address);
        if (Address) {
            formik.values.Address = Address;
        }
    }, [Address]);

    useEffect(() => {
        if (!formik.values.image || formik.values.image === '') {
            setImgBlob(EventImage[formik.values.category as keyof typeof EventImage] || EventImage.default);
        }
    }, [formik.values.category, show]);

    // AppBar Section
    const { setDetailSection } = useNavStore((state) => state);
    const label = formik.values.category ? getLabel(formik.values.category, eventCategories) : '';
    const SearchSection = useMemo(() => (
        <FormHeadSection
            showProps={(!showCard) ? undefined : {
                show, setShow,
                text: show ? "Saisir Informations principales" : "Modifier Informations principales",
                color: (formik.errors.groupId || formik.errors.category) ? "error" : "slate"
            }}
            infosChipValue={
                (formik.values.id ? "Modifier mon évenement " : "Créer mon évenement ")
                + (label ? " / " + label : "...")
            }
        />
    ), [show, formik.values.id, label, formik.errors.groupId, formik.errors.category, showCard]);

    useEffect(() => {
        setDetailSection(SearchSection);
        return () => setDetailSection(undefined);
    }, [SearchSection, setDetailSection, formik.values.id, label, formik.errors.groupId, formik.errors.category, show, showCard]);



    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full overflow-hidden">
            <main className="wRespXLMargin">
                <section className={`"DetailCardDiv  " ${show ? 'overflow-hidden' : 'overflow-auto hideCTAForm'} `}>
                    <div className={`p-2 max-h-max w-full flex flex-col  gap-2 ${(show) ? 'md3-animation-slide-down' : 'md3-animation-slide-out-up h-0'}`}>
                        <h6 className="md3-card-subhead pt-4">Informations principales</h6>
                        <div className="flex flex-col flex-wrap gap-4 flex-1 w-full">
                            <Select
                                variant="Input"
                                value={formik.values.category}
                                options={eventCategories}
                                formik={formik}
                                name="category"
                                placeholder="Choisir la catégorie"
                            />
                            <GroupSelect
                                groupId={groupId?.toString()}
                                setGroupId={setGroupId}
                                formik={formik}
                                user={user}
                            />
                            {
                                (!formik.errors.groupId && !formik.errors.category && formik.values.groupId && formik.values.category) &&
                                <Button
                                    color='cyan'
                                    type='button'
                                    onClick={() => {
                                        setShowCard(true);
                                        setShow(false);
                                        setExpand(true);
                                    }}>
                                    Continuer
                                </Button>
                            }
                        </div>
                    </div>
                    <CardLarge
                        className={` ${(showCard && !show) ?
                            ` md3-animation-slide-up ` : ' md3-animation-slide-out-down '}`}
                        form
                        expanded={expand}
                        setExpanded={setExpand}
                        image={
                            <CardLarge.Image
                                className="md3-cyan-container"
                                src={imgBlob ?? formik.values.image ?? null}
                                alt={formik.values.title || 'image'}
                            />
                        }
                    >
                        <CardLarge.Chips className="justify-between px-4">
                            <ImageBtn
                                imgBlob={imgBlob}
                                variant="tonal"
                                className={"relative pb-1"}
                                formik={formik}
                                setImgBlob={setImgBlob}
                                imgDef={EventImage[formik.values.category as keyof typeof EventImage] || EventImage.default}
                            />
                            <DateChip
                                prefix=" "
                                start={formik.values.createdAt ?? new Date()}
                            />
                        </CardLarge.Chips>
                        <CardLarge.Divider />
                        <CardLarge.MidSection className="md:!px-8  flex flex-col">
                            <span className="md3-card-subhead">Informations</span>
                            <div className="flex flex-1 flex-col gap-4">
                                <Input
                                    label={"Titre"}
                                    name="title"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                    error={!!formik.errors.title}
                                    helperText={formik.errors.title ?? `${formik.values?.title?.length ?? 0}/40`}
                                />
                                <Input
                                    multiline
                                    rows={6}
                                    error={!!formik.errors.description}
                                    label='Description'
                                    name="description"
                                    helperText={`${formik.errors.description ?? (`${formik.values.description?.length ?? 0}/300`)}`}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                        formik.handleChange(e);
                                        const textarea = e.target as HTMLTextAreaElement;
                                        textarea.style.height = '8rem';
                                        textarea.style.height = textarea.scrollHeight + 'px';
                                        if (e.target.value === '') {
                                            textarea.style.height = '8rem';
                                        }
                                    }}
                                    value={formik.values.description}
                                />
                            </div>
                        </CardLarge.MidSection>
                        <CardLarge.Divider />
                        <CardLarge.MidSection className="md:px-8 flex flex-col">
                            <span className="md3-card-subhead">Lieu</span>
                            <div className="flex flex-1 flex-col md:flex-row gap-4">
                                {(Address?.lat && Address?.lng) ?
                                    <div className="flex-1 mb-2 !max-h-[7rem]">
                                        <AddressMapOpen address={Address} />
                                    </div> : null}
                                <AddressInputOpen
                                    formik={formik}
                                    address={Address}
                                    setAddress={setAddress}
                                    error={formik.errors.Address}
                                />
                            </div>
                        </CardLarge.MidSection>
                        <CardLarge.Divider />
                        <CardLarge.MidSection className="md:px-8 flex flex-col">
                            <span className="md3-card-subhead">Date</span>
                            <div className="flex flex-1 flex-col md:flex-row gap-4">
                                <Input
                                    error={!!formik.errors.start}
                                    leadingIcon={<Icon icon='calendar_today' onClick={() => {
                                        (document.getElementsByName("start")[0] as HTMLInputElement).showPicker();
                                    }} fill size='lg' />}
                                    className={`!max-w-[50%]`}
                                    type='datetime-local'
                                    label={""}
                                    name="start"
                                    onChange={formik.handleChange}
                                    min={today}
                                    defaultValue={formik.values.start && formatDateForDB(formik.values.start)}
                                    helperText={formik.errors.start ?? 'date de début prévue'}
                                />
                                <Input
                                    error={!!formik.errors.end}
                                    leadingIcon={<Icon icon='calendar_today' onClick={() => {
                                        (document.getElementsByName("end")[0] as HTMLInputElement).showPicker();
                                    }} fill size='lg' />}
                                    className={`!max-w-[50%]`}
                                    type="datetime-local"
                                    min={today}
                                    defaultValue={formik.values.end && formatDateForDB(formik.values.end)}
                                    label={""}
                                    name="end"
                                    onChange={formik.handleChange}
                                    helperText={formik.errors.end ?? 'date de fin prévue'}
                                />
                            </div>
                        </CardLarge.MidSection>
                        <CardLarge.Divider />
                        <CardLarge.MidSection className="md:px-8 flex flex-col">
                            <span className="md3-card-subhead">Participants</span>
                            <div className="flex flex-1 flex-col md:flex-row gap-4">
                                <Input
                                    leadingIcon={<Icon icon='person' fill={true} size='lg' />}
                                    error={!!formik.errors.participantsMin}
                                    type='number'
                                    label={""}
                                    name="participantsMin"
                                    onChange={formik.handleChange}
                                    value={formik.values.participantsMin}
                                    helperText={formik.errors.participantsMin ?? 'participants minimum pour valider l\'évenement'}
                                />
                                <div className="flex-col flex w-full gap-3">
                                    <ProgressBar
                                        label={
                                            <div className="justify-between flex-1 w-full px-6 flex flex-row">
                                                <small>
                                                    {formik.values?.Participants?.length ?? 0} participant{formik.values?.Participants?.length > 1 ? 's' : ''}
                                                </small>
                                                <small className="opacity-50"> / &nbsp;
                                                    {formik.values.participantsMin ?? 1} min.
                                                </small>
                                            </div>}
                                        variant={pourcentParticipants >= 100 ? 'linear' : 'wavy'}
                                        color="cyan"
                                        value={pourcentParticipants}
                                        max={formik.values.participantsMin ?? 10}
                                        min={1}
                                        size="xxsmall"
                                    />
                                </div>
                            </div>
                        </CardLarge.MidSection>
                    </CardLarge>
                </section>
            </main>
            {(showCard && !show) &&
                <CTAMines
                    actions={[
                        {

                            type: 'submit',
                            iconImage: formik.isSubmitting ? 'progress_activity' : formik.values.id ? 'check' : 'send',
                            icon: formik.values.id ? 'Modifier' : 'Créer',
                            disabled: false,
                            direct: true,
                            function: () => { }
                        }
                    ]}
                />}
        </form>
    );
}
