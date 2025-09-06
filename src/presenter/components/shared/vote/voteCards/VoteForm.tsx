import { Card, CardHeader, CardBody, Input, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Action, Label } from "../../../../../domain/entities/frontEntities";
import SubHeader from "../../../common/SubHeader";
import { ImageBtn } from "../../../common/ImageBtn";
import { DateChip } from "../../../common/ChipDate";
import { surveyCategories } from "../../../../constants";
import { VoteTarget } from "../../../../../domain/entities/Vote";
import DI from "../../../../../di/ioc";
import { User } from "../../../../../domain/entities/User";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { useUserStore } from "../../../../../application/stores/user.store";
import GroupSelect from "../../../common/GroupSelect";
import { InputError } from "../../../common/adaptatersComps/input";
import { RadioGroup } from "../../../common/adaptatersComps/RadioGroup";
import { Select } from "../../../common/adaptatersComps/Select";
import CTAMines from "../../../common/CTA";

type PoolSurveyFormProps = {
    formik: any;
    type: VoteTarget;
    setType: any
}
export function VoteForm({ formik, type, setType }: PoolSurveyFormProps) {
    const start = formik.values.createdAt || new Date()
    const haveImage = (formik.values.image && formik.values.typeS === VoteTarget.SURVEY) ? true : false;
    const [imgBlob, setImgBlob] = useState<string | undefined>(formik.values.image);
    const { user } = useUserStore(state => state)
    const { users: fetchedUsers, isLoading, refetch } = DI.resolve('userViewModel')(formik.values.groupId ?? 0);
    const [users, setUsers] = useState<Label[]>(fetchedUsers.map((user: Partial<User>) => ({ value: user?.id, label: user?.Profile?.firstName })));

    useEffect(() => {
        refetch();
        setUsers(fetchedUsers.map((user: Partial<User>) => ({ value: user?.id, label: user?.Profile?.firstName })));
    }, [isLoading, formik.values.groupId, type]);

    const actions: Action[] = [
        {
            title: 'Enregistrer',
            iconImage: 'add',
            icon: formik.values?.pourcent > 1 ?
                'Non modifiable votes en cours  ' + formik.values.pourcent + '%' : `Enregistrer`,
            type: "submit",
            disabled: formik.values?.pourcent > 1,
            function: () => { }
        }
    ]

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full overflow-hidden">
            <main>
                <div className="sectionHeader">
                    <SubHeader
                        type={formik.values.id ?
                            `Modifier votre ${formik.values.typeS} ` : `Créer votre ${formik.values.typeS === 'POOL' ? 'cagnotte ' : formik.values.typeS === 'SURVEY' ? 'sondage ' : 'vote'}`}
                        closeBtn
                        place={formik.values.id ? formik.values.title : ''} />
                    <div className="w-respLarge flex flex-col grid-cols-[55%_auto] lg:grid grid-rows-1  gap-2 py-3">
                        <div className="flex gap-2 flex-1 w-full ">
                            <RadioGroup
                                formik={formik}
                                value={formik.values.typeS ?? type}
                                onChange={(value) => { setType(value) }}
                                options={
                                    [
                                        { value: VoteTarget.SURVEY, label: "Sondage", id: 'sondage-radio' },
                                        { value: VoteTarget.POOL, label: "Cagnotte", id: 'cagnotte-radio' }
                                    ]
                                }
                            />
                            <div className="flex-1">
                                {(type === VoteTarget.POOL) &&
                                    <Select
                                        value={formik.values.beneficiary}
                                        options={users}
                                        placeholder="Bénéficiaire"
                                        name={"beneficiary"}
                                        formik={formik} />
                                } {(type === VoteTarget.SURVEY) && <Select
                                    value={formik.values.category}
                                    options={surveyCategories}
                                    placeholder="Catégorie"
                                    name={"category"}
                                    formik={formik} />
                                }
                            </div>
                        </div>
                        <div className="flex-1">
                            <GroupSelect
                                formik={formik}
                                user={user} />
                        </div>
                    </div>
                </div>
                <section >
                    <div className={`FormCardDiv `}>
                        <Card className={`${(haveImage || formik.values.image) ? " FormDetailGrid  " : "FixCardNoImage "} `}>
                            <CardHeader className={(haveImage || formik.values.image) ?
                                "DetailCardHeader" :
                                "FixCardHeaderNoImage pt-16 pb-0"} >
                                <div className={`${start ? 'ChipDiv !justify-end right-3 top-3' : 'invisible'}`}>
                                    <DateChip
                                        prefix="publié le"
                                        start={start} />
                                </div>

                                <ImageBtn
                                    className={type === VoteTarget.SURVEY ?
                                        "!absolute z-40 !h-max top-3 !left-3 " : "hidden"}
                                    formik={formik}
                                    setImgBlob={setImgBlob} />
                                <div className="CardImageDiv">
                                    <img
                                        onError={(e) => e.currentTarget.src = "/images/placeholder.jpg"}
                                        src={(imgBlob || formik.values.image) ?? null}
                                        alt={formik.values.title || 'image'}
                                        width={100}
                                        height={100}
                                        className={(imgBlob || formik.values.image) ?
                                            "CardImage" : "hidden"}
                                    />
                                </div>
                                {formik.values?.UserBenef && formik.values?.typeS === VoteTarget.POOL &&
                                    <ProfileDiv
                                        profile={formik.values?.UserBenef} />
                                }
                            </CardHeader>
                            <CardBody className={`${haveImage ? ' max-h-max' : ' h-full '} DetailCardBody `}>
                                <div className='overflow-auto h-full  pt-2 justify-between  gap-4'>
                                    <Input className={`inputStandart ${formik.errors.title ? 'error' : ''}`}
                                        placeholder={"Titre"}
                                        name="title"
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                    />
                                    <InputError mt error={formik.errors.title} />
                                    <div className='flex flex-col lg:flex-row gap-4  '>
                                        <div className='flex flex-col flex-1 pt-1 '>
                                            <Textarea
                                                isError={!!formik.errors.description}
                                                className={`inputStandart`}
                                                placeholder='Description'
                                                rows={4}
                                                resize={true}
                                                name="description"
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                    formik.handleChange(e);
                                                    const textarea = e.target as HTMLTextAreaElement;
                                                    textarea.style.height = '2.5rem';
                                                    textarea.style.height = textarea.scrollHeight + 'px';
                                                }}
                                                defaultValue={formik.values.description}
                                            />
                                            <InputError mt error={formik.errors.description} />
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </section>
            </main>
            <CTAMines actions={actions} />
        </form>
    )
}