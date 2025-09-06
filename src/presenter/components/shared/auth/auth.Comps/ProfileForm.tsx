import { Card, CardHeader, CardBody, Typography, Input, List, } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { assistanceLevel, mailSubscriptions } from "../../../../../domain/entities/Profile";
import { AddressInputOpen } from "../../../common/mapComps/AddressInputOpen";
import { useUserStore } from "../../../../../application/stores/user.store";
import { ImageBtn } from "../../../common/ImageBtn";
import { Icon } from "../../../common/IconComp";
import DI from "../../../../../di/ioc";
import { ListGroup } from "../../myInfos/ListGroup";
import { AvatarUser } from "../../../common/AvatarUser";
import { InputError } from "../../../common/adaptatersComps/input";
import { Select } from "../../../common/adaptatersComps/Select";
import CTAMines from "../../../common/CTA";
import { Skeleton } from "../../../common/Skeleton";

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

    const { groups, error, isLoading } = DI.resolve('groupViewModel')()

    return (
        <form onSubmit={formik.handleSubmit} className='flex h-full flex-col ' >
            <main>
                <div className="FormCardDiv">
                    {error || isLoading ? <Skeleton /> :
                        <Card className="FormDetailGrid !grid-rows-[auto_1fr] ">
                            <CardHeader
                                className="-mt-3 !mx-0 flex flex-col w-full relative items-center justify-center max-h-fit">
                                <div className="relative max-w-fit h-full -mt-4">
                                    <ImageBtn
                                        setImgBlob={setImgBlob}
                                        formik={formik}
                                        className="-ml-5 -bottom-1" />
                                    <AvatarUser
                                        Profile={{
                                            firstName: formik.values?.firstName, image: imgBlob as string,
                                            userId: user?.id || 0
                                        } as any}
                                        avatarSize={'lg'}
                                        avatarStyle="shadow-md !rounded-full !h-[5rem] !w-[5rem]" />
                                </div>
                                <div className="w-full z-0 absolute  px-4 top-6 flex justify-between">
                                    <Typography
                                        className="!text-[0.8rem] !font-light !font-roboto  !whitespace-break-spaces max-w-[30vw] !text-xs !text-left">
                                        {user?.email}
                                    </Typography>
                                    <div className="relative flex flex-col gap-1">
                                        <Link
                                            to="/motdepasse_oublie"
                                            className="!text-[0.8rem] !font-light !font-roboto  !whitespace-break-spaces max-w-[30vw] !text-right hover:underline hover:text-orange-500"
                                        >modifier le mot de passe ?
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                const sendEmail = await deleteAccountUseCase.execute();
                                                if (sendEmail?.message) {
                                                    window.location.href = '/msg?msg=' + sendEmail.message
                                                }
                                            }}
                                            className="!text-[0.8rem] !font-light !font-roboto !whitespace-break-spaces max-w-[30vw] !text-right hover:underline hover:text-red-500"
                                            title="supprimer le compte"
                                        >
                                            supprimer le compte
                                        </button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-6 pb-8 -mt-1 flex flex-1 flex-col h-full gap-3 overflow-auto ">
                                <Input
                                    className={`inputStandart ${formik.errors.firstName ? 'error' : ''}`}
                                    placeholder={"Prénom"}
                                    name="firstName"
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}
                                />
                                <InputError error={formik.errors.firstName} />

                                <Input
                                    className={`inputStandart ${formik.errors.lastName ? 'error' : ''}`}
                                    placeholder={"Nom"}
                                    name="lastName"
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                />
                                <InputError error={formik.errors.lastName} />

                                <Input
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
                                    simple
                                    formik={formik}
                                    value={formik.values.mailSub}
                                    setValue={setMailSub}
                                    name={"mailSub"}
                                    placeholder={'souscription aux mails'}
                                    options={mailSubscriptions}
                                />
                                <Select
                                    simple
                                    formik={formik}
                                    value={formik.values.assistance}
                                    setValue={setAssistance}
                                    name={"level"}
                                    placeholder={'niveau d\'assistance'}
                                    options={assistanceLevel}
                                />


                                {/* GROUP SELECT  */}
                                {!isLoading &&
                                    <ListGroup
                                        error={error}
                                        isLoading={isLoading}
                                        groups={groups} />}


                                {/* SKILLS  */}
                                <Input
                                    className={`inputStandart ${formik.errors.skills ? 'error' : ''}`}
                                    placeholder="Ajouter une compétences"
                                    name="skills"
                                    value={newSkill}
                                    onChange={(e: any) => { e.preventDefault(); setNewSkill(e.target.value) }}
                                    onSubmit={addSkill} >
                                    <Icon
                                        color='slate'
                                        icon='add'
                                        size='lg'
                                        onClick={addSkill}
                                        style={` ${newSkill && 'error bg-red-100 rounded-full'} absolute right-1 top-1`} />
                                </Input>
                                <List className='flex p-0'>
                                    <Typography className='text-xs text-gray-400 -mt-1 font-normal'>
                                        {skillList.length > 0 && 'Liste des compétences'}
                                    </Typography>
                                    {skillList.map((skill: string, index: number) =>
                                        <List.Item
                                            ripple={true}
                                            key={index}
                                            className="!py-1 pl-4 rounded-full text-sm">
                                            {skill}
                                            <List.ItemEnd>
                                                <Icon
                                                    onClick={() => { removeSkill(skill) }}
                                                    icon="close"
                                                    size="xl" />
                                            </List.ItemEnd>
                                        </List.Item>
                                    )}
                                </List>
                            </CardBody>
                        </Card>}
                </div>
            </main>

            <CTAMines
                actions={
                    [{
                        icon: 'Modifier mon profil',
                        direct: true,
                        type: 'submit',
                        iconImage: 'save_as',
                        function: () => { },

                    }]
                } />
        </form >
    )
}
