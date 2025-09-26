import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "../../../../../application/stores/user.store";
import { assistanceLevel, mailSubscriptions } from "../../../../../domain/entities/Profile";
import { AddressInputOpen } from "../../../common/mapComps/AddressInputOpen";
import { ImageBtn } from "../../../common/ImageBtn";
import { Icon } from "../../../common/IconComp";
import DI from "../../../../../di/ioc";
import { ListGroup } from "../../myInfos/ListGroup";
import { AvatarUser } from "../../../common/AvatarUser";
import { Select } from "../../../common/adaptatersComps/Select";
import CTAMines from "../../../common/CTA";
import { Skeleton } from "../../../common/Skeleton";
import { Input } from "../../base/baseComps/Inputs";
import { CardLarge } from "../../base/baseComps/Cards";
import { Typography, List } from "@material-tailwind/react";
import { Button } from "../../base/baseComps/Buttons";

type ProfileFormProps = {
    formik: any,
    setAssistance?: any,
    setAddress?: any,
    setMailSub?: any,
}

export function ProfileForm({ formik, setAssistance, setMailSub, setAddress }: ProfileFormProps) {
    const user = useUserStore((state) => state.user);
    const [imgBlob, setImgBlob] = useState<string | Blob>(formik?.values?.image ?? '');
    const [newSkill, setNewSkill] = useState<string | undefined>();
    const [skillList, setSkillList] = useState<string[]>(formik.values?.skills?.split(',') || []);
    const deleteAccountUseCase = DI.resolve('deleteAccountUseCase');
    const { groups, error, isLoading } = DI.resolve('groupViewModel')();

    // Avatar image update effect
    useEffect(() => {
        if (!formik.values?.image || formik.values?.image === '') {
            setImgBlob('');
        }
    }, [formik.values?.image]);

    // Skill handlers
    const removeSkill = (skill: string) => {
        const updated = skillList.filter((sk) => sk !== skill);
        formik.values.skills = updated.join(',');
        setSkillList(updated);
    };

    const addSkill = () => {
        if (newSkill && newSkill.trim() !== '') {
            const updated = [...skillList, newSkill.trim()];
            formik.values.skills = updated.join(',');
            setSkillList(updated);
            setNewSkill('');
        }
    };

    // Memoized header section (optional, for consistency)
    const HeaderSection = useMemo(() => (
        <div className="flex flex-col items-center gap-2 py-4">
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
            <span>{formik.values?.firstName} {formik.values?.lastName}</span>
            <span className="md3-card-supporting-text">{user?.email}</span>
            <div className="flex flex-row gap-4">
                <Button
                    type="button"
                    variant="text"
                    color="cyan"
                    className="text-xs font-medium md3-card-supporting-text hover:underline transition opacity-90"
                    onClick={() => window.location.href = "/motdepasse_oublie"}
                >
                    Modifier le mot de passe ?
                </Button>
                <Button
                    type="button"
                    variant="text"
                    color="error"
                    className="text-xs font-medium md3-error-text hover:underline hover:text-red-700 transition"
                    title="Supprimer le compte"
                    onClick={async () => {
                        const sendEmail = await deleteAccountUseCase.execute();
                        if (sendEmail?.message) {
                            window.location.href = '/msg?msg=' + sendEmail.message;
                        }
                    }}
                >
                    Supprimer le compte
                </Button>
            </div>
        </div>
    ), [formik.values, imgBlob, user]);

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full pb-2 overflow-hidden">
            <main className="wRespXLMargin ">
                <div className="w-respXL pt-4 pb-4 flex flex-col gap-2 px-[0.8rem] md:px-[3rem] ">
                    <div className="flex items-center gap-4">
                        <AvatarUser
                            Profile={{
                                firstName: formik.values?.firstName,
                                image: imgBlob as string,
                                userId: user?.id || 0
                            } as any}
                            avatarSize="6xl"
                            avatarStyle="scale-[1.1] hover:!scale-[1.1] md3-elevation-2 md3-border "
                        />
                        <div className=" flex-1  flex flex-col ">

                            <span>
                                Bienvenue&nbsp;
                                {user?.Profile?.firstName ?? ""}   !
                            </span>
                            <span className="text-sm font-normal opacity-80">
                                vous avez  {user?.Profile?.points ?? 0} points
                            </span>
                        </div>
                    </div>


                </div>
                <section className="DetailCardDiv hideCTAform ">
                    {error || isLoading ? <Skeleton /> :
                        <CardLarge
                            className="mb-4"
                            form
                            expanded={true}
                            setExpanded={() => { }}
                            image={
                                <div className="flex flex-col items-center">
                                    {HeaderSection}
                                </div>
                            }

                        >
                            <CardLarge.Header className="flex justify-start items-start flex-col pt-0 gap-2">
                                <ImageBtn
                                    size={"small"}
                                    imgDef={formik.values?.image}
                                    imgBlob={imgBlob}
                                    variant="tonal"
                                    color='slate'
                                    setImgBlob={setImgBlob}
                                    formik={formik}
                                    className=" "
                                />
                                <Button
                                    type="button"
                                    variant="tonal"
                                    size="small"
                                    color="cyan"
                                    className=""
                                    onClick={() => window.location.href = "/motdepasse_oublie"}
                                >
                                    Modifier le mot de passe ?
                                </Button>
                                <Button
                                    type="button"
                                    variant="tonal"
                                    size="small"
                                    color="error"
                                    className=""
                                    title="Supprimer le compte"
                                    onClick={async () => {
                                        const sendEmail = await deleteAccountUseCase.execute();
                                        if (sendEmail?.message) {
                                            window.location.href = '/msg?msg=' + sendEmail.message;
                                        }
                                    }}
                                >
                                    Supprimer le compte
                                </Button>
                            </CardLarge.Header>
                            <CardLarge.Divider />

                            <CardLarge.MidSection className="flex-col py-4 gap-4 flex ">
                                <Input
                                    error={formik.errors?.firstName}
                                    label={"Prénom"}
                                    name="firstName"
                                    onChange={formik.handleChange}
                                    value={formik.values?.firstName}
                                />

                                <Input
                                    error={formik.errors?.lastName}
                                    label={"Nom"}
                                    name="lastName"
                                    onChange={formik.handleChange}
                                    value={formik.values?.lastName}
                                />

                                <Input
                                    error={formik.errors?.phone}
                                    label={"Télephone"}
                                    name="phone"
                                    onChange={formik.handleChange}
                                    value={formik.values?.phone}
                                    type='tel'
                                />

                                <AddressInputOpen
                                    address={formik.values?.Address}
                                    setAddress={setAddress}
                                    error={formik.errors?.Address}
                                />

                            </CardLarge.MidSection>
                            <CardLarge.Divider />
                            <CardLarge.MidSection className="flex-col py-4 gap-4 flex ">
                                <Select
                                    variant="Input"
                                    formik={formik}
                                    value={formik.values?.mailSub}
                                    setValue={setMailSub}
                                    name={"mailSub"}
                                    placeholder={'souscription aux mails'}
                                    options={mailSubscriptions}
                                />
                                <Select
                                    variant="Input"
                                    formik={formik}
                                    value={formik.values?.assistance}
                                    setValue={setAssistance}
                                    name={"level"}
                                    placeholder={'niveau d\'assistance'}
                                    options={assistanceLevel}
                                />

                                {/* GROUP SELECT */}
                                {!isLoading &&
                                    <ListGroup
                                        error={error}
                                        isLoading={isLoading}
                                        groups={groups}
                                    />
                                }

                                {/* SKILLS */}
                                <>
                                    <Input
                                        className={`inputStandart ${formik.errors?.skills ? 'error' : ''}`}
                                        label="Ajouter une compétence"
                                        name="skills"
                                        value={newSkill}
                                        onChange={(e: any) => setNewSkill(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addSkill();
                                            }
                                        }}
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
                                            {skillList?.length > 0 && 'Liste des compétences'}
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
                                                        size="xl"
                                                    />
                                                </List.ItemEnd>
                                            </List.Item>
                                        )}
                                    </List>
                                </>
                            </CardLarge.MidSection>
                        </CardLarge>
                    }
                </section>
            </main>
            <CTAMines
                actions={[
                    {
                        icon: 'Modifier mon profil',
                        direct: true,
                        type: 'submit',
                        iconImage: 'check',
                        function: () => { },
                    }
                ]}
            />
        </form>
    );
}
