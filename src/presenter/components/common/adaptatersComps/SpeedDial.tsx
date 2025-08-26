import React from 'react'

export interface SpeedDialProps {
    placement?: 'top' | 'bottom' | 'left' | 'right';
    offset?: number;
    Handler: JSX.Element;
    Content: JSX.Element;
    open?: boolean;
    setOpen?: (open: boolean) => void;
    className?: string;
}

export const SpeedDial: React.FC<SpeedDialProps> = ({ placement = 'top', Handler, Content, open, setOpen, className }) => {

    const size = '16'
    const sizeW = `h-${size} w-${size}`;

    return (
        <div className={`${sizeW} ${className} relative `}>
            <div onMouseEnter={() => setOpen && setOpen(true)}
                className=' absolute flex !flex-1 '>
                {Handler}

                {open && (
                    <div
                        onMouseLeave={() => setOpen && setOpen(false)}
                        className={`
                            absolute left-0 w-full -ml-1
                            ${placement === 'bottom' ? 'top-full mt-4' : 'bottom-full mb-4'}
                        `}
                        style={{ zIndex: 10 }}
                    >
                        {Content}
                    </div>
                )}
            </div>
        </div >
    )
}
