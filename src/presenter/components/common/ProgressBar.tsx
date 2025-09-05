import { Typography, Progress, ProgressBar as ProgressBarMT } from "@material-tailwind/react";
import { ProgressProps } from "@material-tailwind/react";
import { EventStatus } from "../../../domain/entities/Event";
import { PoolSurveyStatus } from "../../../domain/entities/PoolSurvey";

type ProgressBarProps = {
    value: number;
    label?: string;
    size?: ProgressProps['size'];
    needed: number;
    status?: string;
    isPast?: boolean;
}

export function ProgressBar({ value, label, needed, status, size = 'md' }: ProgressBarProps) {
    //  const textSize = size === "lg" ? 'h6' : size === "md" ? 'small' : 'body1';
    let color: string = 'gray'
    let labelTexte = ''
    switch (true) {
        case status === PoolSurveyStatus.REJECTED:
            color = 'bg-slate-400/80'
            labelTexte = 'finis et non approuvé'
            break;
        case (status === PoolSurveyStatus.VALIDATED):
            color = 'bg-green-300/90'
            labelTexte = 'cloturé et approuvé'
            break;
        case (status === PoolSurveyStatus.PENDING && value === 0):
            color = 'bg-slate-400/80'
            labelTexte = `Pas de ${label}`
            break;
        default:
            color = 'bg-orange-300'
            labelTexte = `il manque ${needed} ${label}`
    }

    return (
        < div className={`h-max w-full flex  flex-col pl-2 py-2 gap-1 -ml-1 ${size === "lg" && "mb-2"}`}>
            <div className=" flex truncate items-center justify-between gap-1 px-1">
                <i
                    className="!p-0 !text-[0.85rem] opacity-80  truncate "
                >
                    {labelTexte}
                </i>
            </div>
            <Progress
                className="w-full !bg-slate-200"
                value={value}
                size={size} >
                <ProgressBarMT
                    value={value}
                    className={`!line-clamp-0  px-2 ${color}   `}
                />
            </Progress>
        </div>)
}


export function ProgressBarBlur({ value, label, needed, status, size = 'md', isPast }: ProgressBarProps) {
    let color = 'bg-slate-600'
    let labelTexte = ''
    switch (true) {
        case (status === EventStatus.REJECTED && isPast):
            color = 'bg-slate-600'
            labelTexte = 'n\'a pas eu lieu manque de participants'
            break;
        case (status === EventStatus.REJECTED && !isPast):
            color = 'bg-slate-600'
            labelTexte = 'n\'aura pas lieu manque de participants'
            break;
        case (status === EventStatus.VALIDATED && !isPast):
            color = 'bg-cyan-500'
            labelTexte = 'a été validé'
            break;
        case (status === EventStatus.VALIDATED && isPast):
            color = 'bg-cyan-500'
            labelTexte = 'a eu lieu'
            break;
        case (status === EventStatus.PENDING && value === 0):
            color = 'bg-slate-400/80'
            labelTexte = `pas encore de ${label}`
            break;
    }


    return (
        <div className={` w-full !rounded-full backdropBlur bg-white/10 flex items-center gap-2 p-2 h-max `}>
            {(value === 0 && status === EventStatus.PENDING || status === EventStatus.REJECTED || status === EventStatus.VALIDATED) &&
                (
                    <div className={` !flex !flex-1 ${color} !line-clamp-1 px-2 h-6 w-full rounded-full  items-center justify-center border  border-slate-900/20 `}>
                        <Typography
                            className="mb-0 text-white text-center text-sm drop-shadow font-normal italic">
                            {labelTexte}
                        </Typography>
                    </div>
                )}

            {status === EventStatus.PENDING && value !== 0 &&
                (
                    <Progress
                        className="h-6 flex items-start bg-slate-600/80 !shadow"
                        value={(status === EventStatus.PENDING) ? value : 100}
                        size={size}>
                        <ProgressBarMT
                            value={(status === EventStatus.PENDING) ? value : 100}
                            className={`!min-w-[2.7rem] text-center !line-clamp-1 whitespace-nowrap truncate flex items-center ${size === "lg" ? ' px-3 py-0.5' : 'px-2 '} !bg-cyan-500 border rounded-full border-slate-900/10`}
                        >
                            <div className="absolute flex items-center">  <Typography className="text-sm gap-[10%] flex text-white drop-shadow  ">
                                <span className="font-semibold opacity-80 pr-2">{value} %</span>
                                <span className="font-normal italic">{` ${needed} ${label} manquant`}</span>
                            </Typography></div>
                        </ProgressBarMT>
                    </Progress>
                )}
        </div>)
}