import React, { useState } from "react";
import { Md3Colors } from "../shared/base/baseComps/Buttons";
import DialogImage from "../shared/base/baseComps/DialogImage";
import { useUxStore } from "../../../application/stores/ux.store";
import { Fab } from "../shared/base/baseComps/Fabs";
interface BtnExpandImgProps {
    colorComp?: Md3Colors;
    image?: string;
}

const BtnExpandImg: React.FC<BtnExpandImgProps> = ({ colorComp, image }) => {
    const [open, setOpenDialog] = useState(false);
    const { color } = useUxStore((state) => state);

    return (
        <>
            <Fab
                className="m-1 md3-elevation-1"
                size="small"
                variant="tonal"
                type="button"
                color={colorComp ?? color as Md3Colors}
                icon={{
                    fill: true,
                    icon: "expand_content",
                    title: "Aperçu de l'image",
                    onClick: () => setOpenDialog(true),
                }}
            />
            {open && image && (
                <DialogImage
                    onClose={() => setOpenDialog(false)}
                    image={image}
                />
            )}
        </>
    );
};

export default BtnExpandImg;