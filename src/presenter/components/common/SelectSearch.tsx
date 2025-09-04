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
        <div className={` w-full pt-0.5 ${style}`} >
            <div className={`"flex inputDiv ${color}Style `} >
                <Menu placement="bottom-start">
                    <MenuTrigger
                        className={category.length > 0 ? 'px-2' : 'invisible'}>
                        <div className="flex">
                            <Icon
                                clear color={color ?? 'slate'}
                                data-cy="select"
                                icon="arrow_drop_down"
                                size='2xl' />
                        </div>
                    </MenuTrigger>
                    <MenuContent className="flex bg-white  flex-col">
                        {category.map((label: any, index: number) => {
                            return (
                                <MenuItem
                                    data-cy={label.value}
                                    key={index}
                                    value={label.value}
                                    className="flex items-center gap-2 !capitalize font-medium hover:bg-slate-50 px-4 "
                                    onClick={() => {
                                        setSearchCat(label);
                                        search(label)
                                    }} >
                                    {label.label}
                                </MenuItem>
                            );
                        })}
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
                    className={` !text-${color}-600 bg-none border-none hover:ring-0 hover:shadow-none focus:bg-slate-200 pb-0 pt-0.5 rounded-full focus:shadow-none focus:ring-0 shadow-none `}
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
