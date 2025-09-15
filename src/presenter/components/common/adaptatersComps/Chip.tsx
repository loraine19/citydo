import { Chip as ChipMt } from "@material-tailwind/react";
import { Md3Colors } from "../../shared/base/baseComps/Buttons";

// On définit les props classiques d'un input
type ChipProps = {
    variant?: 'solid' | 'outline' | 'ghost'
    color?: Md3Colors
    value?: string | number,
    icon?: React.ReactNode,
    className?: string,
    size?: 'sm' | 'md' | 'lg'
}


const Chip: React.FC<ChipProps> = ({
    variant = 'container',
    value,
    icon,
    className,
    size,
    color = 'slate'
}) => {


    return (
        <div className="Chip !p-0 !bg-slate-100">
            <ChipMt
                size={size}
                className={`flex Chip !shadow-none items-center justify-center !max-h-max h-full !rounded-full md3-${color}-${variant} ${className}`} >
                {icon &&
                    <ChipMt.Icon className="stroke w-max px-1 ">
                        {icon}
                    </ChipMt.Icon>}
                <ChipMt.Label className="pt-[0.2em]  !font-medium text-[0.75rem] !stroke-black truncate !whitespace-normal  ">
                    {value}
                </ChipMt.Label>
            </ChipMt>
        </div>
    );
};

export default Chip;