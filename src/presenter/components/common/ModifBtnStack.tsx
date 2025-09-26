import { useEffect, useState } from "react";
import { Action } from "../../../domain/entities/frontEntities";
import { IconName } from "./IconComp";
import { useAlertStore } from "../../../application/stores/alert.store";
import { Button, ButtonGroup } from "../shared/base/baseComps/Buttons";

type ModifBtnStackProps = {
    actions: Action[];
    icon3?: boolean;
    disabled1?: boolean;
    disabled2?: boolean;
    update?: () => void;
}

export default function ModifBtnStack({ actions, disabled1, disabled2, update, icon3 }: ModifBtnStackProps) {
    const [buttons] = useState<Action[]>(actions);
    const [index, setIndex] = useState(0)

    const { setAlertValues, setOpen } = useAlertStore(state => state)

    useEffect(() => {
        setAlertValues({
            handleConfirm: () => {
                if (typeof buttons[index]?.function === 'function') buttons[index].function();
                update && update()
                setOpen(false)
            },
            title: buttons[index]?.title as string,
            element: buttons[index]?.body as string,
            confirmString: 'Confirmer',
            disableConfirm: false,
        });
    }, [index]);


    return (
        <ButtonGroup
            variant="tonal"
            rounded
            size="small"
            className="overflow-x-auto gap-2 ">
            {buttons.map((btn, i) => {
                // Only render the third icon if icon3 is true, otherwise skip index 2
                if (i === 2 && !icon3) return null;
                const disabled = i === 0 ? disabled1 : i === 1 ? disabled2 : false;
                const color = i === 0
                    ? (disabled1 ? 'gray' : 'red')
                    : i === 1
                        ? (disabled2 ? 'gray' : 'orange')
                        : 'cyan';
                return (
                    <Button
                        variant="tonal"
                        size='medium'
                        className=" !min-w-max"
                        key={i}
                        icon={{ icon: btn.iconImage as IconName || '', size: 'lg', }}
                        color={color as any ?? 'slate'}
                        onClick={() => { setOpen(true); setIndex(i); }}
                        disabled={disabled}
                        title={btn.title as string}
                    />
                );
            })}
        </ButtonGroup>
    );
}


