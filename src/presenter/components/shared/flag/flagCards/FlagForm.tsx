import React, { useEffect, useMemo, useState } from 'react';
import { CardLarge } from '../../base/baseComps/Cards';
import { Skeleton } from '../../../common/Skeleton';
import CTAMines from '../../../common/CTA';
import FlagDetailComp from './FlagDetailComp';
import { FlagView } from '../../../../views/viewsEntities/flagViewEntities';
import { Button } from '../../base/baseComps/Buttons';
import { Select } from '../../../common/adaptatersComps/Select';
import { useNavStore } from '../../../../../application/stores/nav.store';
import FormHeadSection from '../../base/baseComps/FormHeadSection';
import { flagReasons } from '../../../../constants';
import { InputError } from '../../../common/adaptatersComps/input';

interface FlagFormProps {
    loading: boolean;
    formik: any;
    alreadyFlag?: boolean;
}

const FlagForm: React.FC<FlagFormProps> = ({ loading, formik, alreadyFlag }) => {
    const [show, setShow] = useState(!alreadyFlag);
    const [showCard, setShowCard] = useState(alreadyFlag);
    const [expand, setExpand] = useState(false);


    // AppBar Section
    const { setDetailSection } = useNavStore((state) => state);
    const SearchSection = useMemo(() => (
        <>
            <FormHeadSection
                showProps={(!showCard) ? undefined : {
                    show, setShow,
                    text: alreadyFlag ? "voir le motif" : show ? "Saisir le motif" : "Modifier le motif",
                    color: "slate"
                }}

                infosChipValue={(alreadyFlag ?
                    " mon signalement" : "Créer mon signalement") + " / " + (formik.values.element?.title ?? "") + " / " + (formik.values.reasonS ?? "...")} />

        </>
    ), [show, formik.values, formik.errors, showCard]);

    useEffect(() => {
        setDetailSection(SearchSection);
        return () => setDetailSection(undefined);
    }, [SearchSection]);


    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full overflow-hidden">
            <main className={`hBottomForm`}>
                <section className={`pb-6 ${show ? 'overflow-hidden' : 'overflow-auto '}`}>
                    <div className={`pt-2 max-h-max w-full flex flex-col  gap-2 ${(show) ? 'md3-animation-slide-down' : 'md3-animation-slide-out-up h-0'}`}>
                        <h6 className="md3-card-subhead pt-4">
                            {!alreadyFlag ? `Informations principales` : `Modifier mon signalement`}
                        </h6>
                        <div className="flex flex-col flex-wrap gap-4 flex-1 w-full">
                            <Select
                                disabled={alreadyFlag}
                                variant="Input"
                                value={formik.values.reason}
                                options={flagReasons}
                                formik={formik}
                                name="reason"
                                placeholder="Choisir la raison"
                                onChangeFunction={() =>
                                    formik.setFieldValue('reasonS', flagReasons.find(r => r.value === formik.values.reason)?.label)}
                            />
                            {(!formik.errors.reason && formik.values.reason && formik.values.reasonS) && (
                                <Button
                                    color="error"
                                    type="button"
                                    onClick={() => {
                                        setShowCard(true);
                                        setShow(false);
                                    }}
                                >
                                    Continuer
                                </Button>
                            )}
                        </div>
                    </div>
                    <CardLarge
                        image={
                            <img
                                src={formik.values.element?.image as string ?? ''}
                                alt={formik.values.element?.title} />}
                        className={` ${showCard && !show ? 'md3-animation-slide-up' : 'md3-animation-slide-out-down'}`}
                        form
                        expanded={expand}
                        setExpanded={setExpand}
                    >
                        <CardLarge.Headline>
                            {!alreadyFlag ? `Enregistrer mon signalement` : `Supprimer mon signalement`}
                        </CardLarge.Headline>
                        <CardLarge.Subhead>
                            {`Pour le motif :
                             ${formik.values.reasonS ?? flagReasons.find(r => r.value === formik.values.reason)?.label} `}
                        </CardLarge.Subhead>

                        <CardLarge.Divider />
                        <CardLarge.MidSection className=" flex flex-col">
                            <h6>Élément signalé :</h6>
                            <div className="flex flex-1 flex-col gap-4">
                                {loading ? (
                                    <Skeleton className="w-respLarge m-auto !h-full !rounded-3xl" />
                                ) : (
                                    <FlagDetailComp
                                        element={formik.values.element}
                                        flag={new FlagView(formik.values)}
                                        label={formik.values.targetS} />
                                )}
                            </div>
                        </CardLarge.MidSection>
                        <InputError error={`
                            ${formik.errors.reason ?? ''} 
                            ${formik.errors.target ?? ''} 
                            ${formik.errors.targetId ?? ''}`} />
                    </CardLarge>
                </section>
            </main>
            {showCard && !show && (
                <CTAMines
                    actions={[
                        {
                            color: 'error',
                            iconImage: alreadyFlag ? 'close' : 'send',
                            icon: alreadyFlag ? 'supprimer' : 'signaler',
                            title: alreadyFlag ? "Supprimer le signalement" : "Signaler",
                            function: () => formik.submitForm(),
                            direct: true,
                            type: 'submit',
                        },
                    ]}
                />
            )}
        </form>
    );
};

export default FlagForm;