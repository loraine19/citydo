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
        <footer className={`CTA ${color}Footer `}>
            <div className={`flex gap-x-3 gap-y-2 md:gap-x-6 md:gap-y-3 flex-row flex-wrap items-center justify-center w-full wRespL  pb-1 pt-0.5 `}>
                {[...actions]
                    .sort((a, b) => (a.NoPrimary === b.NoPrimary ? 0 : a.NoPrimary ? -1 : 1))
                    .map((action, i) =>
                        action?.icon && action?.icon !== '' && (
                            <div key={i}
                                className={` ${(i === actions.length - 1 && (actions.length > 2 || actions.length === 1)) ? 'flex-1 w-[90%] min-w-full' :
                                    (actions.length === 2) ? 'flex-1' : 'w-max'} !flex `} >
                                <div className={`flex flex-1 bg-slate-100 max-w-[80vw] m-auto rounded-full  `}>
                                    <button
                                        type={action?.type ?? "button"}
                                        className={`${action?.color ?? defColor}${(action?.NoPrimary || i !== actions.length - 1) ? 'Style ' : 'StyleInv'} !min-w-max w-full lgBtn flex-1 flex !shadow-red-600 !pl-1.5 md:!pr-7 !pr-6  `}
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
                                                clear={action?.NoPrimary || action?.disabled || i !== actions.length - 1 ? true : false}
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
                                        <span className="w-full flex-1 -ml-3 px-2 md:px-6">{action?.icon}</span>
                                    </button>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </footer>
    );
}