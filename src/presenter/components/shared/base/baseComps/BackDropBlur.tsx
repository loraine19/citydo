import React from "react";
import ReactDOM from "react-dom";

interface BackDropBlurProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    className?: string;
    children?: React.ReactNode;
    key: string | number;
}

const BackDropBlur: React.FC<BackDropBlurProps> = ({
    open,
    setOpen,
    className = "",
    children,
    key
}) => {
    if (!open) return null;

    if (typeof window === "undefined") return null;

    // Ensure only one BackDropBlur is rendered at a time
    const [existing, setExisting] = React.useState<boolean>(false);
    React.useEffect(() => {
        const elements = document.querySelectorAll("#blurDiv");
        console.log(elements);
        if (elements.length > 1) return setExisting(true)
    }, []);

    if (existing) return null;

    const root = document.getElementById("root");
    if (!root || !root.parentNode) return null;

    return ReactDOM.createPortal(
        <div
            key={key}
            id="blurDiv"
            className={`fixed inset-0 backdrop-blur animate-fade ${className}`}
            onClick={() => setOpen && setOpen(false)}
            style={{}}
        >
            {children}
        </div>,
        root.parentNode as Element
    );
};

export default BackDropBlur;