import { Label } from "../../../../domain/entities/frontEntities";
import { Icon } from "../IconComp";
import { useUxStore } from "../../../../application/stores/ux.store";
import { Menu, MenuItem } from "../../shared/base/baseComps/Menu";
import { useState } from "react";

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
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`w-full relative  ${style} `} >
            <div className={`flex items-center rounded-full md3-button-${color} md3-button-${'tonal'} !pr-[3px] pl-3 !h-[2.75rem] gap-2 `} >
                <Menu
                    key={'select-menu' + (color)}
                    blurBack
                    title="Catégorie"
                    className="mt-3 -ml-3"
                    open={isOpen}
                    setOpen={setIsOpen}
                    placement="bottom-right"
                    trigger={
                        <div className={category.length > 0 ? '' : 'invisible w-0'}>
                            <div className="flex">
                                <Icon
                                    data-cy="select"
                                    icon="arrow_drop_down"
                                    size='2xl' />
                            </div>
                        </div>}>

                    {category.map((label: any, index: number) => {
                        return (
                            <MenuItem
                                trailingIcon={searchCat.value === label.value ?
                                    <Icon

                                        style='-mr-1'
                                        color={color ?? 'slate'}
                                        size={"lg"}
                                        icon={'check'} /> : <div className="w-3" />}
                                data-cy={label.value}
                                key={index}
                                value={label.value}

                                onClick={() => {
                                    setSearchCat(label);
                                    search(label)
                                    setIsOpen(false);
                                }} >
                                {label.label}
                            </MenuItem>
                        );
                    })}
                </Menu>
                <input
                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                        e.stopPropagation();
                        setSearchCat({ label: '', value: null })
                    }}
                    data-cy="input-search"
                    type="search"
                    placeholder="Rechercher"
                    className={`md3-${color}-container hover:brightness-90 focus:brightness-80 pb-0 pt-0.5 rounded-full min-h-9 px-4 w-full placeholder:!text-current`}
                    key={searchCat.value}
                    value={searchCat.label}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchCat({ label: e.target.value, value: null })
                    }}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && search(searchCat)}
                    autoComplete="on" />
                <div>
                    <Icon
                        bg
                        reverse
                        color={color ?? 'slate'}
                        onClick={() => search(searchCat)}
                        size="lg"
                        icon="search" />
                </div>
            </div>
        </div>
    );
}
