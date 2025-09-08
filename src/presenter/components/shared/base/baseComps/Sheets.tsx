import { ReactNode } from "react";

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
    return (
        <div className={`md3-bottom-sheet-container ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="md3-bottom-sheet" data-md3 onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
    );
};

interface SideSheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const SideSheet: React.FC<SideSheetProps> = ({ isOpen, onClose, children }) => {
    return (
        <div className={`md3-side-sheet-container ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="md3-side-sheet" data-md3 onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
    );
};