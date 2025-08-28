import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react"
import { Action } from "../../../domain/entities/frontEntities";
import { Icon } from "./IconComp";
import { PathElement } from "../../constants";
import { useAlertStore } from "../../../application/stores/alert.store";

type CTAProps = {
    actions: Action[],
    icon3?: boolean,
    disabled1?: boolean,
    disabled2?: boolean,
    button3?: Action
}
export default function CTAMines({ disabled1, disabled2, actions }: CTAProps) {
    const [index, setIndex] = useState(3)

    const path = window.location.pathname
    let defColor: string;
    let customColor: string = ''
    switch (true) {
        case [PathElement.SERVICE, PathElement.GROUP].some(element => path.includes(element)):
            defColor = 'blue';
            customColor = 'bg-blue-500';
            break;
        case [PathElement.EVENT].some(element => path.includes(element)):
            defColor = 'cyan';
            customColor = 'bg-cyan-500';
            break;
        case [PathElement.SURVEY, PathElement.POOL, PathElement.VOTE].some(element => path.includes(element)):
            defColor = 'orange';
            customColor = 'bg-orange-500';
            break;
        case [PathElement.POST].some(element => path.includes(element)):
            defColor = 'rose';
            customColor = 'bg-rose-500';
            break;
        default:
            defColor = 'slate';
            customColor = 'bg-slate-500';
    }


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
        console.log(defColor)
    }, [index]);

    const colorMap = {
        orange: 'bg-orange-500',
        red: 'bg-red-500',
        cyan: 'bg-cyan-500',
        gray: 'bg-gray-500',
        green: 'bg-green-500',
    }



    return (
        <footer className={`CTA h-full overflow-y-auto !flex items-center justify-center `}>

            {actions[0]?.icon && actions[0]?.icon !== '' &&
                <div className="!flex w-full items-center justify-center">
                    <Button className={`${customColor} ${colorMap[actions[0]?.color as keyof typeof colorMap] ?? ''} !min-w-full lgBtn `}
                        onClick={() => { setOpen(true), setIndex(0) }}
                        size='lg'
                        disabled={disabled1} >
                        {actions[0]?.iconImage &&
                            <Icon
                                fill
                                color='white'
                                icon={actions[0]?.iconImage}
                                size='lg' />}
                        {actions[0]?.icon}
                    </Button>
                </div>}

            {actions[1]?.icon && actions[1]?.icon !== '' &&
                <div className={`!flex w-full items-center justify-center`} >
                    <Button className={`${customColor} lgBtn !min-w-full ${colorMap[actions[1]?.color as keyof typeof colorMap] ?? ''}`}
                        onClick={() => { setOpen(true), setIndex(1) }}
                        size='lg'
                        disabled={disabled2} >
                        {actions[1]?.iconImage &&
                            <Icon
                                fill color='white'
                                icon={actions[1]?.iconImage}
                                size="lg" />}
                        {actions[1]?.icon}
                    </Button>
                </div>}

            {actions[2]?.icon && actions[2]?.icon !== '' &&
                <div className={`!flex w-full items-center justify-center`} >
                    <Button className={`${customColor} lgBtn !min-w-full ${colorMap[actions[2]?.color as keyof typeof colorMap] ?? ''}`}
                        size='lg'
                        onClick={() => { setOpen(true), setIndex(2) }}>
                        {actions[2]?.iconImage &&
                            <Icon
                                fill color='white'
                                icon={actions[2]?.iconImage}
                                size="lg" />}
                        {actions[2]?.icon}
                    </Button>
                </div>}

            {actions[3]?.icon && actions[3]?.icon !== '' &&
                <div className={`!flex w-full items-center justify-center`} >
                    <Button className={`${customColor} lgBtn !min-w-full ${colorMap[actions[3]?.color as keyof typeof colorMap] ?? ''}`}
                        size='lg'
                        onClick={() => { setOpen(true), setIndex(3) }}>
                        {actions[3]?.iconImage &&
                            <Icon
                                fill color='white'
                                icon={actions[3]?.iconImage}
                                size="lg" />}
                        {actions[3]?.icon}
                    </Button>
                </div>}

        </footer>
    );
}