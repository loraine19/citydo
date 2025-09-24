import React from 'react';
import BackDropBlur from './BackDropBlur';
import { CardMD } from './Cards';

interface DialogImageProps {
    image: string;
    alt?: string;
    onClose?: () => void;
}

const DialogImage: React.FC<DialogImageProps> = ({ image, alt = '', onClose }) => (
    <BackDropBlur
        setOpen={onClose}
        open={!!image} className="p-4">
        <CardMD className="!max-w-[80vw] !max-h-[70dvh] h-full w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden p-2  bg-clip">
            <img
                src={image} alt={alt} className="w-auto h-full rounded-2xl max-h-[70dvh] object-contain" />
        </CardMD>
    </BackDropBlur>
);

export default DialogImage;