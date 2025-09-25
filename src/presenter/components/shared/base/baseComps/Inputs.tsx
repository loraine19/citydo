import React, { useState, InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, useEffect } from "react";

// Types pour les props
type CommonProps = {
    label: string;
    variant?: "filled" | "outlined";
    helperText?: string;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    disabled?: boolean;
    error?: boolean;
    sizeInput?: "xs" | "sm" | "md" | "lg";
};

type InputProps = (
    | (InputHTMLAttributes<HTMLInputElement> & { multiline?: false })
    | (TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true })
) & CommonProps;

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
    (
        {
            label,
            variant = "outlined",
            helperText,
            leadingIcon,
            trailingIcon,
            multiline,
            value,
            disabled,
            error,
            sizeInput = "md",
            ...props
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const [isActive, setIsActive] = useState(false);

        const inputClasses = [
            "md3-input-wrapper",
            `md3-${variant}`,
            multiline ? "md3-multiline" : '',
            `md3-input-size-${sizeInput}`,
            isActive && "active",
            disabled && "disabled",
            error && "error",
            leadingIcon && "has-leading-icon",
            trailingIcon && "has-trailing-icon",
        ]
            .filter(Boolean)
            .join(" ");

        useEffect(() => {
            const hasValue = value !== undefined && value !== "";
            setIsActive(hasValue);
            console.log(isFocused)
        }, [value, ref]);

        return (
            <div className={`${inputClasses} ${value ? 'active' : ''}`}>
                <div className="md3-input-container ">
                    <label className={multiline ? "md3-label md3-label-multiline" : "md3-label"}>{label}</label>
                    {leadingIcon &&
                        <div className="md3-leading-icon">{leadingIcon}</div>}
                    {multiline ? (
                        <textarea
                            {...(props as any)}
                            value={value}
                            disabled={disabled}
                            className="md3-input-element
                            "
                            onFocus={(e) => {
                                setIsFocused(true);
                                props.onFocus?.(e as any);
                            }}
                            onBlur={(e) => {
                                setIsFocused(false);
                                props.onBlur?.(e as any);
                            }}
                            ref={ref as any}
                        />
                    ) : (
                        <input
                            {...(props as any)}
                            value={value}
                            disabled={disabled}
                            className={`md3-input-element ${value ? 'active' : ''}`}
                            onFocus={(e) => {
                                setIsFocused(true);
                                props.onFocus?.(e as any);
                            }}
                            onBlur={(e) => {
                                setIsFocused(false);
                                props.onBlur?.(e as any);
                            }}
                            ref={ref as any}
                        />
                    )}
                    {trailingIcon && <div className="md3-trailing-icon">{trailingIcon}</div>}
                </div>
                {helperText && (
                    <div className={`md3-helper-text ${error ? "error" : ""}`}>{helperText}</div>
                )}
            </div>
        );
    }
);

// Composant de démo
export const InputDemo = () => {
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    const [val3, setVal3] = useState("");
    const [val4, setVal4] = useState("");
    const [val5, setVal5] = useState("");
    const [val6, setVal6] = useState("");

    return (
        <div className="demo-container">
            <h3>Material Design 3 Inputs Demo</h3>
            <Input
                label="Filled"
                value={val1}
                onChange={e => setVal1(e.target.value)}
                leadingIcon={<span>🔍</span>}
                trailingIcon={<span>X</span>}
            />
            <Input
                label="Outlined"
                variant="outlined"
                value={val2}
                onChange={e => setVal2(e.target.value)}
                helperText="Ceci est un texte d'aide."
            />
            <Input
                label="Outlined Error"
                variant="outlined"
                value={val3}
                onChange={e => setVal3(e.target.value)}
                error
                helperText="Ceci est une erreur."
            />
            <Input
                label="Filled Disabled"
                value={val4}
                onChange={e => setVal4(e.target.value)}
                disabled
            />
            <Input
                label="Multiline"
                multiline
                value={val5}
                onChange={e => setVal5(e.target.value)}
                rows={3}
            />
            <Input
                label="Number"
                type="number"
                value={val6}
                onChange={e => setVal6(e.target.value)}
            />

        </div>
    );
};

