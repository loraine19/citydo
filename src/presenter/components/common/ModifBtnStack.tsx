import { useEffect, useState } from "react";
import { Action } from "../../../domain/entities/frontEntities";
import { Icon } from "./IconComp";
import { useAlertStore } from "../../../application/stores/alert.store";

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
            disableConfirm: false,
            confirmString: 'Confirmer',
        });
    }, [index]);


    return (
        <div className="flex gap-3 items-center w-full">

            <Icon
                icon={buttons[0].iconImage as string || ''}
                color={disabled1 ? 'gray' : 'red'}
                onClick={() => { setOpen(true), setIndex(0) }}
                bg size="md"
                disabled={disabled1}
                title={buttons[0].title as string} />

            <Icon
                icon={buttons[1].iconImage as string || ''}
                color={disabled2 ? 'gray' : 'orange'}
                onClick={() => { setOpen(true), setIndex(1) }}
                bg size="md"
                disabled={disabled2}
                title={buttons[1].title as string} />


            {icon3 &&
                <Icon
                    icon={buttons[2].iconImage as string || ''}
                    color={'cyan'}
                    onClick={() => { setOpen(true), setIndex(2) }}
                    bg size="md"
                    title={buttons[2].title as string} />
            }
        </div>
    );
}


