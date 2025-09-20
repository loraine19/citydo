import { useUxStore } from "../../../../application/stores/ux.store";
import { InputError } from "./input";
import { Icon } from "../IconComp";
import { Menu, MenuItem } from "../../shared/base/baseComps/Menu";

interface SelectProps {
    formik?: any;
    setValue?: (value: string) => void;
    value?: string;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    options: { label: string, value: string }[],
    simple?: boolean;
    onChangeFunction?: () => void;
}

export function Select({
    formik,
    setValue,
    value,
    name,
    placeholder,
    disabled,
    options,
    simple,
    onChangeFunction
}: SelectProps) {
    const { color } = useUxStore(state => state);

    const error = formik?.errors[name ?? ''];
    const selected = options.find(opt => opt.value === (formik?.values[name ?? ''] ?? value));
    const displayLabel = selected?.label || placeholder;

    const handleSelect = (option: { label: string, value: string }) => {
        if (formik) formik.setFieldValue(name, option.value);
        setValue && setValue(option.value);
        onChangeFunction && onChangeFunction();
    };

    return (
        <div className="flex-1">
            <div className={`w-full relative`}>
                <div
                    className={`flex items-center rounded-full md3-button-${error ? 'error' : color} md3-button-${simple ? 'text' : 'tonal'} !px-[1rem] !min-h-[42px] gap-2 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    <div className={`flex-1 flex w-full px-1 truncate`}>
                        {error ?? displayLabel}
                    </div>
                    <Menu
                        key={'select-menu' + (color)}
                        closeIcon={<></>}
                        className="mt-2 w-max"
                        blurBack

                        placement="bottom-left"
                        trigger={
                            <Icon
                                icon="arrow_drop_down"
                                size='2xl' />
                        }
                        title={placeholder}
                    >
                        {options.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                                onClick={() => handleSelect(option)}
                                trailingIcon={selected?.value === option.value ? (
                                    <Icon style='-mr-1' color={color ?? 'slate'} size="lg" icon="check" />
                                ) : <div className="w-3" />}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </div>
            {simple && (
                <InputError mt error={error} tips={placeholder} />
            )}
        </div >

    );
}
