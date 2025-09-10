import { Input, Menu, MenuTrigger, MenuItem, MenuContent } from "@material-tailwind/react";
import { Label } from "../../../domain/entities/frontEntities";
import { Icon } from "./IconComp";
import { useUxStore } from "../../../application/stores/ux.store";

type selectSearchProps = {
    searchCat: Label;
    setSearchCat: any;
    category: Label[]
    search: (label: Label) => void
    style?: string;
};

export default function SelectSearch(props: selectSearchProps) {
    const { color } = useUxStore((state) => state);
    const { searchCat, setSearchCat, category, search, style = '' } = props
    return (
        <div className={`w-full  pb-2 ${style}`} >
            <div className={`"flex inputDiv md3-${color}-container !min-h-[40px] !border-none `} >
                <Menu placement="bottom-start">
                    <MenuTrigger
                        className={category.length > 0 ? 'px-2' : 'invisible w-0'}>
                        <div className="flex">
                            <Icon
                                clear color={color ?? 'slate'}
                                data-cy="select"
                                icon="arrow_drop_down"
                                size='2xl' />
                        </div>
                    </MenuTrigger>
                    <MenuContent className="border-0 -ml-4">
                        <div className="flex w-respLarge shadow-xl bg-white !rounded-3xl gap-2 p-4 flex-col mt-1 -ml-8">
                            {category.map((label: any, index: number) => {
                                return (
                                    <MenuItem
                                        data-cy={label.value}
                                        key={index}
                                        value={label.value}
                                        className="flex items-center gap-2 !capitalize hover:font-medium hover:bg-slate-200 pr-4 !rounded-full InputDiv font-normal font-roboto "
                                        onClick={() => {
                                            setSearchCat(label);
                                            search(label)
                                        }} >
                                        {label.label}
                                    </MenuItem>
                                );
                            })}
                        </div>
                    </MenuContent>
                </Menu>
                <Input
                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                        e.stopPropagation();
                        setSearchCat({ label: '', value: null })
                    }}
                    data-cy="input-search"
                    type="search"
                    placeholder="Rechercher"
                    className={`${color}Style !bg-transparent border-none hover:ring-0 hover:shadow-none focus:backdrop-brightness-90  pb-0 pt-0.5 rounded-full focus:shadow-none focus:ring-0 shadow-none `}
                    key={searchCat.value}
                    value={searchCat.label}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchCat({ label: e.target.value, value: null })
                    }}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && search(searchCat)}
                    autoComplete="on" />
                <Icon
                    onClick={() => search(searchCat)}
                    style='pr-2'
                    color={color ?? 'slate'}
                    size="md"
                    icon="search" />
            </div>
        </div>
    );
}
