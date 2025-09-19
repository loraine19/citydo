import { Card, CardHeader, Typography, CardBody, Textarea, Select, Input, CardFooter } from "@material-tailwind/react"
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
import Chip from "../../../common/adaptatersComps/Chip"
import PopOver from "../../../common/oldcomp/PopOver"

type IssueFormProps = { issue: IssueView, service?: Service, formik?: any, modos: User[] }
export const IssueForm: React.FC<IssueFormProps> = ({ issue, formik, service, modos }) => {
    const Service = service ? service : issue.Service
    const [imgBlob, setImgBlob] = useState<string>(formik?.values.image ?? issue.image)
    const start = new Date(Service?.createdAt).toLocaleDateString('fr-FR')

    return (
        <>
            <section className={`flex `}>
                <Card className={`${issue.image ? " FixCard !grid-rows-[auto_35%_1fr]" : "FixCardNoImage !grid-rows-[auto_30%_1fr]"} w-respLarge `}>
                    <CardHeader className={"FixCardHeaderNoImage px-4 min-h-max pt-3 gap-3 justify-between lg:items-center shadow-none flex !mt-0 flex-col lg:flex-row"}>
                        <div className="flex flex-col ">
                            <Typography
                                className="truncate"
                                as="h6" >
                                {`${issue?.User?.Profile?.firstName ?? 'Vous'} ${issue?.UserModo ? "à demander de l'aide" : "demandez de l'aide"}`}
                            </Typography>
                            <GroupLink group={issue?.Service?.Group} />
                        </div>
                        <div className="flex gap-2 items-center">
                            <Chip
                                color={`${issue?.statusS === IssueStep.STEP_3 && 'green' || issue?.statusS === IssueStep.STEP_4 && 'slate' || 'orange'}`}
                                value={issue?.statusS ?? 'nouveau'}>
                            </Chip>
                            {issue?.date ?
                                <Chip
                                    value={'' + (new Date(formik?.values?.createdAt ? formik?.values.createdAt : issue.createdAt)).toLocaleDateString('fr-FR')}
                                >
                                </Chip>
                                :
                                <div className='flex flex-col flex-1 !max-w-max overflow-auto pt-1'>
                                    <Input
                                        type="datetime-local"
                                        min={start}
                                        className="flex justify-end px-4 pb-4 redChip"
                                        placeholder={"date du probléme"}
                                        name="date"
                                        onChange={formik?.handleChange}
                                        value={formik?.values?.date ? formik?.values.date : start}
                                        isError={Boolean(formik?.errors?.date)}
                                    />
                                    <InputError error={formik?.errors?.date} />
                                </div>}
                        </div>
                    </CardHeader>
                    <CardBody className={`flex-col  !pb-0 flex h-full relative !w-full gap-2 `}  >
                        <div className={`lg:items-center flex h-full w-full gap-4`}>
                            <div className={`flex min-w-[50%] h-full`}>
                                <Textarea
                                    className={`inputStandart overflow-auto py-1 !rounded ${formik?.errors?.description ? 'error' : ''}`}
                                    placeholder="description"
                                    onChange={formik?.handleChange}
                                    defaultValue={formik?.value?.description ?? issue.description}
                                    disabled={formik ? false : true}
                                />
                                <InputError error={formik?.errors?.description} />
                            </div>
                            <div className={imgBlob ? 'flex h-[calc(100%_+_1rem)] -mt-2 p-1 relative items-center justify-center' : ``}>
                                <div className={imgBlob ? 'flex flex-col h-full overflow-hidden rounded-3xl justify-center' : `hidden`}>
                                    <PopOver
                                        trigger={<div className="flex rounded-3xl flex-1  overflow-hidden items-center justify-center">
                                            <img
                                                onError={(e) => e.currentTarget.src = '/image/placeholder.jpg'}
                                                src={imgBlob ?? issue.image ?? '/image/placeholder.jpg'}
                                                alt='image'
                                                title='cliquez pour agrandir'
                                                className="max-h-[300px] max-w-full object-contain rounded-3xl shadow-sm"
                                                style={{ flex: 1, maxHeight: '300px' }}
                                            />
                                        </div>}
                                        children={
                                            <div className="flex max-h-[100%] w-full">
                                                <img
                                                    onError={(e) => e.currentTarget.src = '/image/placeholder.jpg'}
                                                    title='cliquez pour fermer'
                                                    src={imgBlob}
                                                    alt='image'
                                                    className="rounded-3xl object-cover shadow-2xl max-h-[80vh] max-w-full"
                                                />
                                            </div>}
                                    />
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
                    <CardFooter className="!overflow-auto flex-[100%] !flex flex-col gap-3 lg:!pb-5">
                        <div>
                            <h6> Concilateurs : </h6>
                            <div className='flex gap-4 md:!flex-row flex-col max-w-full'>
                                <Select name={"userIdModo"}
                                    key='userIdModo'
                                    value={issue?.userIdModoOn?.toString() || '0'}
                                    onChange={(event: React.ChangeEvent<HTMLButtonElement>) => {
                                        const value = event.target.value;
                                        formik.values.userIdModo = parseInt(value || '1');
                                    }}
                                    disabled={!formik || !issue.mine || issue.UserModo ? true : false}>
                                    <Select.Trigger className="inputDiv" >
                                        {() => issue?.UserModo ?
                                            (<ProfileDiv
                                                size="xs"
                                                profile={issue?.UserModo} />) :
                                            (<p>{`Modérateur de ${Service.User?.Profile?.firstName}`}</p>)
                                        }
                                    </Select.Trigger>
                                    <Select.List>
                                        {
                                            modos?.map((modo: User) =>
                                                <Select.Option
                                                    key={modo.id}
                                                    className={` rounded-full hover:!bg-slate-200  `}
                                                    value={issue?.userIdModo?.toString() || '0'} >
                                                    <ProfileDiv
                                                        size="xs"
                                                        profile={modo} />
                                                </Select.Option>)}
                                    </Select.List>
                                </Select>

                                <Select
                                    name={"userIdModoOn"}
                                    disabled={!formik || !issue.mine || issue.UserModoOn ? true : false}
                                    value={issue?.userIdModoOn?.toString() || '0'}
                                    onChange={(event: React.FormEvent<HTMLButtonElement>) => {
                                        const value = (event.target as HTMLButtonElement).value;
                                        formik.values.userIdModoOn = value;
                                    }}>
                                    {() =>
                                        issue?.UserModoOn ? (
                                            <ProfileDiv
                                                size="xs"
                                                profile={issue?.UserModoOn}
                                            />
                                        ) : null
                                    }
                                    <Select.Trigger className="inputDiv" >
                                        {() => issue?.UserModoOn ?
                                            (<ProfileDiv
                                                size="xs"
                                                profile={issue?.UserModoOn} />) :
                                            (<p>{`Modérateur de ${Service.UserResp?.Profile?.firstName}`}</p>)
                                        }
                                    </Select.Trigger>
                                    <Select.List>
                                        {
                                            modos?.map((modo: User) =>
                                                <Select.Option
                                                    key={modo.id}
                                                    className={` rounded-full hover:!bg-slate-200  `}
                                                    value={modo.id && modo?.id?.toString() || '0'} >
                                                    <ProfileDiv
                                                        size="xs"
                                                        profile={modo} />
                                                </Select.Option >)}
                                    </Select.List>
                                </Select>
                            </div>
                        </div>
                        <ServiceIssueCard service={Service} />
                    </CardFooter>
                </Card>
            </section >
        </>)
}