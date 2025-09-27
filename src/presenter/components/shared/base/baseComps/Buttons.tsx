import { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, IconProps } from "../../../common/IconComp";
import React, { useState } from "react";


export type Md3Colors = 'primary' | 'secondary' | 'tertiary' | 'error' | 'sky' | 'cyan' | 'rose' | 'orange' | 'green' | 'slate';
export type Md3Sizes = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type Md3Variants = 'filled' | 'elevated' | 'outlined' | 'text' | 'tonal';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Md3Variants;
    color?: Md3Colors;
    size?: Md3Sizes;
    children?: ReactNode;
    elevating?: boolean;
    round?: boolean;
    icon?: IconProps | ReactNode;
    iconPosition?: 'start' | 'end';
    fab?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'filled', color, children, elevating, className, disabled, icon, size, iconPosition = 'start', fab, round, ...props }) => {
    const classes = `${!fab && 'md3-button'} md3-button-${disabled ? 'tonal' : variant}
    ${color ? `md3-button-${color}` : ''}  
${!fab && (size ? `md3-button-${size}${round ? '-round' : ''}` : 'md3-button-medium')}

    ${className || ''} ${elevating ? ' md3-elevating ' : ''} `.trim();
    return (
        <button
            disabled={disabled}
            className={classes + ` ${icon && 'flex gap-2 items-center'} ${iconPosition === 'end' && 'flex-row-reverse'}`}
            data-md3 {...props}>
            {(icon && React.isValidElement(icon)) ? icon :
                (icon && typeof icon === 'object' && !Array.isArray(icon) ?
                    <Icon
                        size={size === 'small' ? 'lg' : size === 'large' ? '2xl' : 'xl'}
                        {...icon as IconProps}
                    />
                    : null
                )
            }

            {children}

        </button>
    );
};


export interface ButtonGroupProps {
    children: ReactNode;
    variant?: Md3Variants;
    size?: Md3Sizes;
    className?: string;
    rounded?: boolean;
    color?: Md3Colors;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
    children,
    variant = 'outlined',
    color = 'primary',
    size = 'medium',
    className,
    rounded,
}) => {
    return (
        <div
            className={`
                ${size ? `md3-button-group-${size}` : 'md3-button-group-medium'}
               ${variant === 'tonal' && `md3-${color}-container`}
                ${variant === 'filled' && `md3-${color} `}
                ${variant === 'outlined' && `md3-${color ?? 'slate'}-outlined`}
                md3-button-group
                inline-flex
                ${rounded ? 'rounded-full overflow-hidden ' : ''}
                ${className || ''}
            `}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child) && (child.type === Button || (child.props && 'variant' in child.props))
                    ? <Button
                        {...child.props}
                        variant={(child.props as ButtonProps).variant || variant}
                        color={(child.props as ButtonProps).color || color}
                        size={(child.props as ButtonProps).size || size}
                        className={`md3-button-group-item flex-1 ${(child.props as any).className || ''} ${rounded ? 'rounded-full px-0' : ''}`}
                        round={rounded}
                    >{child.props.children}
                    </Button>
                    : child
            )}
        </div>
    );
};

interface SplitButtonProps extends ButtonProps {
    menuIcon?: IconProps;
    onMenuClick?: () => void;
    menuOpen?: boolean;
    menuContent?: ReactNode;
}

export const SplitButton: React.FC<SplitButtonProps> = ({
    children,
    icon,
    menuIcon = { icon: "arrow_drop_down" },
    onClick,
    onMenuClick,
    menuOpen,
    menuContent,
    size = 'medium',
    color = 'primary',
    variant = 'filled',
    className,
    ...props
}) => {
    return (
        <div className="inline-flex md3-split-button relative">
            <Button
                icon={icon}
                size={size}
                color={color}
                variant={variant}
                className={`rounded-r-none ${className || ''}`}
                {...props}
                onClick={onClick}
            >
                {children}
            </Button>
            <Button
                icon={menuIcon}
                size={size}
                color={color}
                variant={variant}
                className="rounded-l-none border-l-0"
                onClick={onMenuClick}
                aria-haspopup="menu"
                aria-expanded={!!menuOpen}
                tabIndex={0}
                type="button"
            />
            {menuOpen && menuContent && (
                <div className="absolute top-full left-0 z-10 mt-1 bg-white shadow-lg rounded-md min-w-full">
                    {menuContent}
                </div>
            )}
        </div>
    );
};
export const ButtonsDemo: React.FC = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-lg font-bold">Button Variants</h2>
            <div className="flex gap-2 flex-wrap">
                <Button variant="filled" color="primary">Filled</Button>
                <Button variant="elevated" color="secondary">Elevated</Button>
                <Button variant="outlined" color="tertiary">Outlined</Button>
                <Button variant="text" color="error">Text</Button>
                <Button variant="tonal" color="sky">Tonal</Button>
            </div>
            <h2 className="text-lg font-bold mt-4">Button Sizes</h2>
            <div className="flex gap-2 flex-wrap">
                <Button size="xsmall">XSmall</Button>
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
            </div>
            <h2 className="text-lg font-bold mt-4">Button with Icon</h2>
            <div className="flex gap-2 flex-wrap">
                <Button icon={{ icon: "favorite" }}>Start Icon</Button>
                <Button icon={{ icon: "person" }} iconPosition="end">End Icon</Button>
            </div>
            <h2 className="text-lg font-bold mt-4">Button Group Demo</h2>
            <ButtonGroup color="cyan" variant="outlined" size="medium" rounded>
                <Button variant="filled" icon={{ icon: "home" }}></Button>
                <Button variant="filled" icon={{ icon: "search" }}></Button>
                <Button variant="filled" icon={{ icon: "person" }}></Button>
            </ButtonGroup>
            <h2 className="text-lg font-bold mt-4">Split Button Demo</h2>
            <SplitButton
                icon={{ icon: "edit" }}
                menuContent={
                    <div className="p-2">
                        <div className="hover:bg-gray-100 px-2 py-1 cursor-pointer">Action 1</div>
                        <div className="hover:bg-gray-100 px-2 py-1 cursor-pointer">Action 2</div>
                    </div>
                }
                menuOpen={expanded}
                onMenuClick={() => setExpanded((v) => !v)}
            >
                Split Action
            </SplitButton>
        </div>
    );
};
