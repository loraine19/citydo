import { ButtonHTMLAttributes, useState } from "react";
import { Icon, IconProps } from "../../../common/IconComp";

interface tabButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string; icon?: IconProps; result?: () => void }[];
    color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'sky' | 'cyan' | 'rose' | 'orange' | 'green';
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export const Tabs: React.FC<tabButtonProps> = ({
    value,
    onChange,
    options,
    color = 'slate',
    size = 'medium',
    className,
}) => {
    const [selectedValueState, setSelectedValueState] = useState(value);
    const activeClasse = `md3-tab-button-active  md3-text-${color}  md3-${color}-border ;  `

    return (
        <div className={`md3-tab-button-group ${className || ''} `}>
            {options.map((option) => (



                <button
                    key={option.value}
                    className={`md3-tab-button md3-tab-button-${size} 
                        ${selectedValueState === option.value ? activeClasse : `  `}`}
                    data-md3
                    aria-pressed={selectedValueState === option.value}
                    type="button"
                    onClick={() => {
                        setSelectedValueState(option.value);
                        option.result && option.result();
                    }}
                    onChange={() => onChange(option.value)}
                >
                    <span className="md3-tab-button__content ">

                        {selectedValueState === option.value ? (
                            <Icon
                                style='-mb-0.5'
                                icon="check"
                                size="lg"

                            />
                        ) : option.icon ?
                            <Icon
                                size={'lg'}
                                fill={true}
                                {...option.icon}

                            /> : null}
                        <span className={`${(selectedValueState === option.value || !option.icon) ? ' active' : " "} text-primary md3-tab-button__label `}>
                            {option.label}
                        </span>
                    </span>
                </button>
            ))}
        </div>
    );
};