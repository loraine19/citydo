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
}
export function Select({ formik, setValue, value, name, placeholder, disabled, options, simple }: SelectProps) {

    const { color } = useUxStore(state => state)
    const find = options?.filter(option => option?.value === formik?.values[name ?? '']?.toString() || option?.value === value?.toString())
    const place = (formik?.errors[name ?? ''] && !simple) && formik.errors[name ?? ''] || find?.[0]?.label || placeholder

    const className =
        simple ? `capitaliz inputStandart ${formik?.errors[name ?? ''] ? 'error ' : ``} ` :
            `inputDiv ${formik?.errors[name ?? ''] ? 'error !bg-red-100' : `${color}Style`} `

    return (
        <>
            <SelectMT
                isError={!!formik?.errors[name ?? '']}
                defaultValue={value}
                disabled={disabled}
                name={name}
                value={value}
                onValueChange={(val) => {
                    formik && formik.setFieldValue(name, val)
                    setValue && setValue(val)
                }}>
                <SelectMT.Trigger
                    placeholder={place}
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

