import { ReactNode } from "react";

interface ListItemProps {
    children: ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({ children }) => {
    return <li className="md3-list-item" data-md3>{children}</li>;
};

interface ListProps {
    children: ReactNode;
}

export const List: React.FC<ListProps> = ({ children }) => {
    return <ul className="md3-list">{children}</ul>;
};