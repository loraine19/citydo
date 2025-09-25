import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "../../../../../application/stores/user.store";
import { postCategories } from "../../../../constants";
import GroupSelect from "../../../common/GroupSelect";
import { Select } from "../../../common/adaptatersComps/Select";
import CTAMines from "../../../common/CTA";
import { CardLarge } from "../../base/baseComps/Cards";
import { Checkbox } from "../../base/baseComps/Selectors";
import { Input } from "../../base/baseComps/Inputs";
import { ImageBtn } from "../../../common/ImageBtn";
import { DateChip } from "../../../common/ChipDate";
import { useNavStore } from "../../../../../application/stores/nav.store";
import FormHeadSection from "../../base/baseComps/FormHeadSection";
import { Button } from "../../base/baseComps/Buttons";

interface PostFormCardProps {
    formik: any;
}

export function PostFormCard({ formik }: PostFormCardProps) {
    const user = useUserStore((state) => state.user);
    const [imgBlob, setImgBlob] = useState<string>(formik.values.image || '');
    const [groupId, setGroupId] = useState<number | string | undefined>(formik.values.Group?.id);
    const [expand, setExpand] = useState<boolean>(false);

    // AppBar Section
    const { setDetailSection } = useNavStore((state) => state);
    const [show, setShow] = useState(true);
    const [showCard, setShowCard] = useState<boolean>(false);


    const label = formik.values.category ? postCategories.find((c: any) => c.value === formik.values.category)?.label : '';
    const SearchSection = useMemo(() => (
        <>
            <FormHeadSection
                showProps={(!showCard) ? undefined : {
                    show, setShow,
                    text: show ? "Saisir Informations principales" : "Modifier Informations principales",
                    color: (formik.errors.groupId || formik.errors.category) ? "error" : "slate"
                }}

                infosChipValue={(formik.values.id ?
                    "Modifier mon annonce " : "Créer mon annonce ") + " / " + (label ?? "...")} />

        </>
    ), [show, formik.values, label, formik.errors, showCard]);

    useEffect(() => {
        setDetailSection(SearchSection);
        return () => setDetailSection(undefined);
    }, [SearchSection, setDetailSection, formik.errors, formik.values, show]);

    const checkShare = (word: string) => formik.values?.shareA?.toString().toLowerCase().includes(word);
    const start = formik.values.createdAt ? new Date(formik.values.createdAt) : new Date();

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full overflow-hidden">
            <main className="wRespXLMargin">

                <section className={`"DetailCardDiv  " ${show ? 'overflow-hidden' : 'overflow-auto hideCTAForm'} `}>
                    <div className={`p-2 max-h-max w-full flex flex-col grid-cols-[auto_auto] lg:grid grid-rows-1 gap-2 ${(show) ? 'md3-animation-slide-down' : 'md3-animation-slide-out-up h-0'}`}>
                        <h6 className="md3-card-subhead pt-4">Informations principales</h6>
                        <div className="flex flex-col flex-wrap gap-4 flex-1 w-full">
                            <Select
                                variant="Input"
                                value={formik.values.category}
                                options={postCategories}
                                formik={formik}
                                name="category"
                                placeholder="Choisir la catégorie"
                            />
                            <GroupSelect
                                groupId={groupId?.toString()}
                                setGroupId={setGroupId}
                                formik={formik}
                                user={user}
                            />
                            {
                                (!formik.errors.groupId && !formik.errors.category &&
                                    formik.values.groupId && formik.values.category) &&
                                <Button
                                    color='rose'
                                    type='button'
                                    onClick={() => {
                                        setShowCard(true);
                                        setShow(false);
                                    }}>
                                    Continuer
                                </Button>}

                        </div>
                    </div>
                    <CardLarge
                        className={` ${(showCard && !show) ?
                            `md3-animation-slide-up ` : 'md3-animation-slide-out-down'}`}
                        form
                        expanded={expand}
                        setExpanded={setExpand}
                        image={
                            <CardLarge.Image
                                className="md3-rose-container"
                                src={imgBlob || formik.values.image || null}
                                alt={formik.values.title || 'image'}
                            />
                        }
                    >
                        <CardLarge.Chips className="justify-between px-4">
                            <ImageBtn
                                variant="tonal"
                                className={"relative pb-1"}
                                formik={formik}
                                setImgBlob={setImgBlob}
                            />
                            <DateChip
                                prefix=" "
                                start={start}
                            />
                        </CardLarge.Chips>
                        <CardLarge.Divider />
                        <CardLarge.MidSection className="md:px-8 flex flex-col">
                            <span className="md3-card-subhead">Informations</span>
                            <div className="flex flex-1 flex-col gap-4">
                                <Input
                                    label={"Titre"}
                                    name="title"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                    error={!!formik.errors.title}
                                    helperText={formik.errors.title ?? `${formik.values.title?.length ?? 0}/40`}
                                />
                                <Input
                                    multiline
                                    rows={6}
                                    error={!!formik.errors.description}
                                    label='Description'
                                    name="description"
                                    helperText={`${formik.errors.description ?? (`${formik.values.description?.length ?? 0}/300`)}`}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                        formik.handleChange(e);
                                        const textarea = e.target as HTMLTextAreaElement;
                                        textarea.style.height = '2.5rem';
                                        textarea.style.height = textarea.scrollHeight + 'px';
                                        if (e.target.value === '') {
                                            textarea.style.height = '2.5rem';
                                        }
                                    }}
                                    value={formik.values.description}
                                />
                            </div>
                        </CardLarge.MidSection>
                        <CardLarge.Divider />
                        <CardLarge.MidSection className="md:px-8 flex flex-col">
                            <span className="md3-card-subhead">{formik?.errors?.shareA ?? 'Contact'}</span>
                            <div className="flex py-1 px-4 gap-4">
                                <Checkbox
                                    color="rose"
                                    label={"Téléphone"}
                                    id='phone-checkbox'
                                    name="shareA"
                                    value="PHONE"
                                    onChange={formik.handleChange}
                                    checked={checkShare("phone")}
                                />
                                <Checkbox
                                    color="rose"
                                    label="Email"
                                    id='email-checkbox'
                                    name="shareA"
                                    value="EMAIL"
                                    onChange={formik.handleChange}
                                    checked={checkShare("email")}
                                />
                            </div>
                        </CardLarge.MidSection>
                    </CardLarge>
                </section>
            </main>
            {(showCard && !show && (!formik.errors || Object.keys(formik.errors).length === 0)) &&
                <CTAMines
                    actions={[
                        {
                            type: 'submit',
                            iconImage: formik.isSubmitting ? "progress_activity" : formik.values?.id ? "check" : "send",
                            icon: formik.values?.id ? "Modifier l'annonce" : "Créer l'annonce",
                            direct: true,
                            function: () => { }
                        }
                    ]}
                />}
        </form>
    );
}