import React from 'react';
import BackDropBlur from './BackDropBlur';

interface DialogImageProps {
    image: string;
    alt?: string;
    onClose?: () => void;
}

const DialogImage: React.FC<DialogImageProps> = ({ image, alt = '', onClose }) => (
    <BackDropBlur
        setOpen={onClose}
        open={!!image} >
        <div className="md3-card  !py-0 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden  bg-clip">
            <img
                src={image} alt={alt} className="w-full h-full  !max-w-[99vw] !max-h-[90dvh] object-contain" />
        </div>
    </BackDropBlur>
);

export default DialogImage;
