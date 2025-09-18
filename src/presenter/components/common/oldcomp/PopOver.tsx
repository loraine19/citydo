import { useState } from "react";

export default function PopOver({
    children,
    trigger,
    className,
}: {
    children: React.ReactNode;
    trigger: React.ReactNode;
    className?: string;
}) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={className}>
            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
            {isOpen &&
                <div
                    onClick={() => setIsOpen(false)}
                    className="!fixed top-[0rem] p-4 left-0 h-[calc(100%-0rem)] w-[100%] !z-[999] flex justify-center items-center overflow-hidden ">
                    <div className="flex items-center justify-center h-full ">{children}</div>
                </div>}
        </div>
    );
}
