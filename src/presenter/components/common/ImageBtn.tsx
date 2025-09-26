import { useAlertStore } from "../../../application/stores/alert.store";
import { Button, ButtonGroup, Md3Colors } from "../shared/base/baseComps/Buttons";
import { useUxStore } from "../../../application/stores/ux.store";
import { useState } from "react";
import DialogImage from "../shared/base/baseComps/DialogImage";

export const ImageBtn = (props: { formik: any; imgBlob: any; setImgBlob: any; imgDef?: string; className?: string, color?: Md3Colors, variant?: any, size?: any }) => {
    const { formik, imgBlob, imgDef, setImgBlob, className, color: colorComp, variant, size } = props;
    const { color } = useUxStore((state) => state);

    const getImageBlob = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (file) {
            formik.values.image = file;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                setImgBlob(result);
            };
        }
    };

    const { setAlertValues, setOpen } = useAlertStore();
    const [open, setOpenDialog] = useState(false);

    return (
        <div className={` ${className || ''}`}>
            <ButtonGroup
                variant={variant || "filled"}
                size={size || "medium"}
                rounded
                color={colorComp ?? color as any}>
                {/* <Button
                    disabled
                    variant={formik?.values?.image ? "tonal" : "filled"}
                    icon={{
                        fill: true,
                        icon: 'image'
                    }}
                /> */}

                <Button
                    round
                    size={size || "medium"}
                    className="px-2 !py-2 min-h-max  w-max !min-w-max "
                    color={colorComp ?? color as any}
                    variant={"filled"}
                    icon={{
                        fill: true,
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
                {formik?.values?.image &&
                    <>
                        <Button
                            size={size || "medium"}
                            round
                            className="px-2 !py-2 min-h-max  w-max !min-w-max "
                            type="button"
                            color={colorComp ?? color as any}
                            icon={{
                                fill: true,
                                icon: "hide_image",
                                title: "Supprimer l'image",
                                onClick: () => {
                                    formik.setFieldValue("image", "");
                                    formik.values.image = "";
                                    setImgBlob("");
                                },

                            }}
                        >

                        </Button>

                        <Button
                            size={size || "medium"}
                            className="px-2 !py-2 min-h-max  w-max !min-w-max "
                            round
                            type="button"
                            color={colorComp ?? color as any}
                            icon={{
                                fill: true,
                                icon: "expand_content",
                                title: "Aperçu de l'image",
                                onClick: () => setOpenDialog(true)
                            }}
                        />
                        {open &&
                            <DialogImage
                                open={open}
                                onClose={() => setOpenDialog(false)}
                                image={imgBlob ?? formik?.values?.image ?? imgDef} />}


                    </>

                }
                {!formik?.values?.image &&
                    <span className={`md3-card-supporting-text pl-2 pr-4 flex-1 whitespace-nowrap`}> ajouter une image</span>}
            </ButtonGroup>
        </div>
    );
};
