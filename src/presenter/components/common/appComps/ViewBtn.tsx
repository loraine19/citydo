import { Icon, IconName } from "../IconComp";
import { useUxStore } from "../../../../application/stores/ux.store";
import { useState } from "react";
import { Menu, MenuItem } from "../../shared/base/baseComps/Menu";

export type ViewButtonProps = {
    viewList: { key: string, label: string, icon: IconName, action?: () => void }[],
    view: string
}

export const ViewButton = ({ viewList, view }: ViewButtonProps) => {
    const { color } = useUxStore((state) => state);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedView, setSelectedView] = useState<string>(view);

    return (

        <Menu
            MenuKey={'sort-menu' + color}
            className=""
            open={isOpen}
            setOpen={setIsOpen}
            blurBack
            placement="bottom-left"
            title="Changer de vue"
            trigger={
                <Icon
                    fill={true}
                    style=''
                    color={color ?? 'slate'}
                    icon={viewList.find(v => v.key === selectedView)?.icon || "view_agenda" as IconName}
                    size="md"
                />}>


            {viewList.map((item: { key: string, label: string, icon: IconName, action?: () => void }, index: number) =>
                <MenuItem

                    className={`gap-12 px-2`}
                    key={index}
                    data-cy={item.key ?? item.label}
                    onClick={() => {
                        item.action && item.action();
                        setSelectedView(item.key ?? item.label)
                        setIsOpen(!isOpen);
                    }}
                    trailingIcon={


                        <Icon
                            fill={selectedView === (item.key ?? item.label)}
                            size={'lg'}
                            title={'vue ' + item.label}
                            disabled={(selectedView === (item.key ?? item.label))}
                            color={selectedView === (item.key ?? item.label) ? color : 'slate'}
                            icon={item.icon as IconName}
                        />
                    } >
                    {item.label}


                </MenuItem>
            )}
        </Menu>
    )
}