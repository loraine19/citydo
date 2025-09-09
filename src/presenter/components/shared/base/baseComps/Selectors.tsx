import { ReactNode } from "react";

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
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
    return (
        <label className="md3-checkbox-container" data-md3>
            <input type="checkbox" className="md3-checkbox-input" checked={checked} onChange={(e) => onChange(e.target.checked)} />
            <span className="material-icons md3-checkbox-icon">{checked ? 'check_box' : 'check_box_outline_blank'}</span>
            <span>{label}</span>
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




