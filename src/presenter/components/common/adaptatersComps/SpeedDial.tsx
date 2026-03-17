import { Popover } from '@material-tailwind/react';
import React, { JSX } from 'react'

export interface SpeedDialProps {
    placement?: 'top' | 'bottom' | 'left' | 'right';
    offset?: number;
    Handler: JSX.Element;
    Content: JSX.Element;
    open?: boolean;
    setOpen: (open: boolean) => void;
    className?: string;
}

export const SpeedDial3: React.FC<SpeedDialProps> = ({ placement = 'top', Handler, Content, open, setOpen, className }) => {

    const size = '16'
    const sizeW = `h-${size} w-${size}`;

    return (
        <div className={`${sizeW} ${className} relative `}>
            <div onMouseEnter={() => setOpen && setOpen(!open)}
                className=' absolute flex !flex-1 '>
                {Handler}

                {open && (
                    <div
                        onMouseLeave={() => setOpen && setOpen(false)}
                        className={`
                            absolute -left-1 w-full 
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

export const SpeedDial: React.FC<SpeedDialProps> = ({ placement = 'top', Handler, Content, open, setOpen, className }) => {

    return (
        <>
            <div onMouseEnter={() => setOpen && setOpen(true)}

                className={' slide !relative !z-[99999]' + ` ${className}`}>
                <Popover
                    onOpenChange={(value) => setOpen(typeof value === 'function' ? value(open!) : value)}
                    open={open} >
                    <Popover.Trigger className=''>
                        {Handler}
                    </Popover.Trigger>
                    <Popover.Content
                        onMouseLeave={() => setOpen && setOpen(false)}
                        className='flex flex-1 backdropBlur !z-[99999] !bg-transparent  border-0 shadow-none h-max w-max'>
                        <div className={`${placement !== 'top' ? 'top-0' : 'bottom-0'} !absolute !z-[99999] -mr-2 -right-[50%] slide `}>
                            {Content}
                        </div>
                    </Popover.Content >
                </Popover >
            </div >

        </>
    )
}