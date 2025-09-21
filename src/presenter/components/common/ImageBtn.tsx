import { useAlertStore } from "../../../application/stores/alert.store";
import { Button, ButtonGroup, Md3Colors } from "../shared/base/baseComps/Buttons";
import { useUxStore } from "../../../application/stores/ux.store";

export const ImageBtn = (props: { formik: any; setImgBlob: any; imgDef?: string; className?: string, color?: Md3Colors, variant?: any }) => {
    const { formik, imgDef, setImgBlob, className, color: colorComp, variant } = props;

    const getImageBlob = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (file) {
            formik.values.image = file;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                setImgBlob(result);
                formik.values.blob = result;
            };
        }
    };

    const { setAlertValues, setOpen } = useAlertStore();
    const { color } = useUxStore((state) => state);

    return (
        <div className={` ${className || ''}`}>
            <ButtonGroup
                variant={variant || "filled"}
                size="medium" rounded color={colorComp ?? color as any}>
                {/* <Button
                    disabled
                    variant={formik?.values?.image ? "tonal" : "filled"}
                    icon={{
                        fill: true,
                        icon: 'image'
                    }}
                /> */}

                <Button
                    variant={"filled"}
                    icon={{
                        fill: true,
                        size: 'lg',
                        icon: formik?.values?.image ? "image_search" : "image_arrow_up"
                    }}
                    type="button">
                    <label
                        htmlFor="image"
                        className=" absolute flex flex-col items-center justify-center w-full h-full cursor-pointer">
                        <input
                            accept="image/*"
                            id="image"
                            type="file"
                            name="image"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files ? e.target.files[0] : null;
                                if (file && file.size <= 5 * 1024 * 1024) {
                                    getImageBlob(e);
                                } else {
                                    setAlertValues({
                                        handleConfirm: () => setOpen(false),
                                        title: "Erreur",
                                        element: (
                                            <div>
                                                {`La taille de l'image ne doit pas dépasser 5 Mo, la taille actuelle est de ${((file?.size ?? 0) / 1024 / 1024).toFixed(2)} Mo`}
                                            </div>
                                        ),
                                        disableConfirm: true,
                                        confirmString: "Recommencer",
                                    });
                                    setOpen(true);
                                }
                            }}
                        />
                    </label>
                </Button>
                {formik?.values?.image && (
                    <Button
                        icon={{
                            fill: true,
                            icon: "hide_image",
                            title: "Supprimer l'image",
                            onClick: () => {
                                formik.values.image = "";
                                formik.values.blob = "";
                                setImgBlob(imgDef || "");
                            },

                        }}
                    >

                    </Button>)}
                {!formik?.values?.image &&
                    <span className={`md3-card-subhead px-4 `}> ajouter une image</span>}
            </ButtonGroup>
        </div>
    );
};
