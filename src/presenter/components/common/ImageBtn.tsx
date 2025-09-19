import { Icon } from "./IconComp";
import { useAlertStore } from "../../../application/stores/alert.store";
import { Button } from "../shared/base/baseComps/Buttons";
import { useUxStore } from "../../../application/stores/ux.store";

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
    const { color } = useUxStore((state) => state);

    return (
        <div className={`absolute -mb-1 pb-2 pl-1 ${className}`}>
            <Button
                variant={formik?.values?.image ? "tonal" : "filled"}
                size="medium"
                color={color as any}
                type="button">
                <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <Icon
                        size='lg'
                        icon={formik?.values?.image ? "edit" : "add_a_photo"}
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
