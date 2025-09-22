import React from "react";
import ReactDOM from "react-dom";

interface BackDropBlurProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    className?: string;
    children?: React.ReactNode;
}

const BackDropBlur: React.FC<BackDropBlurProps> = ({
    open,
    setOpen,
    className = "",
    children,
}) => {
    if (!open) return null;

    if (typeof window === "undefined") return null;

    const root = document.getElementById("app");
    if (!root || !root.parentNode) return null;

    return ReactDOM.createPortal(
        <div
            id='blurDiv'
            className={`fixed z-[0] inset-0  backdrop-blur bg-black/30 animate-fade 
                ${className}`}
            onClick={() => setOpen && setOpen(false)}
            style={{}}
        >
            {children}
        </div>,
        root.parentNode as Element
    );
};

export default BackDropBlur;