import { Button } from "@material-tailwind/react";
import { Icon } from "./IconComp";
import { useAlertStore } from "../../../application/stores/alert.store";

export const ImageBtn = (props: { formik: any; setImgBlob: any; imgDef?: string; className?: string }) => {
    const { formik, imgDef, setImgBlob, className } = props;

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

    return (
        <div className={`absolute -mb-1 pb-2 pl-1 z-30 ${className}`}>
            <Button
                type="button"
                className="!shadow-md w-10 h-10 rounded-full px-0" ripple={false}>
                <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <Icon
                        bg clear
                        icon={formik?.values?.image ? "edit" : "add_a_photo"}
                        color="white"
                        size="md"
                        style="rounded-full shadow"
                    />
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
            <Icon
                icon="close"
                size="lg"
                color="red"
                title="Supprimer l'image"
                onClick={() => {
                    formik.values.image = "";
                    formik.values.blob = "";
                    setImgBlob(imgDef || "");
                }}
                style={(formik?.values?.image === "" || formik?.values?.image === imgDef) ?
                    "hidden" :
                    "absolute -left-2 !px-1 !py-0 bottom-0 z-30 !shadow-none"}
            />
        </div>
    );
};
