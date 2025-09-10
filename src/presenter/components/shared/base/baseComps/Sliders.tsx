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
    xsmall: { trackHeight: '0.7rem', textSize: 'text-sm' },
    small: { trackHeight: '0.85rem', textSize: 'text-base' },
    medium: { trackHeight: '1rem', textSize: 'text-lg' },
    large: { trackHeight: '1.25rem', textSize: 'text-xl' },
};

const wavySizeMap = {
    xsmall: {
        decoration: 'decoration-[12px] ',
        height: 'h-[55px] ',
        dotSize: 'h-[22px] w-[9px] -right-[4px] -bottom-[10.5px]',
        dot2Size: 'h-[15.5px] w-[9.5px] -left-[4px] -bottom-[7.5px] rotate-45',
    },
    small: {
        decoration: 'decoration-[14.5px]',
        height: 'h-[60px]',
        dotSize: 'h-[27px] w-[10px] -right-[4.5px] -bottom-[12.5px] ',
        dot2Size: 'h-[24px] w-[11.5px] -left-[3.5px] -bottom-[9.5px] rotate-[50deg] ',
    },
    medium: {
        decoration: 'decoration-[18px]',
        height: 'h-[70px]',
        dotSize: 'h-[32.5px] w-[13px] -right-[5px] -bottom-[15px] ',
        dot2Size: 'h-[20px] w-[15px] -left-[8px] -bottom-[8.5px] rotate-[50deg]',
    },
    large: {
        decoration: 'decoration-[20px]',
        height: 'h-[79px]',
        dotSize: 'h-[36px] w-[15px] -right-[7px] -bottom-[18px] ',
        dot2Size: 'h-[30px] w-[16.5px] -left-[5.5px] -bottom-[13.5px] rotate-[50deg] ',
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
            <div className={`${variant === 'wavy' ? '-ml-[4px] pl-[12.5px] ' : ''} relative w-full`}>

                <div
                    className={`md3-progressbar-container 
                    ${className}  ${sizeMapProgressBar[size]?.textSize}`}
                    style={{ ...style }}
                    data-variant={variant}
                    data-md3
                >

                    {variant === 'wavy' &&
                        <div className={` absolute z-40 `}
                            style={{ width: `${percent}%` }}
                        > <div className={` ${mainColor} ${wavySizeMap[size].dot2Size} 
                     absolute  rounded-full animate-wavy  z-50 `}>

                            </div>
                            <div className={` ${mainColor} ${wavySizeMap[size].dotSize} 
                     absolute     rounded-full animate-wavy z-50 `}>

                            </div>
                        </div>}
                    {variant === 'wavy' &&
                        <>
                            <div className={` md3-progressbar-track-active-wavy 
                        absolute left-0 flex w-full underline underline-offset-1 whitespace-nowrap overflow-hidden decoration-wavy z-30 animate-wavy 
                            ${wavySizeMap[size].decoration}
                            ${wavySizeMap[size].height}

                            
                        `}
                                style={{ width: `${percent}%`, color: customColor || `var(--md3-${color})` || 'var(--md3-primary)' }}
                            >
                                {line.map((index) => (
                                    <span
                                        key={index} className='w-full flex -scale-y-[0.65] !font-comfortaa  h-full text-transparent '  >
                                        ___________________________________________________________
                                    </span>
                                ))}

                            </div>

                        </>
                    }


                    {/* INACTIVE TRACK */}
                    <div className={`md3-progressbar-track relative gap-3 !flex   h-full !w-full `}
                        style={{ height: trackHeight }}>
                        {/* ACTIVE TRACK */}

                        <div className={`-mt-2 ${mainColor}  flex relative ${variant === 'wavy' ? ' bg-transparent' : 'md3-progressbar-track-active '} }`}
                            style={{ width: `${percent}%` }} />

                        <div className={`md3-progressbar-track-inactive flex-1 ${inactiveColor}`}>


                            {/* Dot at the end of inactive tracker */}
                            {percent < 100 && (
                                <span className={`md3-progressbar-dot ${trackHeight} ${mainColor} h-1 min-w-1 rounded-full  `}
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


