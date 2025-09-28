import React from "react";
import { Md3Colors } from "../../shared/base/baseComps/Buttons";

type ChipVariant = "filled" | "outlined" | "tonal";
type ChipSize = "small" | "medium" | "large";

type ChipProps = {
    variant?: ChipVariant;
    color?: Md3Colors;
    value?: string | number;
    icon?: React.ReactNode;
    iconPlacement?: "start" | "end";
    className?: string;
    size?: ChipSize;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const variantClassMap: Record<ChipVariant, string> = {
    filled: "md3-chip-filled",
    outlined: "md3-chip-outlined",
    tonal: "md3-chip-tonal",
};

const sizeClassMap: Record<ChipSize, string> = {
    small: "md3-chip-small",
    medium: "md3-chip-medium",
    large: "md3-chip-large",
};

const Chip: React.FC<ChipProps> = ({
    variant = "outlined",
    color = "slate",
    value,
    icon,
    iconPlacement = "start",
    className = "",
    size = "small",
    onClick,
}) => {
    const classes = [
        "md3-chip",
        variantClassMap[variant],
        `md3-chip-${color}`,
        sizeClassMap[size],
        className,
        "truncate"
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={classes}
            onClick={onClick}
            tabIndex={onClick ? 0 : undefined}
            role={onClick ? "button" : undefined}>
            {icon && iconPlacement === "start" &&
                <span className="mr-2 flex items-center">
                    {icon}
                </span>}
            <span className="truncate">
                {value}
            </span>
            {icon && iconPlacement === "end" &&
                <span className="ml-2 flex items-center">
                    {icon}
                </span>}
        </div>
    );
};

export default Chip;