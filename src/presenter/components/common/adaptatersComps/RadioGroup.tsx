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
    onChange: (value: string) => void;
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
    onChange,
    disabled = false,
    className = "",
    formik,
    name,
    variant,
    size
}) => {
    const { color } = useUxStore(state => state)
    const classVariant = variant === 'Input' ? ' max-h-[2.7rem] max-w-max !py-0 md3-input-container md3-outlined !rounded-md' : `md3-button-${variant === 'text' ? 'text' : 'tonal'}`;
    return (
        <div className={`flex md3-input-size-${size ?? 'md'} ${orientation === "horizontal" ? "flex-row gap-2" : "flex-col gap-2"} ${className} ${classVariant}`}>
            {options.map((option) => (
                <div
                    key={option.value}
                    className={`  px-4 !pr-2 flex items-center flex-1 `}
                >
                    <div className="relative flex items-center justify-center  ">
                        <Icon
                            size='xl'
                            color={option.color ?? color}
                            fill={value === option.value}
                            style={`${value === option.value ? '' : '!opacity-50'} relative -left-1.5 top-0 scale-[1.05]`}
                            icon={value === option.value ? 'check_circle' : 'circle'}
                        />
                        <input
                            type="radio"
                            id={option.id}
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            disabled={disabled}
                            onChange={() => {
                                onChange(option.value);
                                formik.setFieldValue(name, option.value);
                                formik.setFieldTouched(name, true);
                            }}
                            className={` !opacity-0 -left-8 relative !scale-[1.9]`}
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

