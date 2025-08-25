import { Card, CardHeader, Button, CardBody, Typography, Input, Select, Option, List, ListItem, ListItemSuffix } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { assistanceLevel, mailSubscriptions } from "../../../../../domain/entities/Profile";
import { AddressInputOpen } from "../../../common/mapComps/AddressInputOpen";
import { useUserStore } from "../../../../../application/stores/user.store";
import { Label } from "../../../../../domain/entities/frontEntities";
import { ImageBtn } from "../../../common/ImageBtn";
import { Icon } from "../../../common/IconComp";
import DI from "../../../../../di/ioc";
import { ListGroup } from "../../myInfos/ListGroup";
import { AvatarUser } from "../../../common/AvatarUser";
import { InputError } from "../../../common/adaptatersComps/input";

type ProfileFormProps = {
    formik: any,
    setAssistance?: any,
    setAddress?: any,
    setMailSub?: any,
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ formik, setAssistance, setMailSub, setAddress }) => {
    const [imgBlob, setImgBlob] = useState<string | Blob>(formik?.values?.image ?? '');
    const { user } = useUserStore()
    const [newSkill, setNewSkill] = useState<string | undefined>()
    const [skillList, setSkillList] = useState<string[]>(formik.values?.skills?.split(',') || [])
    const deleteAccountUseCase = DI.resolve('deleteAccountUseCase')

    const removeSkill = (skill: string) => {
        formik.values.skills = skillList.filter((sk) => sk !== skill).join(',')
        setSkillList([...skillList.filter((sk) => sk !== skill)])
    }

    const addSkill = () => {
        skillList.push(newSkill as string);
        formik.values.skills = skillList.join(',')
        setSkillList([...skillList])
        setNewSkill('');
    }

    const { groups } = DI.resolve('groupViewModel')()

    return (
        <form onSubmit={formik.handleSubmit} className='flex h-full flex-col gap-2 ' >
            <main className='relative flex flex-1 pt-6 -mt-4'>
                <Card className="w-respLarge h-full ">
                    <CardHeader
                        className="!bg-transparent !rounded-none !pb-2 shadow-none flex justify-center items-end"
                        floated={true}>
                        <ImageBtn
                            setImgBlob={setImgBlob}
                            formik={formik}
                            className="-ml-20 -mb-3 " />
                        <AvatarUser
                            Profile={{
                                firstName: formik.values.firstName, image: imgBlob as string,
                                userId: user?.id || 0
                            } as any}
                            avatarSize={'lg'}
                            avatarStyle="shadow-md !rounded-full !h-[5rem] !w-[5rem]" />

                        <div className="w-full z-0 absolute left-0 top-10 flex justify-between">
                            <Typography
                                className="!font-light !whitespace-break-spaces max-w-[30vw] !text-xs !text-left">
                                {user.email}
                            </Typography>
                            <div className="flex flex-col gap-1">
                                <Link
                                    to="/motdepasse_oublie"
                                    className="!font-light !whitespace-break-spaces max-w-[30vw] !text-[0.7rem] !text-right hover:underline hover:text-cyan-500"
                                >
                                    modifier le mot de passe ?
                                </Link>
                                <button
                                    type="button"
                                    onClick={async () => {
                                        const sendEmail = await deleteAccountUseCase.execute();
                                        if (sendEmail?.message) {
                                            window.location.href = '/msg?msg=' + sendEmail.message
                                        }
                                    }}
                                    className="!font-light !whitespace-break-spaces max-w-[30vw] !text-[0.7rem] !text-right hover:underline hover:text-red-500"
                                    title="supprimer le compte"
                                >
                                    supprimer le compte
                                </button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="flex flex-1 flex-col h-full gap-3 mb-4 overflow-auto ">
                        <Input
                            labelProps={{ className: "before:content-none after:content-none" }}
                            className={`inputStandart ${formik.errors.firstName ? 'error' : ''}`}
                            placeholder={"Prénom"}
                            name="firstName"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                        <InputError error={formik.errors.firstName} />
                        <Input
                            labelProps={{ className: "before:content-none after:content-none" }}
                            className={`inputStandart ${formik.errors.lastName ? 'error' : ''}`}
                            placeholder={"Nom"}
                            name="lastName"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                        <InputError error={formik.errors.lastName} />
                        <Input
                            labelProps={{ className: "before:content-none after:content-none" }}
                            className={`inputStandart ${formik.errors.phone ? 'error' : ''}`}
                            placeholder={"Télephone"}
                            name="phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            type='tel' />
                        <InputError error={formik.errors.phone} />
                        <AddressInputOpen
                            address={formik.values.Address}
                            setAddress={setAddress}
                            error={formik.errors.Address}
                        />

                        <Select
                            labelProps={{ className: "before:content-none after:content-none" }}
                            className={`p-5 capitaliz inputStandart  ${formik.errors.mailSub ? 'error' : ''}`}
                            placeholder={"Notifications mails"}
                            name="mailSub"
                            value={formik.values.mailSub}
                            onChange={(val: any) => {
                                setMailSub(val);
                                formik.values.mailSub = val
                            }}>
                            {mailSubscriptions.map((label: Label, index: number) => {
                                return (
                                    <Option
                                        className="!flex"
                                        value={label.value}
                                        key={index}>
                                        {label.label}
                                    </Option>
                                )
                            })}
                        </Select>
                        <InputError error={formik.errors.mailSub} tips={'souscription aux mails'} />
                        <Select
                            labelProps={{ className: "before:content-none after:content-none" }}
                            className={`p-5 capitaliz inputStandart  ${formik.errors.mailSub ? 'error' : ''}`}
                            placeholder={"Assistance"}
                            name="level"
                            value={formik.values.assistance}
                            onChange={(val: any) => {
                                setAssistance(val);
                                formik.values.assistance = val
                            }}>
                            {assistanceLevel.map((label: Label, index: number) => {
                                return (
                                    <Option
                                        value={label.value}
                                        key={index}>
                                        {label.label}
                                    </Option>
                                )
                            })}
                        </Select>
                        <InputError error={formik.errors.assistance} tips={'niveau d\'assistance'} />
                        <ListGroup groups={groups} />
                        <Input
                            className={`inputStandart ${formik.errors.skills ? 'error' : ''}`}
                            placeholder="Ajouter une compétences"
                            name="skills"
                            value={newSkill}
                            onChange={(e: any) => { e.preventDefault(); setNewSkill(e.target.value) }}
                            onSubmit={addSkill}
                            icon={
                                <div className="-mt-2 -ml-1  opacity-90">
                                    <Icon
                                        color='blue-gray'
                                        icon='add'
                                        size='xl'
                                        onClick={addSkill}
                                        style={` ${newSkill && 'error bg-red-100 rounded-full'}`} />
                                </div>}
                        />
                        <List className='flex p-0'>
                            <Typography className='text-xs text-gray-400 -mt-1 font-normal'>
                                {skillList.length > 0 && 'Liste des compétences'}
                            </Typography>
                            {skillList.map((skill: string, index: number) =>
                                <ListItem
                                    ripple={true}
                                    key={index}
                                    className="!py-1 pl-4 rounded-full text-sm">
                                    {skill}
                                    <ListItemSuffix>
                                        <Icon
                                            onClick={() => { removeSkill(skill) }}
                                            icon="close"
                                            size="xl" />
                                    </ListItemSuffix>
                                </ListItem>
                            )}
                        </List>
                    </CardBody>
                </Card>
            </main>
            <footer className="CTA w-respLarge pb-2">

                <Button
                    type="submit"
                    className="gap-4 rounded-full  lgBtn" >
                    <Icon
                        color="white"
                        icon="save_as"
                        size="lg" />
                    modifier mon profile
                </Button>
            </footer>
        </form >
    )
}
