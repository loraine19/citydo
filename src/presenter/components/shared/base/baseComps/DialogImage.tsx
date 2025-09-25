import React from 'react';
import BackDropBlur from './BackDropBlur';

interface DialogImageProps {
    image: string;
    alt?: string;
    onClose?: () => void;
    open?: boolean;
}

const DialogImage: React.FC<DialogImageProps> = ({ image, alt = '', onClose, open }) => {
    return (
        <BackDropBlur
            key={alt}
            open={open}
            setOpen={onClose} >
            <div className="md3-card  !py-0 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden  bg-clip">
                <img
                    src={image} alt={alt} className="w-full h-full  !max-w-[90vw] !max-h-[80dvh] object-contain" />
            </div>
        </BackDropBlur>
    )
}

export default DialogImage;
