import { ReactNode, useState } from "react";
import { Icon } from "../../../common/IconComp";
import { Md3Colors } from "./Buttons";

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'sky' | 'cyan' | 'rose' | 'orange';
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    // Add other HTMLLabelElement attributes as needed
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, ...props }) => {
    const classes = `md3-switch ${props.className || ''}`.trim();
    return (
        <label className={classes} style={props.style} id={props.id} data-md3>
            <input type="checkbox" className="md3-switch-input" checked={checked} onChange={(e) => onChange(e.target.checked)} />
            <span className="md3-switch-toggle">
                <span className="md3-switch-handle"></span>
            </span>
        </label>
    );
};


interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    className?: string;
    size?: 'lg' | 'xl' | '2xl' | '3xl';
    color?: Md3Colors;
    variant?: 'filled' | 'tonal';
    id?: string;
    name?: string;
    value?: string | number;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label, className, size, color, variant, id, name, value }) => {

    const [isChecked, setIsChecked] = useState(checked);
    return (
        <label
            className="md3-checkbox-container" data-md3>
            <input
                id={id}
                name={name}
                value={value}
                type="checkbox"
                className="md3-checkbox-input invisible"
                checked={checked}
                onChange={(e) => { setIsChecked(e.target.checked); onChange(e.target.checked); }} />
            <Icon
                style={className}
                color={color || 'primary'}
                reverse={variant === 'filled' ? false : true}
                fill={isChecked}
                size={size || 'medium'}
                icon={isChecked ? "check_box" : "check_box_outline_blank"}
            />
            <span className="md3-checkbox-label">{label}</span>
        </label>
    );
};




interface DatePickerProps {
    children: ReactNode;
}
export const DatePicker: React.FC<DatePickerProps> = ({ children }) => {
    return (
        <div className="md3-picker-container" data-md3>
            <div className="md3-picker-header">Sélectionnez une date</div>
            <div className="md3-picker-controls">
                {children}
            </div>
        </div>
    );
};

interface TimePickerProps {
    children: ReactNode;
}
export const TimePicker: React.FC<TimePickerProps> = ({ children }) => {
    return (
        <div className="md3-picker-container" data-md3>
            <div className="md3-picker-header">Sélectionnez une heure</div>
            <div className="md3-picker-controls">
                {children}
            </div>
        </div>
    );
};




