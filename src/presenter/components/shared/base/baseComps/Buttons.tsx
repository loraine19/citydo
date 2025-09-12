import { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, IconProps } from "../../../common/IconComp";


export type Md3Colors = 'primary' | 'secondary' | 'tertiary' | 'error' | 'sky' | 'cyan' | 'rose' | 'orange' | 'green' | 'slate';
export type Md3Sizes = 'xsmall' | 'small' | 'medium' | 'large';
export type Md3Variants = 'filled' | 'elevated' | 'outlined' | 'text' | 'tonal';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Md3Variants;
    color?: Md3Colors;
    size?: Md3Sizes;
    children?: ReactNode;
    elevating?: boolean;
    icon?: IconProps;
    iconPosition?: 'start' | 'end';
    fab?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'filled', color, children, elevating, className, disabled, icon, size, iconPosition = 'start', fab, ...props }) => {
    const classes = `${!fab && 'md3-button'} md3-button-${disabled ? 'tonal' : variant}
    ${color ? `md3-button-${color}` : ''}  
${!fab && (size ? `md3-button-${size}` : 'md3-button-medium')}

    ${className || ''} ${elevating ? 'md3-elevating' : ''}`.trim();
    return (
        <button
            disabled={disabled}
            className={classes + ` ${icon && 'flex gap-2 items-center'} ${iconPosition === 'end' && 'flex-row-reverse'}`}
            data-md3 {...props}>
            {icon &&
                <Icon
                    fill={icon.fill}
                    style={`${icon.style || ''}  `}
                    size={size === 'small' ? 'lg' : size === 'large' ? '2xl' : 'xl'}
                    {...icon}
                />}

            {children}

        </button>
    );
};



