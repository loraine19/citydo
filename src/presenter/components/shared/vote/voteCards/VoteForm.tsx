import { Radio, Select, Card, CardHeader, Button, CardBody, Input, Textarea, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { dayMS, Label } from "../../../../../domain/entities/frontEntities";
import SubHeader from "../../../common/SubHeader";
import { ImageBtn } from "../../../common/ImageBtn";
import { DateChip } from "../../../common/ChipDate";
import { surveyCategories } from "../../../../constants";
import { VoteTarget } from "../../../../../domain/entities/Vote";
import DI from "../../../../../di/ioc";
import { User } from "../../../../../domain/entities/User";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { Icon } from "../../../common/IconComp";
import { useUserStore } from "../../../../../application/stores/user.store";
import GroupSelect from "../../../common/GroupSelect";
import { InputError } from "../../../common/adaptatersComps/input";

type PoolSurveyFormProps = {
    formik: any;
    type: VoteTarget;
    setType: any
}
export function VoteForm({ formik, type, setType }: PoolSurveyFormProps) {
    const start = formik.values.createdAt || new Date()
    const end = new Date(new Date().getTime() + (15 * dayMS)).toLocaleDateString('fr-FR')
    const haveImage = (formik.values.image && formik.values.typeS === VoteTarget.SURVEY) ? true : false;
    const [imgBlob, setImgBlob] = useState<string | undefined>(formik.values.image);

    const { user } = useUserStore(state => state)
    const [groupId, setGroupId] = useState<string>(formik.values.groupId ?? '0');
    const { users, isLoading, refetch } = DI.resolve('userViewModel')(groupId);




    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full">
            <main>
                <div className="sectionHeader">
                    <SubHeader
                        type={formik.values.id ?
                            `Modifier votre ${formik.values.typeS}` : `Créer votre ${formik.values.typeS === 'POOL' ? 'cagnotte' : formik.values.typeS === 'SURVEY' ? 'sondage' : 'vote'}`}
                        closeBtn
                        place={formik.values.id ? formik.values.title : ''} />

                    <div className="w-respLarge flex flex-col grid-cols-[1fr_1fr_1fr] lg:grid grid-rows-1 gap-3 py-4">
                        <Radio
                            orientation="horizontal"
                            className="inputDiv px-4 gap-6">
                            <div className="flex items-center flex-1 gap-2">
                                <Radio.Item
                                    id='sondage-radio'
                                    disabled={formik.values.pourcent > 1}
                                    name="typeS"
                                    value={VoteTarget.SURVEY}
                                    checked={type === VoteTarget.SURVEY}
                                    onChange={() => {
                                        formik.setFieldValue('typeS', VoteTarget.SURVEY)
                                        setType(VoteTarget.SURVEY)
                                    }}
                                >
                                    <Radio.Indicator
                                        className="!border border-orange-500/50 rounded-full flex !bg-white ">
                                        <Icon
                                            fill
                                            size="lg"
                                            color='orange'
                                            icon='check_circle'
                                        />
                                    </Radio.Indicator>
                                    <Typography
                                        as="label"
                                        htmlFor="sondage-radio"
                                        className="text-sm font-normal text-gray-600 pl-8">
                                        Sondage
                                    </Typography>
                                </Radio.Item>
                            </div>
                            <div className="flex items-center flex-1 gap-2">
                                <Radio.Item
                                    id='cagnotte-radio'
                                    disabled={formik.values.pourcent > 1}
                                    name="typeS"
                                    value={VoteTarget.POOL}
                                    checked={type === VoteTarget.POOL}
                                    onChange={() => {
                                        setType(VoteTarget.POOL)
                                        formik.setFieldValue('typeS', VoteTarget.POOL)
                                        refetch()
                                    }}
                                >
                                    <Radio.Indicator
                                        className="!border border-orange-500/50 rounded-full flex !bg-white ">
                                        <Icon
                                            fill
                                            size="lg"
                                            color='orange'
                                            icon='check_circle'
                                        />
                                    </Radio.Indicator>
                                    <Typography
                                        as="label"
                                        htmlFor="cagnotte-radio"
                                        className="text-sm font-normal text-gray-600 pl-8">
                                        Cagnotte
                                    </Typography>
                                </Radio.Item>
                            </div>
                        </Radio>
                        <div>
                            {(type === VoteTarget.POOL) ?
                                <Select
                                    className="rounded-full shadow bg-white border-none capitalize"
                                    name={"userIdBenef"}
                                    defaultValue={formik.values?.UserBenef?.id?.toString()}
                                    onChange={(val: string | undefined) => {
                                        const find = users.find((user: Partial<User>) => user.id === parseInt(val || ''))
                                        formik.setFieldValue('UserBenef', find as User)
                                        formik.setFieldValue('userIdBenef', val)
                                        formik.setFieldValue('category', '')
                                    }} >
                                    <Select.Trigger
                                        placeholder="Choisir un bénéficiaire"
                                        className="inputDiv" />
                                    <Select.List>
                                        {users && users.length && !isLoading ? users?.map((user: any, index: number) =>
                                            <Select.Option
                                                className={`${user.id?.toString() === formik.values?.UserBenef?.id && "bg-orange-100 shadow-md"} rounded-full my-1 capitalize`}
                                                value={user?.id?.toString()}
                                                key={index}
                                            >
                                                {user?.Profile?.firstName} {user?.id}
                                            </Select.Option>


                                        ) :
                                            <Select.Option>Choissisez un groupe, pour voir les utilisateurs </Select.Option>
                                        }</Select.List>
                                </Select> :
                                <Select
                                    className="rounded-full shadow bg-white border-none capitalize"
                                    name={"category"}
                                    value={formik.values.category}
                                    onChange={(val: string | undefined) => {
                                        formik.setFieldValue('category', val)
                                        formik.setFieldValue('userIdBenef', '')
                                        formik.setFieldValue('UserBenef', {} as User)
                                    }} >
                                    <Select.Trigger
                                        placeholder="Choisir une catégorie"
                                        className="inputDiv" />
                                    <Select.List>
                                        {surveyCategories.map((category: Label, index: number) => {
                                            return (
                                                <Select.Option
                                                    value={category.value}
                                                    key={index}>
                                                    {category.label}
                                                </Select.Option>
                                            )
                                        })}</Select.List>
                                </Select>
                            }
                        </div>
                        <GroupSelect
                            setGroupId={setGroupId}
                            formik={formik}
                            user={user} />
                    </div>
                </div>
                <section className={`flex pb-1 flex-1 relative pt-6`}>
                    <Card className={`${(imgBlob || formik.values.image) ?
                        "FixCard" :
                        "FixCardNoImage !flex justify-between "} w-respLarge `}>
                        <CardHeader
                            className={(imgBlob || formik.values.image) ?
                                "FixCardHeader !relative " :
                                "FixCardHeaderNoImage !relative pt-16 pb-0"}
                            floated={imgBlob || formik.values.image ?
                                true : false} >
                            <div className={`${start ? 'ChipDiv !justify-end right-3 top-3' : 'invisible'}`}>
                                <DateChip
                                    prefix="publié le"
                                    start={start}
                                    end={end} />
                            </div>

                            <ImageBtn
                                className={type === VoteTarget.SURVEY ?
                                    "!absolute z-40 !h-max top-3 !left-3 " : "hidden"}
                                formik={formik}
                                setImgBlob={setImgBlob} />
                            {haveImage &&
                                <img
                                    onError={(e) => e.currentTarget.src = '/images/placeholder.jpg'}
                                    src={imgBlob || formik.values.image || null}
                                    alt={formik.values.title || 'image'}
                                    width={100}
                                    height={100}
                                    className={(imgBlob || formik.values.image) ?
                                        "CardImage" : "hidden"}
                                />
                            }
                            {formik.values?.UserBenef && formik.values?.typeS === VoteTarget.POOL &&
                                <ProfileDiv
                                    profile={formik.values?.UserBenef} />
                            }
                        </CardHeader>
                        <CardBody className='FixCardBody -mt-2 mb-4 '>
                            <div className='CardOverFlow h-full justify-between mt-2 gap-4'>
                                <Input className={`inputStandart ${formik.errors.title ? 'error' : ''}`}
                                    placeholder={"Titre"}
                                    name="title"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                />
                                <InputError error={formik.errors.title} />
                                <div className='flex flex-col lg:flex-row gap-5 pt-3 h-full '>
                                    <div className='flex flex-col flex-1 pt-1 '>
                                        <Textarea
                                            className={`inputStandart min-h-full ${formik.errors.description ? 'error' : ''}`}

                                            placeholder='Description'
                                            rows={1}
                                            resize={true}
                                            name="description"
                                            onChange={formik.handleChange}
                                            defaultValue={formik.values.description}
                                        // containerProps={{ className: "grid h-full pb-1" }}
                                        />
                                        <InputError mt error={formik.errors.description} />
                                    </div>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </section>
            </main>
            <footer className="CTA">
                <Button
                    size='lg'
                    type="submit"
                    disabled={formik.values.pourcent > 1}
                    className="lgBtn bg-orange-500">
                    <Icon
                        size='lg'
                        color="white"
                        icon="add" />
                    {formik.values.pourcent > 1 ?
                        'Non modifiable votes en cours  ' + formik.values.pourcent + '%' : `Enregistrer`}
                </Button>
            </footer>
        </form>
    )
}