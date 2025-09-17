import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import { Button, Md3Colors, Md3Sizes, Md3Variants } from "./Buttons";
import { IconProps } from "../../../common/IconComp";
import BackDropBlur from "./BackDropBlur";

interface FabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'large' | 'medium' | 'xlarge' | 'extended';
    variant?: Md3Variants;
    color?: Md3Colors;
    icon?: IconProps;
    text?: string;
}
export const Fab: React.FC<FabProps> = ({ size, icon, text, className, color, variant, ...props }) => {
    const classes = `md3-fab ${size ? `md3-fab-${size}` : ''}  ${className || ''}`.trim();
    return (
        <Button
            fab
            size={size !== 'extended' ? size as Md3Sizes : 'medium'}
            className={classes} data-md3 {...props}
            variant={variant ?? 'filled'}
            color={color}
            icon={icon}


        >
            {text && <span>{text}</span>}
        </Button>
    );
};

interface FabMenuProps {
    className?: string;
    mainProps?: FabProps
    children: ReactNode;
    placement?: 'start' | 'end' | 'top' | 'bottom';
    open?: boolean;
    setOpen?: (open: boolean) => void;
    backdropBlur?: boolean;
}

export const FabMenu: React.FC<FabMenuProps> = ({ mainProps, children, placement, className, open, setOpen, backdropBlur }) => {
    const [isOpen, setIsOpen] = useState(false);
    const size = mainProps?.size || 'medium';

    return (
        <>


            <div className={`md3-fab-${size} ${mainProps?.className || ''}`}>
                <div className={`md3-fab-container md3-fab-${size} ${className || ''} `}>
                    <div className={` md3-fab-menu-container md3-fab-menu-container-${placement} 
                    ${isOpen ? 'open md3-menu-enter' : 'md3-menu-leave'}
                    
                    `}> {children}
                    </div>

                    <Fab {...mainProps}
                        onClick={() => {
                            setIsOpen(!isOpen);
                            setOpen && setOpen(!open)
                        }} />
                </div>
            </div>
            {backdropBlur &&
                <BackDropBlur
                    open={isOpen}
                    setOpen={setIsOpen}
                    className="z-0" />}


        </>

    );
};