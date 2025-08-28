import { Select } from "@material-tailwind/react";
import { Label } from "../../../domain/entities/frontEntities";

type categoriesSelectProps = {
    categoriesArray: string[] | Label[];
    change: (e: any) => void;
    categorySelected?: string;
    disabled?: boolean;
    label?: string;
};
export function CategoriesSelect(props: categoriesSelectProps) {
    const { categoriesArray, change, categorySelected, disabled, label } =
        props;

    return (
        <div className="w-full px-4">
            <Select
                size="md"
                name={"categories"}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    change(e);
                }}
                value={categorySelected}
                disabled={disabled}  >
                <Select.Trigger
                    className="inputDiv "
                    placeholder={label} />
                <Select.List>
                    {categoriesArray.map((category: any, key: number) => {
                        return (
                            <Select.Option
                                data-cy={typeof category === "string" ? category : category.label}
                                className="rounded-full my-1 capitalize "
                                value={typeof category === "string" ? category : category.value}
                                key={key} >
                                {typeof category === "string" ? category : category.label}
                            </Select.Option>
                        );
                    })}
                </Select.List>
            </Select>
        </div >
    );
}
