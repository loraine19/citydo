import React, { useState, ChangeEvent } from 'react';

type SliderSize = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large';
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
    xxsmall: { trackHeight: '6px', textSize: 'text-xs' },
    xsmall: { trackHeight: '10px', textSize: 'text-sm' },
    small: { trackHeight: '14px', textSize: 'text-base' },
    medium: { trackHeight: '16px', textSize: 'text-lg' },
    large: { trackHeight: '20px', textSize: 'text-xl' },
};

const wavySizeMap = {
    xxsmall: {
        decoration: 'decoration-[6px] ',
        height: 'h-[33px] ',
        dotSize: 'h-[11.5px] w-[5px] -right-[3px] -bottom-[5px]',
        dot2Size: 'h-[10px] w-[5px] -left-[3px] -bottom-[5px] rotate-45',
        endIndicator: 'h-[5px] w-[4px] mr-[1px] mb-[0px]',
    },
    xsmall: {
        decoration: 'decoration-[10px] ',
        height: 'h-[48px] ',
        dotSize: 'h-[18px] w-[8.5px] -right-[4px] -bottom-[8.5px]',
        dot2Size: 'h-[15px] w-[8px] -left-[4.5px] -bottom-[7.5px] rotate-45',
        endIndicator: 'h-[6px] w-[6px] mr-[2.5px] mb-[0px]',
    },
    small: {
        decoration: 'decoration-[14px]',
        height: 'h-[58px]',
        dotSize: 'h-[25.5px] w-[9px] -right-[4.5px] -bottom-[11px] ',
        dot2Size: 'h-[24px] w-[10.5px] -left-[3px] -bottom-[10px] rotate-[50deg] ',
        endIndicator: 'h-[8px] w-[8px] mr-[3px] mb-[0.5px]',
    },
    medium: {
        decoration: 'decoration-[16px]',
        height: 'h-[65px]',
        dotSize: 'h-[30px] w-[12px] -right-[5px] -bottom-[12.5px] ',
        dot2Size: 'h-[20px] w-[12.5px] -left-[5px] -bottom-[7px] rotate-[50deg]',
        endIndicator: 'h-[10px] w-[10px] mr-[4px] -bottom-[2px]',
    },
    large: {
        decoration: 'decoration-[20px]',
        height: 'h-[76px]',
        dotSize: 'h-[36px] w-[14.5px] -right-[7px] -bottom-[17px] ',
        dot2Size: 'h-[30px] w-[16px] -left-[5.5px] -bottom-[12px] rotate-[50deg] ',
        endIndicator: 'h-[12px] w-[12px] mr-[4px] -bottom-[4px]',
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
    const endIndicator = wavySizeMap[size]?.endIndicator || wavySizeMap['medium'].endIndicator;

    const line = ['&nbsp;']
    for (let i = 0; i < percent / 22; i++) {
        line.push('&nbsp;')
    }

    return (
        <>
            <div className='-ml-4 -mr-2 pb-1'>{label}</div>
            <div className={`${variant === 'wavy' ? '-ml-[4px] pl-[12.5px] ' : ''} relative w-full`}>

                <div className={`md3-progressbar-container 
                    ${className}  ${sizeMapProgressBar[size]?.textSize}`}
                    style={{ ...style }}
                    data-variant={variant}
                    data-md3 >

                    {variant === 'wavy' &&
                        <>  <div className={` absolute z-0 md3-progressbar-track-active-wavy `}
                            style={{ width: `${percent}%` }}>
                            <div className={` ${mainColor} ${wavySizeMap[size].dot2Size} 
                     absolute rounded-full  `} />
                            <div className={` ${mainColor} ${wavySizeMap[size].dotSize} 
                     absolute rounded-full  `} />
                        </div>
                            <div className={` md3-progressbar-track-active-wavy 
                        absolute left-0 flex w-full underline underline-offset-1 whitespace-nowrap overflow-hidden decoration-wavy animate-wavy 
                            ${wavySizeMap[size].decoration}
                            ${wavySizeMap[size].height} `}

                                style={{ width: `${percent}%`, color: customColor || `var(--md3-${color})` || 'var(--md3-primary)' }}>

                                {line.map((_) => (
                                    <span className='w-full flex -scale-y-[0.65] !font-comfortaa  h-full text-transparent '  >
                                        _______________________________________________________________________________________________
                                    </span>
                                ))}

                            </div>

                        </>
                    }


                    {/*  TRACKS */}
                    <div className={`md3-progressbar-tracks relative gap-3 !flex  h-full !w-full `}
                        style={{ height: trackHeight }}>
                        {/* ACTIVE TRACK */}

                        <div className={` ${mainColor}  flex relative ${variant === 'wavy' ? ' bg-transparent' : 'md3-progressbar-track-active '} }`}
                            style={{ width: `${percent}%` }} />
                        {/* INACTIVE TRACK */}
                        <div className={`md3-progressbar-track-inactive flex-1 ${inactiveColor}`}>


                            {/* Dot at the end of inactive tracker */}
                            {percent < 100 && (
                                <span className={`md3-progressbar-dot 
                                    ${endIndicator} ${mainColor} rounded-full  `}
                                />
                            )}
                        </div>
                    </div >
                </div>

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


