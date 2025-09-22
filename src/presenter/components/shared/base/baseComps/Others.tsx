import { HTMLAttributes } from "react";

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'filled' | 'outlined';
    label: string;

}

export const Chip: React.FC<ChipProps> = ({ variant = 'filled', label }) => {
    const classes = `md3-chip md3-chip-${variant}`;
    return (
        <div className={classes} data-md3>
            <span className="md3-chip-label">{label}</span>
        </div>
    );
};