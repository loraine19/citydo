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
        simple ? `capitaliz inputStandart !shadow-none ${formik?.errors[name ?? ''] ? 'error ' : ``} ` :
            ` flex-1 !truncate line-clamp-1 !leading-[0.85rem] InputDiv !h-[2.2rem]  !whitespace-break-spaces inputDiv ${formik?.errors[name ?? ''] ? 'error !bg-red-100' : ` ${color}Style `} `

    const find = (value: string, formik: any): string => { return options?.filter(option => option?.value === formik?.values[name ?? '']?.toString() || option?.value === value?.toString())[0]?.label }
    const place = (value: string, formik: any): string => (formik?.errors[name ?? ''] && !simple) && formik.errors[name ?? ''] || find(value, formik) || placeholder

    return (
        <>
            <div className="flex-1">
                <SelectMT
                    isPill={true}
                    ripple={false}
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
                    <div className="flex w-full flex-1 justify-center relative">
                        <SelectMT.List className="absolute max-w-[90%] z-50 left-0 rounded-3xl gap-1 px-4 py-3 !shadow">
                            {options?.map((option: { label: string, value: string }) => (
                                <SelectMT.Option
                                    className="!capitalize rounded-3xl !px-4 text-left !py-2 max-w-full flex items-center !whitespace-break-spaces"
                                    key={option.value}
                                    value={option.value}>
                                    {option.label}
                                </SelectMT.Option>
                            ))}
                        </SelectMT.List>
                    </div>
                </SelectMT>
                {simple &&
                    <InputError mt error={formik?.errors[name ?? '']}
                        tips={placeholder} />

                }
            </div>
        </>
    )
}

