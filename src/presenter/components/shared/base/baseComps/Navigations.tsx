import React, { ReactElement } from "react";
import { cloneElement, HTMLAttributes, ReactNode } from "react";

interface AppBarProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
}

export const AppBar: React.FC<AppBarProps> = ({ children, ...props }) => {
    return (
        <header className="md3-appbar" data-md3 {...props}>
            {children}
        </header>
    );
};



interface NavigationBarProps extends HTMLAttributes<HTMLUListElement> {
    children: ReactNode;
    value?: string;
    onValueChange?: (value: string) => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ children, className, ...props }) => {
    const classes = `md3-nav-bar ${className || ''}`.trim();
    // Add value and onChange to NavigationBar to control active state
    const handleItemClick = (value: string) => {
        if (props.onValueChange) {
            props.onValueChange(value);
        }
    }



    return (
        <ul className={classes} data-md3 {...props}>

            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === NavigationBarItem) {
                    return cloneElement(child as ReactElement<NavigationBarItemProps>, {
                        active: child.props.value === props.value,
                        onClickAction: () => {
                            handleItemClick(child.props.value);
                            child.props.onClickAction && child.props.onClickAction();
                        },
                    });
                }
                return child;
            })}
        </ul>
    );
};

interface NavigationBarItemProps extends HTMLAttributes<HTMLLIElement> {
    label: string | ReactNode;
    icon: ReactNode;
    active?: boolean;
    onClickAction?: () => void;
    value?: string;
}

export const NavigationBarItem: React.FC<NavigationBarItemProps> = ({ label, icon, active, className, onClickAction, ...props }) => {
    const classes = `md3-nav-item ${active ? 'active' : ''} ${className || ''}`.trim();

    return (
        <li
            className={classes}
            data-md3 {...props}>
            <button
                onClick={() => onClickAction && onClickAction()}>
                {icon}
                <span>{label}</span>
            </button>
        </li>
    );
};

interface NavigationDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isOpen, onClose, children }) => {
    return (
        <>
            <div className={`md3-nav-drawer-scrim ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
            <div className={`md3-nav-drawer ${isOpen ? 'open' : ''}`} data-md3>
                -   {children}
            </div>
        </>
    );
};

interface NavigationRailProps {
    children: ReactNode;
    className?: string;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({ children, className, ...props }) => {
    const classes = `md3-nav-rail ${className || ''}`.trim();
    return <div className={classes} data-md3 {...props}>{children}</div>;
};

interface NavigationRailItemProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    icon: ReactNode;
    active?: boolean;
}

export const NavigationRailItem: React.FC<NavigationRailItemProps> = ({ label, icon, active, className, ...props }) => {
    const classes = `md3-nav-rail-item ${active ? 'active' : ''} ${className || ''}`.trim();
    return (
        <div className={classes} data-md3 {...props}>
            {icon}
            <span>-{label}</span>
        </div>
    );
};

