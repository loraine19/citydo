import React, { useState } from "react";
import { Md3Colors } from "../shared/base/baseComps/Buttons";
import DialogImage from "../shared/base/baseComps/DialogImage";
import { useUxStore } from "../../../application/stores/ux.store";
import { Fab } from "../shared/base/baseComps/Fabs";
interface BtnExpandImgProps {
    colorComp?: Md3Colors;
    image: string;
}

const BtnExpandImg: React.FC<BtnExpandImgProps> = ({ colorComp, image }) => {
    const [open, setOpenDialog] = useState(false);
    const { color } = useUxStore((state) => state);

    return (
        <>
            <Fab
                className="m-1 md3-elevation-1 !rounded-lg"
                size="xsmall"
                variant="tonal"
                type="button"
                color={colorComp ?? color as Md3Colors}
                icon={{
                    fill: true,
                    size: "md",
                    icon: "expand_content",
                    title: "Aperçu de l'image",
                    onClick: () => setOpenDialog(true),
                }}
            />
            {open && (
                <DialogImage
                    open={open}
                    alt="Aperçu de l'image"
                    onClose={() => setOpenDialog(false)}
                    image={image ?? ''}
                />
            )}
        </>
    );
};

export default BtnExpandImg;