import React from "react";

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
    children
}) => {
    return (
        open && (
            <div
                className={`fixed inset-0 z-0 backdrop-blur animRev ${className}`}
                onClick={() => setOpen && setOpen(!open)}
                style={{}}
            >

                {children}
            </div>)

    )
}

export default BackDropBlur;