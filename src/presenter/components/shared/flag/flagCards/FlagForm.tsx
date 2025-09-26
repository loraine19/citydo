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
    flag: any;
    loading: boolean;
    formik: any;
    alreadyFlag?: boolean;
}

const FlagForm: React.FC<FlagFormProps> = ({ flag, loading, formik, alreadyFlag }) => {
    const [show, setShow] = useState(true);
    const [showCard, setShowCard] = useState(false);
    const [expand, setExpand] = useState(false);


    // AppBar Section
    const label = formik.values.reasonS
    const { setDetailSection } = useNavStore((state) => state);
    const SearchSection = useMemo(() => (
        <>
            <FormHeadSection
                showProps={(!showCard) ? undefined : {
                    show, setShow,
                    text: show ? "Saisir le motif" : "Modifier le motif",
                    color: "slate"
                }}

                infosChipValue={(alreadyFlag ?
                    "Modifier mon signalement" : "Créer mon signalement") + " / " + (formik.values.targetS ?? "") + " / " + (label ?? "...")} />

        </>
    ), [show, formik.values, label, formik.errors, showCard]);

    useEffect(() => {

        setDetailSection(SearchSection);
        return () => setDetailSection(undefined);
    }, [SearchSection]);


    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full overflow-hidden">
            <main className="wRespXLMargin">
                <section className={`"DetailCardDiv  "
                     ${show ? 'overflow-hidden' : 'overflow-auto hideCTAForm'} `}>
                    <div className={`p-2 max-h-max w-full flex flex-col  gap-2 ${(show) ? 'md3-animation-slide-down' : 'md3-animation-slide-out-up h-0'}`}>
                        <h6 className="md3-card-subhead pt-4">
                            {!alreadyFlag ? `Informations principales` : `Modifier mon signalement`}
                        </h6>
                        <div className="flex flex-col flex-wrap gap-4 flex-1 w-full">
                            <Select
                                variant="Input"
                                value={formik.values.reason}
                                options={flagReasons}
                                formik={formik}
                                name="reason"
                                placeholder="Choisir la raison"
                            />
                            {!formik.errors.reason && formik.values.reason && (
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
                                src={flag.element?.image as string ?? ''}
                                alt={flag.element?.title} />}
                        className={` ${showCard && !show ? 'md3-animation-slide-up' : 'md3-animation-slide-out-down'}`}
                        form
                        expanded={expand}
                        setExpanded={setExpand}
                    >
                        {formik.values.reasonS}
                        {formik.values.reason}
                        <CardLarge.Headline>
                            {!alreadyFlag ? `Enregistrer mon signalement` : `Modifier mon signalement`}
                        </CardLarge.Headline>

                        <CardLarge.Divider />
                        <CardLarge.MidSection className="md:px-8 flex flex-col">
                            <div className="flex flex-1 flex-col gap-4">
                                {loading ? (
                                    <Skeleton className="w-respLarge m-auto !h-full !rounded-3xl" />
                                ) : (
                                    <FlagDetailComp
                                        flag={new FlagView(flag)}
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
                            iconImage: alreadyFlag ? 'check' : 'send',
                            icon: 'Signaler',
                            title: 'Signaler',
                            function: () => { },
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