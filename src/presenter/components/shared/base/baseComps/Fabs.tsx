import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import { Button, Md3Colors, Md3Sizes, Md3Variants } from "./Buttons";
import { IconProps } from "../../../common/IconComp";
import BackDropBlur from "./BackDropBlur";

interface FabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'large' | 'medium' | 'xlarge' | 'extended';
    variant?: Md3Variants;
    color?: Md3Colors;
    icon?: IconProps;
    text?: string | ReactNode;
}
export const Fab: React.FC<FabProps> = ({ size, icon, text, className, color, variant, ...props }) => {
    const classes = `md3-fab  ${size ? `md3-fab-${size}` : ''}  ${className || ''}`.trim();
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
    const [visible, setVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const size = mainProps?.size || 'medium';

    return (
        <>


            <div className={`md3-fab-${size} ${mainProps?.className || ''} max-w-max`}>
                <div className={`md3-fab-container md3-fab-${size} ${className || ''} `}>

                    <div style={{ transformOrigin: 'right' }}
                        className={`z-[4] md3-fab-menu-container md3-fab-menu-container-${placement} 
                            ${visible ? '' : 'invisible'}
                            ${isOpen ? 'open md3-fab-item-enter' : 'md3-fab-item-leave'}
                    
                    `}> {children}
                    </div>

                    <Fab

                        {...mainProps}
                        onClick={() => {
                            setVisible(true)
                            setIsOpen(!isOpen);
                            setOpen && setOpen(!open)
                        }} />
                </div>
            </div>
            {backdropBlur &&
                <BackDropBlur
                    blurKey={'fab-menu-blur' + (mainProps?.text || mainProps?.icon?.icon || 'default')}
                    open={isOpen}
                    setOpen={setIsOpen}
                    className="z-[1]" />}


        </>

    );
};