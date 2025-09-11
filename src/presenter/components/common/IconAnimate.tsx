import React, { useEffect, useState } from "react";
import { Icon } from "./IconComp";

interface IconAnimateProps {
    active: boolean;
    icon: string;
    size?: string;
    fill?: boolean;
    className?: string;
}

export const IconAnimate: React.FC<IconAnimateProps> = ({
    active,
    icon,
    size = "6xl",
    fill = true,
    className = "",
}) => {
    const [firstLoad, setFirstLoad] = useState(0);

    useEffect(() => {

        if (active) setFirstLoad(firstLoad + 1);

    }, [active]);

    return (
        <div
            className={
                (firstLoad < 2 || !active ? "opacity-0 " : "animate-pop ") +
                "!text-white  absolute w-full h-full flex items-center justify-center" +
                className
            }
        >
            <Icon
                icon={icon}
                size={size}
                fill={fill}
                title={active ? "actif" : "inactif"}
            />
        </div>
    );
};