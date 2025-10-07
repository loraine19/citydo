import { useUxStore } from "../../../../application/stores/ux.store";
import { InputError } from "./input";
import { Icon } from "../IconComp";
import { Menu, MenuItem } from "../../shared/base/baseComps/Menu";
import { useState } from "react";

interface SelectProps {
    formik?: any;
    setValue?: (value: string) => void;
    value?: string;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    options: { label: string | React.ReactNode, value: string }[],
    variant?: 'filled' | 'tonal' | 'text' | 'Input';
    onChangeFunction?: (() => void) | ((e: any) => void);
    bgColor?: string;
}

interface MultiSelectProps extends Omit<SelectProps, 'value' | 'setValue'> {
    value?: string[];
    setValue?: (value: string[]) => void;
}

export function Select({
    formik,
    setValue,
    value,
    name,
    placeholder,
    disabled,
    options,
    variant,
    onChangeFunction,
    bgColor
}: SelectProps) {
    const { color } = useUxStore(state => state);
    const error = formik?.errors[name ?? ''];
    const selected = options?.find(opt => opt.value === ((formik?.values?.[name ?? ''] || value)));
    const displayLabel = selected?.label || placeholder;
    const className = variant === 'Input' ? `md3-input-container md3-outlined  !rounded-md md3-input-size-lg ` : `md3-button-${variant === 'text' ? 'text' : 'tonal'}`;

    const handleSelect = (option: { label: string | React.ReactNode, value: string }) => {
        onChangeFunction && onChangeFunction(value);
        if (formik) formik.setFieldValue(name, option?.value);
        setValue && setValue(option?.value);

    };

    const [open, setOpen] = useState(false)

    return (
        <div className={`flex-1 relative ${variant === 'Input' ? ' !font-roboto' : ''}`}>
            <div className={`w-full relative`}>
                <div className={` !relative flex items-center rounded-full md3-button-${error ? 'error' : color} 
                ${className} !px-[1rem] !min-h-[42px] gap-2 
                ${displayLabel ? 'active border-2' : ''}
                ${disabled ? 'opacity-50 pointer-events-none' : ''}`} >

                    <Menu
                        fitMax
                        open={open}
                        setOpen={setOpen}
                        MenuKey={'select-menu' + (color)}
                        closeIcon={<></>}
                        className=''
                        containerClassName="w-full"
                        blurBack
                        placement="auto"
                        trigger={
                            <div className="flex items-center justify-between flex-1 w-full">
                                <div className={`${variant === 'Input' ? '' : ''} 
                        flex-1 flex w-full px-1 py-3 truncate`}>
                                    {(error && variant === 'Input') ? placeholder : displayLabel}
                                </div>
                                <Icon
                                    icon="arrow_drop_down"
                                    size='2xl' />
                            </div>
                        }
                        title={placeholder}
                    >
                        {options?.map((option) => (
                            <MenuItem
                                key={option?.value}
                                value={option?.value}
                                onClick={() => {
                                    handleSelect(option);
                                    setOpen(false)
                                }}
                                trailingIcon={selected?.value === option?.value ? (
                                    <Icon style='-mr-1' color={color ?? 'slate'} size="lg" icon="check" />
                                ) : <div className="w-3" />}
                            >
                                {option?.label}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </div>
            {displayLabel && variant === 'Input' && !error && placeholder !== displayLabel &&
                <InputError
                    style={`absolute mx-2 px-1 h-max pb-1 top-1 -mt-1 !z-[999] rounded bg-[${bgColor ?? 'var(--md3-surface)'}]`}
                    tips={placeholder} />}
            {variant === 'Input' &&
                <InputError
                    style="mt-1"
                    error={error} />}
        </div >

    );
}

// MultiSelect component
export function MultiSelect({
    formik,
    setValue,
    value = [],
    name,
    placeholder,
    disabled,
    options,
    variant,
    onChangeFunction
}: MultiSelectProps) {
    const { color } = useUxStore(state => state);

    const error = formik?.errors[name ?? ''];
    const selectedValues: string[] = formik?.values?.[name ?? ''] ?? value;
    const selectedOptions = options.filter(opt => selectedValues.includes(opt.value));
    const displayLabel = selectedOptions.length
        ? selectedOptions.map(opt => opt.label).join(', ')
        : placeholder;
    const className = variant === 'Input' ?
        `md3-input md3-input-size-lg md3-outlined active md3-input-container !rounded-md  ` :
        `md3-button-${variant === 'text' ? 'text' : 'tonal'}`;

    const handleSelect = (option: { label: string | React.ReactNode, value: string }) => {
        let newValues: string[];
        if (selectedValues.includes(option.value)) {
            newValues = selectedValues.filter(v => v !== option.value);
        } else {
            newValues = [...selectedValues, option.value];
        }
        if (formik) formik.setFieldValue(name, newValues);
        setValue && setValue(newValues);
        onChangeFunction && onChangeFunction(newValues);
    };

    const [open, setOpen] = useState(false)

    return (
        <>
            <div className={`flex-1 relative ${variant === 'Input' ? ' !font-roboto' : ''}`}>
                <div className={`w-full relative`}>
                    <div className={`flex items-center rounded-full md3-button-${error ? 'error' : color} 
                        ${className}  !px-[1rem] !min-h-[42px] gap-2 
                          ${displayLabel ? 'active border-2' : ''}
                        ${disabled ? 'opacity-50 pointer-events-none' : ''}`} >

                        <div className={` flex-1 flex w-full py-3 px-1 truncate`}>
                            {(error && variant === 'Input') ? placeholder : displayLabel}
                        </div>

                        <Menu
                            open={open && (selectedValues === value)}
                            setOpen={setOpen}
                            MenuKey={'multiselect-menu' + (color)}
                            closeIcon={<></>}
                            className="mt-2 w-max"
                            blurBack
                            placement="bottom-left"
                            trigger={
                                <Icon
                                    icon="arrow_drop_down"
                                    size='2xl' />
                            }
                            title={placeholder} >
                            {options?.map((option) => (
                                <MenuItem
                                    key={option?.value}
                                    value={option?.value}
                                    onClick={() =>
                                        handleSelect(option)}
                                    trailingIcon={selectedValues.includes(option?.value) ? (
                                        <Icon
                                            style='-mr-1'
                                            color={color ?? 'slate'}
                                            size="lg"
                                            icon="check" />
                                    ) : <div className="w-3" />}
                                >
                                    {option?.label}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                </div>
                {variant === 'Input' &&
                    <InputError
                        style="absolute mx-2 px-1 top-1 -mt-1 !z-[999] bg-[var(--md3-primary-container)]"
                        error={error}
                        tips={placeholder} />}
            </div>

        </>
    );
}
