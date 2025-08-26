import { Card, CardHeader, Typography, Chip, CardBody, Textarea, Popover, PopoverHandler, PopoverContent, Select, Option, Input, CardFooter } from "@material-tailwind/react"
import ServiceIssueCard from "./ServiceIssueCard"
import { useState } from "react"
import { Service } from "../../../../../domain/entities/Service"
import { User } from "../../../../../domain/entities/User"
import { ImageBtn } from "../../../common/ImageBtn"
import { IssueView } from "../../../../views/viewsEntities/issueViewEntity"
import { IssueStep } from "../../../../../domain/entities/Issue"
import { ProfileDiv } from "../../../common/ProfilDiv"
import { GroupLink } from "../../../common/GroupLink"
import { InputError } from "../../../common/adaptatersComps/input"

type IssueFormProps = { issue: IssueView, service?: Service, formik?: any, modos: User[] }
export const IssueForm: React.FC<IssueFormProps> = ({ issue, formik, service, modos }) => {
    const Service = service ? service : issue.Service
    const [imgBlob, setImgBlob] = useState<string>(formik?.values.image ?? issue.image)
    const start = new Date(Service?.createdAt).toLocaleDateString('fr-FR')

    return (
        <>
            <section className={`flex flex-1 pt-2`}>
                <Card className=" w-respLarge FixCard z-50 ">
                    <CardHeader className={"FixCardHeaderNoImage px-4 min-h-max pt-3 gap-3 justify-between lg:items-center shadow-none flex !mt-0 flex-col lg:flex-row"}
                        floated={false}>
                        <div className="flex flex-col ">
                            <Typography
                                className="truncate"
                                variant="h6"
                                color="blue-gray" >
                                {`${issue?.User?.Profile?.firstName ?? 'Vous'} ${issue?.UserModo ? "à demander de l'aide" : "demandez de l'aide"}`}
                            </Typography>
                            <GroupLink group={issue?.Service?.Group} />
                        </div>
                        <div className="flex gap-2 items-center">
                            <Chip className={`${issue?.statusS === IssueStep.STEP_3 && 'GreenChip' || issue?.statusS === IssueStep.STEP_4 && 'GrayChip' || 'OrangeChip'} lowercase`}
                                value={issue?.statusS ?? 'nouveau'}>
                            </Chip>
                            {issue?.date ?
                                <Chip
                                    size='sm'
                                    value={'' + (new Date(formik?.values?.createdAt ? formik?.values.createdAt : issue.createdAt)).toLocaleDateString('fr-FR')}
                                    className={`!flex lowercase GrayChip shadow font-medium before:content-['']`}>
                                </Chip>
                                :
                                <div className='flex flex-col flex-1 !max-w-max overflow-auto pt-1'>
                                    <Input
                                        type="datetime-local"
                                        min={start}
                                        className="flex justify-end px-4 pb-4 RedChip"
                                        placeholder={"date du probléme"}
                                        labelProps={{ className: `${formik?.errors.date && 'error'}  "mr-3 pr-4 pt-0 flex justify-end !text-gray-800 h-max peer-focus:after:content-none` }}
                                        name="date"
                                        onChange={formik?.handleChange}
                                        value={formik?.values?.date ? formik?.values.date : start}
                                        error={Boolean(formik?.errors?.date)}
                                        containerProps={{ className: "!max-h-max h-8 !min-w-max opacity-80" }}
                                    />
                                    <InputError error={formik?.errors?.date} />
                                </div>}
                        </div>
                    </CardHeader>
                    <CardBody className={`flex-col flex  relative !w-full gap-2 `}  >
                        <div className={` lg:items-center flex h-full w-full gap-4 `}>
                            <div className={`flex flex-1 h-full `}>
                                <Textarea
                                    className={`inputStandart overflow-auto py-1 !rounded ${formik?.errors?.description ? 'error' : ''}`}
                                    containerProps={{ className: `${formik ? ' ' : 'px-3 border bg-blue-gray-50 rounded-2xl '}` }}
                                    labelProps={{ className: "before:content-none after:content-none" }}
                                    placeholder="description"
                                    onChange={formik?.handleChange}
                                    defaultValue={formik?.value?.description ?? issue.description}
                                    disabled={formik ? false : true}
                                />
                                <InputError error={formik?.errors?.description} />
                            </div>
                            <div className={imgBlob ? 'flex-1 flex ' : ``}>
                                <div className={imgBlob ? ' flex w-full' : `hidden`}>
                                    <Popover>
                                        <PopoverHandler>
                                            <img
                                                onError={(e) => e.currentTarget.src = '/image/placeholder.jpg'}
                                                src={imgBlob ?? issue.image ?? '/image/placeholder.jpg'}
                                                alt='image'
                                                title='cliquez pour agrandir'
                                                className="lg:max-h-[calc(25vh-1.5rem)] max-h-[calc(30vh-1.4rem)] w-full  !shadow-sm rounded-2xl object-cover"
                                            />
                                        </PopoverHandler>
                                        <PopoverContent
                                            className="!bg-transparent !border-none flex justify-center items-center z-50 ">
                                            <div className="fixed top-[16rem] left-1/2 transform -translate-x-1/2 max-h-[calc(100vh-19rem)] max-w-[calc(100vw-2rem)] flex justify-center items-center ">
                                                <img
                                                    onError={(e) => e.currentTarget.src = '/image/placeholder.jpg'}
                                                    title='cliquez pour fermer'
                                                    src={imgBlob}
                                                    alt='image'
                                                    className="h-full w-full rounded-2xl object-cover shadow-2xl "
                                                />
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className={formik ? 'flex absolute bottom-14 right-14' : `hidden`}>
                                    <ImageBtn
                                        setImgBlob={setImgBlob}
                                        formik={formik}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className=" !overflow-auto flex-[100%] !flex flex-col gap-3 -mt-6 lg:!pb-5">
                        <Typography variant="h6" color="blue-gray" className="-mt-2 leading-4">Concilateurs :</Typography>
                        <div className='flex gap-4 md:!flex-row flex-col max-w-[100%] min-h-max '>
                            <Select
                                key='userIdModo'
                                className="rounded-full flex  !shadow !py-1 bg-white border-none capitalize overflow-auto"
                                label={`Choisir un modérateur de ${Service?.User?.Profile.firstName}`}
                                name={"userIdModo"}
                                labelProps={{ className: `before:border-none after:border-none ` }}
                                menuProps={{ className: 'overflow-auto max-h-44' }}
                                disabled={!formik || !issue.mine || issue.UserModo ? true : false}
                                value={issue?.userIdModoOn?.toString() || '0'}
                                onChange={(e: string | undefined) => { formik.values.userIdModo = parseInt(e || '1') }}
                                containerProps={{ className: "h-[2rem] !py-0 !flex justify-center" }}
                            >
                                {!issue?.UserModo && formik ?
                                    modos.map((modo: User) =>
                                        <Option
                                            key={modo.id}
                                            className={` rounded-full   `}
                                            value={issue?.userIdModo?.toString() || '0'} >
                                            <ProfileDiv
                                                size="xs"
                                                profile={modo} />
                                        </Option>) :
                                    <Option
                                        key={'modoId'}
                                        className={` rounded-full   `}
                                        value={issue?.userIdModoOn?.toString() || '0'} >
                                        <ProfileDiv
                                            size="xs"
                                            profile={issue?.UserModo} />
                                    </Option>}
                            </Select>
                            <Select
                                className="rounded-full shadow !py-1 !flex !justify-center bg-white border-none capitalize "
                                label={`Modérateur de ${Service.UserResp?.Profile?.firstName}`}
                                name={"userIdModoOn"}
                                labelProps={{ className: `before:border-none after:border-none ` }}
                                menuProps={{ className: 'overflow-auto max-h-44' }}
                                disabled={!formik || !issue.mine || issue.UserModoOn ? true : false}
                                value={issue?.userIdModoOn?.toString() || '0'}
                                onChange={(e: string | undefined) => { formik.values.userIdModoOn = e }}
                                containerProps={{ className: "h-[2rem] !py-0 !flex justify-center" }}
                            >
                                {!issue.UserModoOn ?
                                    modos.map((modo: User) =>
                                        <Option
                                            key={modo.id}
                                            className={` rounded-full   `}
                                            value={modo.id && modo?.id?.toString() || '0'} >
                                            <ProfileDiv
                                                size="xs"
                                                profile={modo} />
                                        </Option >) :
                                    <Option
                                        key={'modo.id'}
                                        className={`rounded-full   `}
                                        value={issue?.userIdModoOn?.toString() || '0'} >
                                        <ProfileDiv
                                            size="xs"
                                            profile={issue?.UserModoOn?.Profile} />
                                    </Option>
                                }
                            </Select>
                        </div>
                        <ServiceIssueCard service={Service} />
                    </CardFooter>
                </Card>
            </section >
        </>)
}