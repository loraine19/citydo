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
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
    orientation = "horizontal",
    options,
    value,
    onChange,
    disabled = false,
    className = "",
    formik,
    name
}) => {
    const { color } = useUxStore(state => state)
    return (
        <div className={`flex ${orientation === "horizontal" ? "flex-row gap-4" : "flex-col gap-2"} ${className}`}>
            {options.map((option) => (
                <div
                    key={option.value}
                    className={`${option.color ?? color}Style inputDiv flex items-center flex-1 gap-2`}
                >
                    <div className="relative flex items-center justify-center  h-7 w-7">
                        <Icon
                            size='xl'
                            color={option.color ?? color}
                            fill={value === option.value}
                            style={`${value === option.value ? '' : '!opacity-40'} relative -left-2 top-0 scale-[1.05]`}
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
                                formik.setFieldValue('typeS', option.value);
                                formik.setFieldTouched('typeS', true);
                            }}
                            className={` !opacity-0 -left-8 relative !scale-[1.9]`}
                        />

                    </div>
                    <label htmlFor={option.id}
                        className={`text-sm font-normal relative -left-4 text-${option.color ?? color}-600 ${value === option.value ? '' : 'opacity-60'}`}>
                        {option.label}
                    </label>
                </div>
            ))}
        </div>)
}

