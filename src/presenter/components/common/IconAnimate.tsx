import React, { useEffect, useState } from "react";
import { Icon, IconName } from "./IconComp";

interface IconAnimateProps {
    active: boolean;
    icon: IconName;
    size?: string;
    fill?: boolean;
    className?: string;
}

export const IconAnimate: React.FC<IconAnimateProps> = ({
    active,
    icon,
    size = "5xl",
    fill = true,
    className = "",
}) => {
    const [firstLoad, setFirstLoad] = useState(0);

    useEffect(() => {

        if (!active) setFirstLoad(firstLoad + 1);

    }, [active]);

    return (
        <div
            className={
                (firstLoad < 1 || !active ? "opacity-0 h-1" : " animate-pop h-max") +

                " absolute w-max mt-6  -ml-12  top-[100%] left-[50%] translate-x-[-50%] translate-y-[-0%] " +
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