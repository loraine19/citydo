import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react"
import { Action } from "../../../domain/entities/frontEntities";
import { Icon } from "./IconComp";
import { useAlertStore } from "../../../application/stores/alert.store";
import { useUxStore } from "../../../application/stores/ux.store";

type CTAProps = {
    actions: Action[],
    icon3?: boolean,
    disabled1?: boolean,
    disabled2?: boolean,
    button3?: Action
}
export default function CTAMines({ disabled1, disabled2, actions }: CTAProps) {
    const [index, setIndex] = useState(3)

    const { color: defColor } = useUxStore((state) => state);

    const { setAlertValues, setOpen, } = useAlertStore(state => state)

    useEffect(() => {
        setAlertValues({
            handleConfirm: () => {
                if (typeof actions[index]?.function === 'function') actions[index].function();
                setOpen(false)
            },
            title: actions[index]?.title as string,
            element: actions[index]?.body as string,
            disableConfirm: false,
            confirmString: 'Confirmer',
            notif: '',
        })
    }, [index]);




    return (
        <footer className="CTA h-full w-full !flex items-center justify-center">
            {actions.map((action, i) =>
                action?.icon && action?.icon !== '' && (
                    <div
                        key={i}
                        className={`!flex flex-1 w-full items-center justify-center`}
                    >
                        <Button
                            className={`${action?.color ?? defColor}StyleInv !min-w-full lgBtn`}
                            size="lg"
                            onClick={() => { setOpen(true); setIndex(i); }}
                            disabled={i === 0 ? disabled1 : i === 1 ? disabled2 : undefined}
                        >
                            {action?.iconImage && (
                                <Icon
                                    fill
                                    color="white"
                                    icon={action?.iconImage}
                                    size="lg"
                                />
                            )}
                            {action?.icon}
                        </Button>
                    </div>
                )
            )}
        </footer>
    );
}