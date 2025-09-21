import { useState, useEffect } from "react";
import AddressMapOpen from "../../../common/mapComps/AddressMapOpen";
import { AddressInputOpen } from "../../../common/mapComps/AddressInputOpen";
import SubHeader from "../../../common/SubHeader";
import { ImageBtn } from "../../../common/ImageBtn";
import { dayMS, formatDateForDB, getLabel } from "../../../../views/viewsEntities/utilsService";
import { eventCategories, EventImage } from "../../../../constants";
import { AddressDTO } from "../../../../../infrastructure/DTOs/AddressDTO";
import { DateChip } from "../../../common/ChipDate";
import GroupSelect from "../../../common/GroupSelect";
import { useUserStore } from "../../../../../application/stores/user.store";
import { Select } from "../../../common/adaptatersComps/Select";
import CTAMines from "../../../common/CTA";
import { CardLarge } from "../../base/baseComps/Cards";
import { Input } from "../../base/baseComps/Inputs";
import { ProgressBar } from "../../base/baseComps/Sliders";

interface EventFormProps {
    formik: any;
    Address: AddressDTO;
    setAddress: any
}

export function EventForm({ formik, Address, setAddress }: EventFormProps) {
    const pourcentParticipants = Math.floor((formik.values.Participants?.length) / formik.values.participantsMin * 100) || 0;
    const today = new Date(new Date().getTime() + (1 * dayMS)).toISOString().slice(0, 16).replace('Z', '');
    const [groupId, setGroupId] = useState<number | String | undefined>(formik.values.Group?.id);
    const user = useUserStore((state) => state.user);

    const imgCategory = EventImage[formik.values.category as keyof typeof EventImage] || EventImage.default
    const [imgBlob, setImgBlob] = useState<string>(formik.values.image ?? formik.values.blob ?? imgCategory);

    useEffect(() => {
        setAddress(Address)
        if (Address) {
            formik.values.Address = Address
        }
    }, [Address]);

    useEffect(() => {
        !formik.values.image && setImgBlob(EventImage[formik.values.category as keyof typeof EventImage || EventImage.default])
    }, [formik.values.category]);

    const { title, category, description, start, end, participantsMin, id } = formik.values;
    const label = category ? getLabel(category, eventCategories) : '';
    const [expand, setExpand] = useState<boolean>(false);

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full overflow-hidden">
            <main >
                <div className="sectionHeader gap-2">
                    <div className="flex flex-col lg:flex-row lg:gap-4 pb-2 pt-2 gap-2">
                        <Select
                            options={eventCategories}
                            formik={formik}
                            name="category"
                            placeholder="Choisir la catégorie"
                        />
                        <GroupSelect
                            groupId={groupId?.toString()}
                            setGroupId={setGroupId}
                            formik={formik}
                            user={user} />
                    </div>
                    <SubHeader
                        form
                        type={id ? 'Modifier mon évenement ' : 'Créer mon évenement '}
                        place={category ? label : ''}
                        closeBtn />
                </div>
                <section >
                    <div id="refDiv"
                        className={`DetailCardDiv hideCTAForm`}>
                        <CardLarge
                            form
                            expanded={expand}
                            setExpanded={setExpand}
                            image={
                                <CardLarge.Image
                                    src={imgBlob ?? formik.values.image ?? formik.values.blob ?? imgCategory}
                                    alt={title || 'image'}
                                />
                            }
                        >
                            <CardLarge.Chips className="justify-between px-2 pt-1">
                                <ImageBtn
                                    className="!relative mb-0 ml-2"
                                    formik={formik}
                                    setImgBlob={setImgBlob}
                                    imgDef={imgCategory}
                                />
                                <DateChip
                                    prefix=" "
                                    start={formik.values.createdAt ?? new Date()}
                                />
                            </CardLarge.Chips>
                            <CardLarge.Headline>
                                <Input
                                    className={`inputStandart ${formik.errors.title ? 'error' : ''}`}
                                    label={"Titre"}
                                    name="title"
                                    onChange={formik.handleChange}
                                    value={title}
                                    error={!!formik.errors.title}
                                    helperText={formik.errors.title ?? ''}
                                />
                            </CardLarge.Headline>
                            <CardLarge.SupportingText>
                                <Input
                                    multiline
                                    rows={1}
                                    error={!!formik.errors.description}
                                    className={`inputStandart`}
                                    label='Description'
                                    name="description"
                                    helperText={formik.errors.description ?? ''}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                        formik.handleChange(e);
                                        const textarea = e.target as HTMLTextAreaElement;
                                        textarea.style.height = '2.5rem';
                                        textarea.style.height = textarea.scrollHeight + 'px';
                                        if (e.target.value === '') {
                                            textarea.style.height = '2.5rem';
                                        }
                                    }}
                                    value={description}
                                />
                            </CardLarge.SupportingText>

                            <CardLarge.Media className="flex flex-col gap-8">
                                {((Address?.lat && Address?.lng)) ?
                                    <div className="flex-1 !max-h-[7rem]">
                                        <AddressMapOpen address={Address} />
                                    </div> : ''}
                                <AddressInputOpen
                                    address={Address}
                                    setAddress={setAddress}
                                    error={formik.errors.Address} />

                            </CardLarge.Media>
                            <CardLarge.Media>
                                <div className="flex-1 flex flex-col gap-2">
                                    <Input
                                        className={`inputStandart ${formik.errors.start ? 'error' : ''}`}
                                        type='datetime-local'
                                        label={""}
                                        name="start"
                                        onChange={formik.handleChange}
                                        min={today}
                                        defaultValue={start && formatDateForDB(start)}
                                        helperText={formik.errors.start ?? 'date de début prévue'}
                                    />
                                    <Input
                                        className={`inputStandart  ${formik.errors.end ? 'error' : ''}`}
                                        type="datetime-local"
                                        min={today}
                                        defaultValue={end && formatDateForDB(end)}
                                        label={""}
                                        name="end"
                                        onChange={formik.handleChange}
                                        helperText={formik.errors.end ?? 'date de fin prévue'}
                                    />
                                </div>

                                <div className='flex w-full gap-4 gap-y-6 flex-col md:flex-row justify-between'>
                                    <div className='flex flex-col flex-1 min-w-fit '>
                                        <Input
                                            className={`inputStandart ${formik.errors.participantsMin ? 'error' : ''}`}
                                            type='number'
                                            label={""}
                                            name="participantsMin"
                                            onChange={formik.handleChange}
                                            value={participantsMin}
                                            helperText={formik.errors.participantsMin ?? 'participants minimum pour valider l\'évenement'}
                                        />
                                    </div>
                                    <div className={"px-2 gap-4 pt-2 h-max justify-center flex flex-col max-w-[48%] w-full"}>

                                        {<ProgressBar
                                            label={
                                                <div className="justify-between flex-1 w-full px-6 flex flex-row">
                                                    <small>
                                                        {formik.values?.Participants?.length ?? 0} participant{formik.values?.Participants?.length > 1 ? 's' : ''}
                                                    </small>
                                                    <small className="opacity-50"> / &nbsp;
                                                        {participantsMin ?? 1} min.
                                                    </small>
                                                </div>}
                                            variant={pourcentParticipants >= 100 ? 'linear' : 'wavy'}
                                            color="cyan"
                                            value={pourcentParticipants}
                                            max={participantsMin ?? 10}
                                            min={1}
                                            size="xxsmall">
                                        </ProgressBar>}
                                    </div>
                                </div>
                            </CardLarge.Media>
                        </CardLarge>
                    </div>
                </section>
            </main>
            <CTAMines
                actions={[{
                    type: 'submit',
                    iconImage: id ? 'save_as' : 'save',
                    icon: id ? 'Modifier' : 'Créer',
                    disabled: false,
                    direct: true,
                    function: () => { }
                }]}
            />
        </form>
    );
}
