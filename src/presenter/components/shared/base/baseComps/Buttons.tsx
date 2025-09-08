import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'filled' | 'elevated' | 'outlined' | 'text' | 'tonal';
    color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'sky' | 'cyan' | 'rose' | 'orange' | 'green';
    children: ReactNode;
    elevating?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'filled', color, children, elevating, className, disabled, ...props }) => {
    const classes = `md3-button md3-button-${disabled ? 'tonal' : variant} 
    ${color ? `md3-button-${color}` : ''} 
    ${className || ''} ${elevating ? 'md3-elevating' : ''}`.trim();
    return (
        <button
            disabled={disabled}
            className={classes}
            data-md3 {...props}>

            {children}
        </button>
    );
};

interface SegmentedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    children: ReactNode;
}

export const SegmentedButton: React.FC<SegmentedButtonProps> = ({ active, children, className, ...props }) => {
    const classes = `md3-segmented-button ${active ? 'active' : ''} ${className || ''}`.trim();
    return <button className={classes} data-md3 {...props}>{children}</button>;
};