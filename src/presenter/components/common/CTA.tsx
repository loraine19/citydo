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
    const [showLabel, setShowLabel] = useState({ index: -1, value: false });

    useEffect(() => {
        if (index < actions.length && actions[index]) {
            setAlertValues({
                handleConfirm: () => {
                    if (typeof actions[index]?.function === 'function') actions[index].function();
                    setOpen(false)
                },
                title: actions[index]?.title as string,
                element: actions[index]?.body as string,
                confirmString: 'Confirmer',
                notif: '',
            });
        }
    }, [index, actions]);

    const isPrimary = (i: number) => ((actions[i]?.NoPrimary === false || actions.length === 1 || (actions.length === 2 && i !== 0) || i === actions.length - 1) ? true : false)
    const isDisabled = (i: number) => ((i === 0 && disabled1) || (i === 1 && disabled2) || actions[i]?.disabled)

    return (
        <footer className={`CTA slateFooter pb-2`}>

            <div className={`flex gap-x-3 gap-y-2 md:gap-x-6 md:gap-y-3 flex-row flex-wrap items-center justify-center w-full wRespL px-2 lg:px-2 pb-2 lg:pb-0 `}>
                {[...actions]
                    .sort((a, b) => {
                        // First: NoPrimary === true
                        if (a.NoPrimary && !b.NoPrimary) return -1;
                        if (!a.NoPrimary && b.NoPrimary) return 1;
                        // Second: disabled === true
                        if (a.disabled && !b.disabled) return -1;
                        if (!a.disabled && b.disabled) return 1;
                        // Otherwise: keep order
                        return 0;
                    })
                    .map((action, i) =>
                        action?.icon && action?.icon !== '' && (
                            <div key={i}
                                className={`
                                    ${showLabel.index === i && showLabel.value ? 'growShrink' : ''}
                                    ${isPrimary(i) ? 'flex-1 w-[90%]  ' :
                                        (actions.length === 2) ? ' !items-end justify-end ' : 'w-max '} !flex  !items-end !justify-end lg:!w-max lg:flex-shrink-0 growShrink`} >
                                <div className={`flex flex-1 bg-slate-100 max-w-[max-content] rounded-full !justify-end items-end   `}>
                                    <button
                                        disabled={isDisabled(i)}
                                        key={i + 'btn'}
                                        onMouseEnter={() => setShowLabel({ index: i, value: true })}
                                        onMouseLeave={() => setShowLabel({ index: i, value: false })}
                                        type={action?.type ?? "button"}
                                        className={` showUp ${action?.color ?? defColor ?? 'slate'}${(isPrimary(i) && !isDisabled(i)) ? 'StyleInv ' : 'Style'} !min-w-max  lgBtn !mr-0 flex-1 flex !py-1 !px-1.5 anim border border-slate-900/10`}
                                    >
                                        {action?.iconImage && (
                                            <Icon
                                                onClick={() => {
                                                    setShowLabel({ index: i, value: !showLabel.value });
                                                }}
                                                reverse={!isPrimary(i) || isDisabled(i) || (showLabel.index === i && showLabel.value) ? false : true}
                                                clear={!(showLabel.index === i && showLabel.value) || !(isPrimary(i) || isDisabled(i))}
                                                color={isDisabled(i) ? 'slate' : action?.color ?? defColor}
                                                icon={action?.iconImage}
                                                disabled={isDisabled(i)}
                                                bg fill
                                                size="2xl"
                                            />
                                        )}
                                        <span
                                            onClick={() => {
                                                if (action?.direct) {
                                                    action.function && action.function();
                                                } else {
                                                    setOpen(true);
                                                    setIndex(i);
                                                }
                                            }}
                                            className={` growShrink ${showLabel.index === i && showLabel.value ? 'flex' : 'hidden'} hover:!flex active:!flex hover:w-full flex-1 -ml-3 pl-2 pr-4 md:!pr-9 `}>{action?.icon}</span>
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