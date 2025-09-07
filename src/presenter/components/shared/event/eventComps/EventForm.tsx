import { useState, useEffect } from "react";
import { Card, CardHeader, Typography, CardBody, Input, Textarea, Progress } from "@material-tailwind/react";
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
import { InputError } from "../../../common/adaptatersComps/input";
import { Select } from "../../../common/adaptatersComps/Select";
import CTAMines from "../../../common/CTA";

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

    ///// BLOB FUNCTION ;
    const imgCategory = EventImage[formik.values.category as keyof typeof EventImage] || EventImage.default
    const [imgBlob, setImgBlob] = useState<string>(formik.values.image ?? formik.values.blob ?? imgCategory);

    //// ADDRESS GPS FUNCTION
    useEffect(() => {
        setAddress(Address)
        if (Address) {
            formik.values.Address = Address
        }
    }, [Address]);

    useEffect(() => {
        !formik.values.image && setImgBlob(EventImage[formik.values.category as keyof typeof EventImage || EventImage.default])
    }, [formik.values.category]);



    const { title, category, description, start, end, participantsMin, Participants, id } = formik.values;
    const label = category ? getLabel(category, eventCategories) : '';

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col h-full overflow-hidden">
            <main>
                <div className="sectionHeader gap-2">
                    <SubHeader
                        form
                        type={id ? 'Modifier mon évenement ' : 'Créer mon évenement '}
                        place={category ? label : ''} closeBtn />
                    <div className="w-respLarge h-full flex flex-col lg:flex-row lg:gap-4 gap-2 pt-2 pb-2">

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
                </div>
                <section>
                    <div className={`FormCardDiv`}>
                        <Card className={` FormDetailGrid !-mb-2 !pb-2 `}>
                            <CardHeader className={"FixCardHeader"} >
                                <ImageBtn
                                    className="!absolute z-40 !h-max bottom-0 !left-3 mb-1"
                                    formik={formik}
                                    setImgBlob={setImgBlob}
                                    imgDef={imgCategory} />
                                <img
                                    onError={(e) => e.currentTarget.src = '/image/placeholder.jpg'}
                                    src={imgBlob ?? formik.values.image ?? formik.values.blob ?? imgCategory}
                                    alt={title || 'image'}
                                    width={100}
                                    height={100}
                                    className={'CardImage'} />
                                <div className={`${start ? 'ChipDiv !justify-end' : 'hidden'}`}>
                                    <DateChip
                                        start={start}
                                        end={start}
                                        prefix={start ? 'Début' : ''} />
                                </div>
                            </CardHeader>
                            <CardBody className='DetailCardBody'>
                                <div className='gap-y-3 md:gap-y-6 h-full flex-1 pb-8 !flex flex-col '>

                                    <div className='flex flex-col lg:flex-row gap-3 md:gap-4 h-full'>
                                        <div className="flex flex-1 flex-col h-full ">
                                            <div>
                                                <Input
                                                    className={`inputStandart ${formik.errors.title ? 'error' : ''}`}
                                                    placeholder={"Titre"}
                                                    name="title"
                                                    onChange={formik.handleChange}
                                                    defaultValue={title} />
                                                <InputError mt error={formik.errors.title} />
                                            </div>
                                            <div className='flex flex-col flex-1'>
                                                <Textarea
                                                    rows={1}
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
                                                    defaultValue={description}
                                                />
                                                <InputError mt error={formik.errors.description} />
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col pt-4 md:pt-0 ">
                                            {((Address?.lat && Address?.lng)) ?
                                                <AddressMapOpen address={Address} /> : ''}

                                            <div className='relative z-50'>
                                                <AddressInputOpen
                                                    address={Address}
                                                    setAddress={setAddress}
                                                    error={formik.errors.Address} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-between gap-2 py-2'>
                                        <div className='flex flex-col flex-1 min-w-max '>
                                            <input
                                                className={`inputStandart ${formik.errors.start ? 'error' : ''}`}
                                                type='datetime-local'
                                                placeholder={"date de debut"}
                                                name="start"
                                                onChange={formik.handleChange}
                                                min={today}
                                                defaultValue={start && formatDateForDB(start)} />
                                            <InputError error={formik.errors.start} tips={'Date de début'} mt />
                                        </div>
                                        <div className='flex flex-col flex-1 '>
                                            <input
                                                className={`inputStandart  ${formik.errors.end ? 'error' : ''}`}
                                                type="datetime-local"
                                                min={today}
                                                defaultValue={end && formatDateForDB(end)}
                                                placeholder={"date de fin"}
                                                name="end"
                                                onChange={formik.handleChange} />
                                            <InputError mt error={formik.errors.end} tips={'Date de fin'} />
                                        </div>
                                    </div>
                                    <div className='flex w-full gap-4 gap-y-6 flex-col md:flex-row justify-between'>
                                        <div className='flex flex-col flex-1 min-w-fit '>
                                            <input
                                                className={`inputStandart ${formik.errors.participantsMin ? 'error' : ''}`}
                                                type='number'
                                                placeholder={""}
                                                name="participantsMin"
                                                onChange={formik.handleChange}
                                                defaultValue={participantsMin} />
                                            <InputError mt error={formik.errors.participantsMin} tips={'Participants minimum'} />
                                        </div>
                                        <div className={"flex items-center max-w-[48%] pt-2  gap-1 flex-col justify-center w-full"}>
                                            <div className="mb-2 flex w-full items-center justify-between gap-4">
                                                <InputError
                                                    tips={
                                                        pourcentParticipants > 0 && `Inscrits` ||
                                                        pourcentParticipants >= 100 && `validé` || `aucun inscrit`
                                                    }
                                                />
                                                <Typography
                                                    variant="small"
                                                    className={pourcentParticipants <= 0 || pourcentParticipants >= 100 ? 'hidden' : ''}>
                                                    {Participants?.length}  /  {participantsMin}
                                                </Typography>
                                            </div>
                                            <Progress
                                                value={pourcentParticipants}
                                                size="md">
                                                <Progress.Bar className={`bg-${pourcentParticipants === 100 ? "green" : "cyan"}-500`} />
                                            </Progress>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
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
                    function: () => { console.log('CTA clicked') }
                }]}
            />
        </form>
    );
}
