import { ReactNode } from "react";

interface ListItemProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    ItemStart?: ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({ children, className, onClick, ItemStart }) => {
    return (
        <li
            className={`md3-list-item hover:md3-bg-hover ${className ? ` ${className}` : ""}`}
            data-md3
            onClick={onClick}
        >
            {ItemStart &&
                <div className="md3-list-item-start">
                    {ItemStart}
                </div>}
            {children && <div className=" flex flex-1  ">{children}</div>}
        </li>
    );
};

interface ListProps {
    children: ReactNode;
    className?: string;
}

export const List: React.FC<ListProps> = ({ children, className }) => {
    return (
        <ul className={`md3-list ${className ? ` ${className}` : ""}`}>
            {children}
        </ul>
    );
};