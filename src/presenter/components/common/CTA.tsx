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
        if (index < actions.length && actions[index]) {
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
            });
        }
    }, [index, actions]);



    const { color } = useUxStore((state) => state);
    return (
        <footer className={`CTA ${color}BG backdropBlur`}>
            <div className="flex gap-x-5 gap-y-3 flex-row flex-wrap items-center justify-center w-full wRespXL px-1 pt-1 ">
                {[...actions]
                    .sort((a, b) => (a.NoPrimary === b.NoPrimary ? 0 : a.NoPrimary ? -1 : 1))
                    .map((action, i) =>
                        action?.icon && action?.icon !== '' && (
                            <div
                                key={i}
                                className={`!flex flex-1 w-full items-center justify-center`}
                            >
                                <Button
                                    type={action?.type ?? "button"}
                                    className={`${action?.color ?? defColor}${action?.NoPrimary ? 'Style' : 'StyleInv'} !min-w-full lgBtn`}
                                    size="lg"
                                    onClick={() => {
                                        if (action?.direct) {
                                            action.function && action.function();
                                        } else {
                                            setOpen(true);
                                            setIndex(i);
                                        }
                                    }}
                                    disabled={action?.disabled ? true : i === 0 ? disabled1 : i === 1 ? disabled2 : undefined
                                    }
                                >
                                    {action?.iconImage && (
                                        <Icon
                                            style={action.disabled ? '' : 'border-0'}
                                            reverse={action?.NoPrimary}
                                            color={action.disabled ? 'red' : action?.color ?? defColor}
                                            icon={action?.disabled ? 'block'
                                                : (i === 0 && disabled1) ? 'block'
                                                    : (i === 1 && disabled2) ? 'block'
                                                        : action?.iconImage
                                            }
                                            bg fill
                                            size="lg"
                                        />
                                    )}
                                    <span className="w-full flex-1 -ml-3">{action?.icon}</span>
                                </Button>
                            </div>
                        )
                    )
                }
            </div>
        </footer>
    );
}