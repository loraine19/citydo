import { Typography, List, } from "@material-tailwind/react";
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
import { Input } from "../../base/baseComps/Inputs";
import { CardMD } from "../../base/baseComps/Cards";

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
        <form onSubmit={formik.handleSubmit} className="">
            <main>

                <div className={`DetailCardDiv hideCTAForm wRespXL`}>
                    {error || isLoading ? <Skeleton /> :
                        <CardMD className="w-respLarge pb-4 overflow-auto px-8" >
                            <CardMD.Headline className="flex flex-col items-center justify-center w-full ">
                                <div className="relative flex flex-col items-center">
                                    <div className="flex flex-col gap-4 items-center">
                                        <AvatarUser
                                            Profile={{
                                                firstName: formik.values?.firstName,
                                                image: imgBlob as string,
                                                userId: user?.id || 0
                                            } as any}
                                            avatarSize="6xl"
                                            avatarStyle="!shadow-none z-[8] "
                                        />
                                        <ImageBtn
                                            imgDef={formik.values?.image}
                                            imgBlob={imgBlob}
                                            variant="outlined"
                                            color='primary'
                                            setImgBlob={setImgBlob}
                                            formik={formik}
                                            className="-mt-7"
                                        />
                                    </div>
                                    <span >
                                        {formik.values?.firstName} {formik.values?.lastName}
                                    </span>
                                    <span
                                        className="md3-card-supporting-text"
                                    >
                                        {user?.email}
                                    </span>
                                </div>
                                <div className="flex flex-row gap-4 ">
                                    <Link
                                        to="/motdepasse_oublie"
                                        className="text-xs font-medium md3-card-supporting-text  hover:underline  transition opacity-90"
                                    >
                                        Modifier le mot de passe ?
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            const sendEmail = await deleteAccountUseCase.execute();
                                            if (sendEmail?.message) {
                                                window.location.href = '/msg?msg=' + sendEmail.message
                                            }
                                        }}
                                        className="text-xs font-medium md3-error-text hover:underline hover:text-red-700 transition"
                                        title="Supprimer le compte"
                                    >
                                        Supprimer le compte
                                    </button>
                                </div>
                            </CardMD.Headline>
                            <CardMD.MidSection className="flex-col py-4 gap-4 flex overflow-auto ">
                                <Input
                                    className={`inputStandart ${formik.errors.firstName ? 'error' : ''}`}
                                    label={"Prénom"}
                                    name="firstName"
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}
                                />
                                <InputError error={formik.errors.firstName} />

                                <Input
                                    className={`inputStandart ${formik.errors.lastName ? 'error' : ''}`}
                                    label={"Nom"}
                                    name="lastName"
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                />
                                <InputError error={formik.errors.lastName} />

                                <Input
                                    className={`inputStandart ${formik.errors.phone ? 'error' : ''}`}
                                    label={"Télephone"}
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
                                    variant="Input"
                                    formik={formik}
                                    value={formik.values.mailSub}
                                    setValue={setMailSub}
                                    name={"mailSub"}
                                    placeholder={'souscription aux mails'}
                                    options={mailSubscriptions}
                                />
                                <Select
                                    variant="Input"
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
                                <>
                                    <Input
                                        className={`inputStandart ${formik.errors.skills ? 'error' : ''}`}
                                        label="Ajouter une compétences"
                                        name="skills"
                                        value={newSkill}
                                        onChange={(e: any) => { e.preventDefault(); setNewSkill(e.target.value) }}
                                        onSubmit={addSkill}
                                        trailingIcon={
                                            <Icon
                                                color='slate'
                                                icon='add'
                                                size='lg'
                                                onClick={addSkill}
                                                style={` ${newSkill && 'error bg-red-100 rounded-full'} absolute right-1 top-1`}
                                            />
                                        }
                                    />
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
                                </>
                            </CardMD.MidSection>
                        </CardMD>}
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
