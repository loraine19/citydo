import { useState, useEffect } from "react"
import { Action } from "../../../domain/entities/frontEntities";
import { IconName } from "./IconComp";
import { useAlertStore } from "../../../application/stores/alert.store";
import { useUxStore } from "../../../application/stores/ux.store";
import { Button, ButtonGroup, Md3Colors } from "../shared/base/baseComps/Buttons";
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
        <footer className={`h-max w-full !justify-end wRespXL -mb-[1px] bottom-0 ${'fixed'}`}>

            <ButtonGroup
                rounded
                size="large"
                variant="text"
                className={`bg-transparent !pr-2 md3-elevation-0 `}>
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
                                <div className={`flex flex-1 max-w-[max-content] rounded-full !justify-end items-end   `}>
                                    <Button
                                        round={showLabel.index === i && showLabel.value ? false : true}
                                        size={'xlarge'}
                                        color={action?.color as Md3Colors ?? defColor ?? 'slate' as any}
                                        variant={isPrimary(i) ? "filled" : "tonal"}
                                        disabled={isDisabled(i)}
                                        key={i + 'btn'}
                                        onMouseEnter={() => setShowLabel({ index: i, value: true })}
                                        onMouseLeave={() => setShowLabel({ index: i, value: false })}
                                        type={action?.type ?? "button"}
                                        className={` showUp anim md3-elevation-4 !min-w-max `}
                                        icon={{
                                            onClick: () => {
                                                setShowLabel({ index: i, value: !showLabel.value });
                                            },
                                            icon: action?.iconImage as IconName,
                                            size: '2xl',
                                            fill: isDisabled(i) ? false : true
                                        }}
                                    >

                                        <span
                                            onClick={() => {
                                                if (action?.direct) {
                                                    action.function && action.function();
                                                } else {
                                                    setOpen(true);
                                                    setIndex(i);
                                                }
                                            }}
                                            className={`
                                            ${showLabel.index === i && showLabel.value ? 'flex' : 'hidden'} hover:!flex active:!flex w-full  flex-1 justify-center  px-8 !text-sm growShrink `}>
                                            {action?.icon}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        )
                    )
                }
            </ButtonGroup>
        </footer>
    );
}