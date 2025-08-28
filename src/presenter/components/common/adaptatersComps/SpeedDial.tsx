import { Dialog, Popover } from '@material-tailwind/react';
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

export const SpeedDial3: React.FC<SpeedDialProps> = ({ placement = 'top', Handler, Content, open, setOpen, className }) => {

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

export const SpeedDial: React.FC<SpeedDialProps> = ({ placement = 'top', Handler, Content, open, className }) => {

    return (
        <>
            {/* {open &&
                <div className={` 
                ${placement !== 'top' ?
                        'top-[calc(65px)]  right-0 w-[calc(100vw)] h-[calc((100vh-65px)/0.75)]' :
                        ' -translate-y-[50%] -top-[calc(50vh)] w-[100vw] h-[100vh] left-[50%]  -translate-x-[50%]  '} 
                            backdropBlur bg-black/20 border-red-900   !z-0  fixed `}>
                </div>} */}
            <div className={'!relative !z-[99999]' + ` ${className}`}>
                <Popover open={open} >
                    <Popover.Trigger className=''>
                        {Handler}
                    </Popover.Trigger>
                    <Popover.Content className='flex flex-1 backdropBlur !z-[99999] !bg-transparent  border-0 shadow-none h-max w-max'>
                        <div className={`${placement !== 'top' ? 'top-0' : 'bottom-0'} !absolute !z-[99999] -mr-2 -right-[50%]  `}>
                            {Content}
                        </div>
                    </Popover.Content >
                </Popover >
            </div >

        </>
    )
}
