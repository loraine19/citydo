import { ButtonHTMLAttributes, useState } from "react";
import { Icon, IconProps } from "../../../common/IconComp";

interface SegmentedButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string; icon?: IconProps; result?: () => void }[];
    color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'sky' | 'cyan' | 'rose' | 'orange' | 'green';
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export const SegmentedButton: React.FC<SegmentedButtonProps> = ({
    value,
    onChange,
    options,
    color = 'primary',
    size = 'medium',
    className,
}) => {
    const [selectedValueState, setSelectedValueState] = useState(value);
    const activeClasse = ` animSlide  md3-${color} md3-elevation-2 border ;  `

    return (
        <div className={`md3-segmented-button-group md3-${color}-outlined  ${className || ''} `}>
            {options.map((option) => (
                <button
                    key={option.value}
                    className={` gap-2  md3-segmented-button md3-segmented-button-${size} ${selectedValueState === option.value ? activeClasse : `  `}`}
                    data-md3
                    aria-pressed={selectedValueState === option.value}
                    type="button"
                    onClick={() => {
                        setSelectedValueState(option.value);
                        option.result && option.result();
                    }}
                    onChange={() => onChange(option.value)}
                >
                    {selectedValueState === option.value ? (
                        <Icon
                            icon="check"
                            size="xl"

                        />
                    ) : option.icon ?
                        <Icon

                            size={'lg'}
                            fill        {...option.icon}

                        /> : null}
                    <span className={`${(selectedValueState === option.value || !option.icon) ? 'inline-flex' : "hidden sm:inline-flex"}  md3-segmented-button__label `}>
                        {option.label}
                    </span>
                </button>
            ))}
        </div>
    );
};