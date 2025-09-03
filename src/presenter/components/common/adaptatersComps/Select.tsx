import { Select as SelectMT } from "@material-tailwind/react"
import { useUxStore } from "../../../../application/stores/ux.store";
import { InputError } from "./input";


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
export function Select({ formik, setValue, value, name, placeholder, disabled, options, simple, onChangeFunction }: SelectProps) {

    const { color } = useUxStore(state => state)


    const className =
        simple ? `capitaliz inputStandart ${formik?.errors[name ?? ''] ? 'error ' : ``} ` :
            `inputDiv ${formik?.errors[name ?? ''] ? 'error !bg-red-100' : `${color}Style`} `

    const find = (value: string, formik: any): string => { return options?.filter(option => option?.value === formik?.values[name ?? '']?.toString() || option?.value === value?.toString())[0]?.label }
    const place = (value: string, formik: any): string => (formik?.errors[name ?? ''] && !simple) && formik.errors[name ?? ''] || find(value, formik) || placeholder

    return (
        <>
            <SelectMT
                key={name}
                isError={!!formik?.errors[name ?? '']}
                defaultValue={value}
                disabled={disabled}
                name={name}
                value={value}
                onValueChange={(val) => {
                    formik && formik.setFieldValue(name, val);
                    onChangeFunction && onChangeFunction();
                    setValue && setValue(val)
                }}>
                <SelectMT.Trigger
                    value={value ?? ''}
                    placeholder={place(value ?? '', formik)}
                    className={className} />
                <SelectMT.List>
                    {options?.map((option: { label: string, value: string }) => (
                        <SelectMT.Option
                            key={option.value}
                            value={option.value}>
                            {option.label}
                        </SelectMT.Option>
                    ))}
                </SelectMT.List>
            </SelectMT>
            {simple &&
                <InputError mt error={formik?.errors[name ?? '']}
                    tips={placeholder} />
            }
        </>
    )
}

