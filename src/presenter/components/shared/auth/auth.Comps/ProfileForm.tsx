import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "../../../../../application/stores/user.store";
import { assistanceLevel, mailSubscriptions } from "../../../../../domain/entities/Profile";
import { AddressInputOpen } from "../../../common/mapComps/AddressInputOpen";
import { ImageBtn } from "../../../common/ImageBtn";
import { Icon } from "../../../common/IconComp";
import DI from "../../../../../di/ioc";
import { AvatarUser } from "../../../common/AvatarUser";
import { MultiSelect, Select } from "../../../common/adaptatersComps/Select";
import CTAMines from "../../../common/CTA";
import { Skeleton } from "../../../common/Skeleton";
import { Input } from "../../base/baseComps/Inputs";
import { CardLarge } from "../../base/baseComps/Cards";
import { Button } from "../../base/baseComps/Buttons";
import { useNavStore } from "../../../../../application/stores/nav.store";
import FormHeadSection from "../../base/baseComps/FormHeadSection";

type ProfileFormProps = {
    formik: any,
    setAssistance?: any,
    setAddress?: any,
    setMailSub?: any,
}

export function ProfileForm({ formik, setAssistance, setMailSub, setAddress }: ProfileFormProps) {
    const { user } = useUserStore((state) => state);
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

    // AppBar Section
    const { setDetailSection } = useNavStore((state) => state);
    const SearchSection = useMemo(() => (
        <FormHeadSection

            infosChipValue={'Profil'}
        />
    ), [formik.values]);

    useEffect(() => {
        setDetailSection(SearchSection);
        return () => setDetailSection(undefined);
    }, [SearchSection, setDetailSection, formik.values]);

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full  overflow-hidden">
            <main className="wRespXLMargin ">
                {/* PRES DIV  */}
                <div className="w-respXL pt-4 pb-4 flex flex-col gap-2 px-[0.8rem] md:px-[3rem] ">
                    <div className="flex items-center gap-4">
                        <AvatarUser
                            Profile={{
                                firstName: formik.values?.firstName,
                                image: imgBlob as string,
                                userId: user?.id || 0
                            } as any}
                            avatarSize="6xl"
                            avatarStyle="scale-[1] hover:!scale-[1] md3-elevation-2 md3-border "
                        />
                        <div className=" flex-1  flex flex-col ">
                            <span>
                                Bienvenue&nbsp;
                                {user?.Profile?.firstName ?? ""}
                            </span>
                            <span className="text-sm font-normal opacity-80">
                                {user?.email}
                            </span>
                        </div>
                    </div>
                </div>


                {/* FORM DIV  */}
                <section className={`!h-full hBottomFab flex `}>
                    {error || isLoading ? <Skeleton /> :
                        <CardLarge
                            className="mb-6"
                            form
                            expanded={true}
                            setExpanded={() => { }}
                            image={undefined}>
                            <CardLarge.Header className="flex justify-start items-start flex-col pt-0 gap-2">
                                <ImageBtn
                                    size={"small"}
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
                                <h6>Informations personnelles</h6>
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

                            </CardLarge.MidSection>
                            <CardLarge.Divider />
                            <CardLarge.MidSection className="flex-col py-4 gap-4 flex ">
                                <h6>Coordonnées</h6>
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
                                <h6>Préférences</h6>
                                <Select
                                    bgColor='var(--md3-primary-container)'
                                    variant="Input"
                                    formik={formik}
                                    value={formik.values?.assistance}
                                    setValue={setAssistance}
                                    name={"level"}
                                    placeholder={'niveau d\'assistance'}
                                    options={assistanceLevel}
                                />
                                <Select
                                    bgColor='var(--md3-primary-container)'
                                    variant="Input"
                                    formik={formik}
                                    value={formik.values?.mailSub}
                                    setValue={setMailSub}
                                    name={"mailSub"}
                                    placeholder={'souscription aux mails'}
                                    options={mailSubscriptions}
                                />
                            </CardLarge.MidSection>
                            <CardLarge.Divider />
                            <CardLarge.MidSection className="flex-col py-4 gap-4 flex ">
                                <h6>Groupes</h6>
                                {/* GROUP SELECT */}
                                {!isLoading &&

                                    <MultiSelect
                                        bgColor='var(--md3-primary-container)'
                                        variant="Input"
                                        formik={formik}
                                        setValue={(val: any) => {
                                            formik.setFieldValue('groups', val);
                                        }}
                                        value={formik.values?.groups ? formik.values?.groups.split(',') : groups.map((group: any) => group.id.toString())}
                                        name="groups"
                                        placeholder={'Vos groupes'}
                                        options={groups.map((group: any) => ({
                                            label: group.name,
                                            value: group.id.toString()
                                        }))} />}
                            </CardLarge.MidSection>
                            <CardLarge.Divider />
                            <CardLarge.MidSection className="flex-col py-4 gap-4 flex ">
                                <h6>Competences</h6>
                                {/* SKILLS */}
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
                                            icon={newSkill ? "add" : "list"}
                                            size='lg'
                                            onClick={addSkill}
                                            style={` ${newSkill ? '' : 'hidden'} `}
                                        />
                                    }
                                />
                                <div className='flex flex-col gap-1'>
                                    <h6>
                                        {skillList?.length > 0 && 'Liste des compétences'}
                                    </h6>
                                    {skillList.map((skill: string, index: number) =>
                                        <div
                                            key={index}
                                            className="!py-1 px-4 flex justify-between items-center">
                                            {skill}

                                            <Icon
                                                bg
                                                color='error'
                                                onClick={() => { removeSkill(skill) }}
                                                icon="close"
                                                size="sm"
                                            />
                                        </div>
                                    )}
                                </div>
                            </CardLarge.MidSection>
                        </CardLarge>
                    }
                </section>
            </main>

            {/* CTA DIV  */}
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
