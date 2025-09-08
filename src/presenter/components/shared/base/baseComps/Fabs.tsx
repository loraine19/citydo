import { ButtonHTMLAttributes, ReactNode, useState } from "react";

interface FabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'small' | 'large' | 'extended';
    icon: ReactNode;
    text?: string;
}
export const Fab: React.FC<FabProps> = ({ variant, icon, text, className, ...props }) => {
    const classes = `md3-fab ${variant ? `md3-fab-${variant}` : ''} ${className || ''}`.trim();
    return (
        <button className={classes} data-md3 {...props}>
            {icon}
            {text && <span>{text}</span>}
        </button>
    );
};

interface FabMenuProps {
    mainIcon: ReactNode;
    children: ReactNode;
}

export const FabMenu: React.FC<FabMenuProps> = ({ mainIcon, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="md3-fab-container">
            <div className={`md3-fab-menu-container ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
            <Fab icon={mainIcon} onClick={() => setIsOpen(!isOpen)} />
        </div>
    );
};