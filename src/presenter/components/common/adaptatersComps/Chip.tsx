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
        <ChipMt
            size={size}
            className={`flex  items-center justify-center !max-h-max !rounded-full ${className}`}
            variant={variant} >
            <ChipMt.Label className="pt-[0.2em] px-0">
                {value}
            </ChipMt.Label>
            {icon &&
                <ChipMt.Icon className=" w-max mr-2 -ml-1 ">
                    {icon}
                </ChipMt.Icon>}
        </ChipMt>
    );
};

export default Chip;