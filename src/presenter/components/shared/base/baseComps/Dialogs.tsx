import { ReactNode } from "react";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}



export const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <div className={`md3-dialog-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="md3-dialog" onClick={(e) => e.stopPropagation()}>
                <h3 style={{ margin: 0, marginBottom: '1rem' }}>{title}</h3>
                {children}
            </div>
        </div>
    );
};


interface TooltipProps {
    content: string;
    children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
    return (
        <div className="md3-tooltip-container" data-md3>
            {children}
            <span className="md3-tooltip">{content}</span>
        </div>
    );
};