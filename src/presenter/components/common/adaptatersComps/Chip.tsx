import { Chip as ChipMt } from "@material-tailwind/react";

// On définit les props classiques d'un input
type ChipProps = {
    variant?: 'solid' | 'outline' | 'ghost'
    color?: string
    value?: string | number,
    icon?: React.ReactNode,
    className?: string,
    size?: 'sm' | 'md' | 'lg'
}


const Chip: React.FC<ChipProps> = ({
    variant = 'solid',
    value,
    icon,
    className,
    size
}) => {


    return (
        <div className="Chip !p-0 !bg-slate-100">
            <ChipMt
                size={size}
                className={`flex  !border !border-slate-900/15  !shadow-none items-center justify-center !max-h-max h-full !rounded-full ${className}`}
                variant={variant} >
                {icon &&
                    <ChipMt.Icon className="stroke w-max px-1 ">
                        {icon}
                    </ChipMt.Icon>}
                <ChipMt.Label className="pt-[0.2em] drop-shadow-sm !font-semibold text-[0.78rem] !stroke-black truncate !whitespace-normal font-roboto px-0">
                    {value}
                </ChipMt.Label>

            </ChipMt>
        </div>
    );
};

export default Chip;