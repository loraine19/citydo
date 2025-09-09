import React, { useState, ChangeEvent } from 'react';

type SliderSize = 'xsmall' | 'small' | 'medium' | 'large';
type SliderColor = 'primary' | 'secondary' | 'tertiary' | 'error' | 'sky' | 'cyan' | 'rose' | 'orange' | 'green';

export interface SliderProps {
    value: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    min?: number;
    max?: number;
    size?: SliderSize;
    color?: SliderColor;
    customColor?: string; // for custom color
    className?: string;
    style?: React.CSSProperties;
    id?: string;
}

const sizeMap = {
    xxxsmall: { trackHeight: '0.5rem', textSize: 'text-xs' },         // ~8px
    xxsmall: { trackHeight: '0.75rem', textSize: 'text-sm' },     // ~12px (
    xsmall: { trackHeight: '1rem', textSize: 'text-base' },           // ~16px
    small: { trackHeight: '1.5rem', textSize: 'text-lg' },         // ~24px
    medium: { trackHeight: '2rem', textSize: 'text-xl' },
    large: { trackHeight: '3rem', textSize: 'text-2xl' },
    // ~32px
};


export const Slider: React.FC<SliderProps> = ({
    value,
    onChange,
    min = 0,
    max = 100,
    size = 'medium',
    color = 'primary',
    customColor,
    className,
    id
}) => {
    const [active, setActive] = useState((value / max) * 100);

    const onChangeSlider = (e: ChangeEvent<HTMLInputElement>) => {
        setActive((e.target.valueAsNumber / max) * 100);
        onChange(e);
    };



    const trackHeight = sizeMap[size].trackHeight;
    const mainColor = customColor || ` md3-${color} ` || ' bg-primary ';
    const inactiveColor = ` md3-${color}-container ` || ' bg-primary-container ';

    return (

        // CONTAINER 
        <div className={`md3-slider-container ${className} ${sizeMap[size].textSize}`} data-md3  >
            {/* TRACKLINE */}
            <div className={`md3-slider-track`} style={{ height: trackHeight }} >
                {/* ACTIVE BG LINE */}
                <div className={`md3-slider-track-active ${mainColor} `}
                    style={{ width: `${active}%` }} >
                    {value > min && min}
                    <span className='px-2'>
                        {value > min ? value : ''}
                    </span>
                </div>
                {/* THUMB */}
                <div className="flex h-full px-1.5 items-center justify-center">
                    <span className={`md3-slider-thumb ${mainColor} `} />
                </div>
                {/* INPUT HIDDEN */}
                <input
                    id={id}
                    name={id}
                    type="range"
                    className={`md3-slider`}
                    min={min}
                    max={max}
                    value={value}
                    onChange={onChangeSlider}

                />
                {/* INACTIVE BG LINE */}
                <div className={` md3-slider-track-inactive ${inactiveColor} `}
                    style={{ width: `${100 - active}%` }} >
                    <span className='px-2'>
                        {value === min ? value : ''}
                    </span>
                    {value < max && max}
                </div>
            </div>
        </div>
    );
};

export default Slider;


export interface ProgressBarProps {
    value: number;
    min?: number;
    max?: number;
    size?: SliderSize;
    color?: SliderColor;
    customColor?: string;
    className?: string;
    style?: React.CSSProperties;
    label?: React.ReactNode;
    variant?: 'linear' | 'wavy';
}

const sizeMapProgressBar = {
    xsmall: { trackHeight: '0.6rem', textSize: 'text-sm' },
    small: { trackHeight: '0.75rem', textSize: 'text-base' },
    medium: { trackHeight: '1rem', textSize: 'text-lg' },
    large: { trackHeight: '1.25rem', textSize: 'text-xl' },
};

const wavySizeMap = {
    xsmall: {
        decoration: 'decoration-[7px] ',
        height: 'h-[44px]',
        dotSize: 'h-[20px] w-[6px] -right-[3px] -bottom-[6px]',
        dot2Size: 'h-[16px] w-[7px] -left-[3px] -bottom-[3px]',
    },
    small: {
        decoration: 'decoration-[9px]',
        height: 'h-[57px]',
        dotSize: 'h-[27px] w-[8px] -right-[3px] -bottom-[7px] ',
        dot2Size: 'h-[20px] w-[9px] -left-[4px] -bottom-[3px] ',
    },
    medium: {
        decoration: 'decoration-[11.5px]',
        height: 'h-[63px]',
        dotSize: 'h-[33px] w-[10px] -right-[3px] -bottom-[8px] ',
        dot2Size: 'h-[25px] w-[11px] -left-[5px] -bottom-[5px] ',
    },
    large: {
        decoration: 'decoration-[17px]',
        height: 'h-[78px]',
        dotSize: 'h-[47px] w-[15px] -right-[7px] -bottom-[13px] ',
        dot2Size: 'h-[29.5px] w-[15px] -left-[7px] -bottom-[5px]  ',
    },
};
export const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    min = 0,
    max = 100,
    size = 'medium',
    color = 'primary',
    customColor,
    className,
    style,
    variant = 'linear',
    label
}) => {
    const percent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
    const trackHeight = sizeMapProgressBar[size]?.trackHeight || sizeMapProgressBar['medium'].trackHeight;
    const mainColor = customColor || `md3-${color}` || 'bg-primary';
    const inactiveColor = `md3-${color}-container` || 'bg-primary-container';

    const line = ['&nbsp;']
    for (let i = 0; i < percent / 22; i++) {
        line.push('&nbsp;')
    }

    return (
        <>{label}
            <div className={`${variant === 'wavy' ? '-ml-[4px] pl-[11px]' : ''} w-full`}>

                <div
                    className={`md3-progressbar-container relative ${className || ''}
                     ${sizeMapProgressBar[size]?.textSize}`}
                    style={{ ...style }}
                    data-variant={variant}
                    data-md3
                >  {variant === 'wavy' &&
                    <div className={` absolute  h-full z-40 `}
                        style={{ width: `${percent}%` }}
                    > <div className={` ${mainColor} ${wavySizeMap[size].dot2Size} 
                     absolute rotate-[-32deg]
                             rounded-full  z-50 `}>

                        </div>
                        <div className={` ${mainColor} ${wavySizeMap[size].dotSize} 
                     absolute      rounded-full  z-50 `}>

                        </div>
                    </div>}
                    {variant === 'wavy' &&
                        <>
                            <div className={` md3-progressbar-track-active-wavy
                        absolute  left-0 flex w-full underline underline-offset-1 whitespace-nowrap overflow-hidden decoration-wavy  z-30 animate-wavy 
                            ${wavySizeMap[size].decoration}
                            ${wavySizeMap[size].height}

                            
                        `}
                                style={{ width: `${percent}%`, color: customColor || `var(--md3-${color})` || 'var(--md3-primary)' }}
                            >
                                {line.map((index) => (
                                    <span
                                        key={index} className='w-full flex h-full text-transparent '  >
                                        ___________________________________________________________
                                    </span>
                                ))}

                            </div>

                        </>
                    }
                    {/* INACTIVE TRACK */}
                    <div className={`md3-progressbar-track`} style={{ height: trackHeight }}>
                        {/* ACTIVE TRACK */}
                        <div className={`-mt-2 ${mainColor} relative ${variant === 'wavy' ? '!bg-transparent h-[120%]' : ''} `} style={{ width: `${percent}%` }} >

                        </div>

                        <div
                            className={`md3-progressbar-track-inactive ${inactiveColor}`}
                            style={{ width: `${100 - percent}%` }}
                        >


                            {/* Dot at the end of inactive tracker */}
                            {percent < 100 && (
                                <span
                                    className={`md3-progressbar-dot  ${mainColor}  h-1 min-w-1 rounded-full  `}
                                />
                            )}
                        </div>
                    </div>
                </div >
            </div>
        </>
    );
};

type ProgressRingProps = {
    value: number;
    min?: number;
    max?: number;
    size?: number; // diameter in px
    color?: SliderColor;
    customColor?: string;
    className?: string;
    style?: React.CSSProperties;
    id?: string;
};




export const ProgressRing: React.FC<ProgressRingProps> = ({
    value,
    min = 0,
    max = 100,
    size = 48,
    color = 'primary',
    customColor,
    className,
    style,
    id
}) => {
    const percent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
    const stroke = 6;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    const mainColor = customColor || `var(--md3-${color})` || 'var(--md3-primary)';
    const inactiveColor = `var(--md3-${color}-container)` || 'var(--md3-primary-container)';

    return (
        <svg
            width={size}
            height={size}
            className={`md3-progressring ${className || ''}`}
            style={style}
            id={id}
        >
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={inactiveColor}
                strokeWidth={stroke}
                fill="none"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={mainColor}
                strokeWidth={stroke}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.35s' }}
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize={size * 0.28}
                fill={mainColor}
            >
                {Math.round(percent)}%
            </text>
        </svg>
    );
};


