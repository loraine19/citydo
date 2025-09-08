import { HTMLAttributes } from "react";

interface TextFieldProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    variant?: 'filled' | 'outlined';
}



export const TextField: React.FC<TextFieldProps> = ({ label, variant = 'filled', className, ...props }) => {
    const classes = `md3-input-container md3-input-${variant} ${className || ''}`.trim();
    return (
        <div className={classes} data-md3 {...props}>
            <input type="text" className="md3-input-field" placeholder=" " />
            <label className="md3-input-label">{label}</label>
        </div>
    );
};