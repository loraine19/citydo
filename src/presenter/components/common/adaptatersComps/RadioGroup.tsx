import React from "react";
import { useUxStore } from "../../../../application/stores/ux.store";
import { Icon } from "../IconComp";

type RadioOption = {
    id: string;
    label: string;
    value: string;
    color?: string;
};

type RadioGroupProps = {
    orientation?: "horizontal" | "vertical";
    options: RadioOption[];
    value: string;
    setValue?: (value: string | any) => void;
    onChangeProps?: (value: string) => void;
    disabled?: boolean;
    className?: string;
    formik?: any;
    name?: string;
    variant?: 'filled' | 'tonal' | 'text' | 'Input';
    size?: 'sm' | 'md' | 'lg';
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
    orientation = "horizontal",
    options,
    value,
    setValue,
    onChangeProps,
    disabled = false,
    className = "",
    formik,
    name,
    variant,
    size
}) => {
    const { color } = useUxStore(state => state)
    const classVariant = variant === 'Input' ?
        ' max-h-[2.7rem] max-w-max !py-2 md3-input-container md3-outlined !rounded-md' :
        `md3-button-${variant === 'text' ? 'text' : 'tonal'}`;
    return (
        <div className={`flex md3-input-size-${size ?? 'md'} 
        ${orientation === "horizontal" ? "flex-row gap-2" : "flex-col gap-2"} 
      
        ${className} ${classVariant}`}>
            {options.map((option) => (
                <div key={option.value} className={`px-4 !pr-2 flex items-center gap-2 flex-1 `} >
                    <div className="relative flex items-center justify-center  ">
                        <Icon
                            reverse
                            size='2xl'
                            color={option?.color ?? color}
                            fill={false}
                            style={`${value === option.value ? '!cursor-pointer' : ''} relative -left-0.5 top-0  `}
                            icon={(value === option.value) ? 'radio_button_checked' : 'radio_button_unchecked'}
                        />
                        <input
                            type="radio"
                            id={option.id}
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            disabled={disabled}
                            onChange={(value) => {
                                onChangeProps && onChangeProps(option.value);
                                setValue && setValue(value);
                                formik && formik.setFieldValue(name, option.value);
                                formik && formik.setFieldTouched(name, true);
                            }}
                            className={`!cursor-pointer !opacity-0 -left-6 relative !scale-[1.9]`}
                        />

                    </div>
                    <label htmlFor={option.id}
                        className={` md3-card-supporting-text relative -left-4 !px-0
                        ${value === option.value ? '' : 'opacity-80'}`}>
                        {option.label}
                    </label>
                </div>
            ))}
        </div>)
}

