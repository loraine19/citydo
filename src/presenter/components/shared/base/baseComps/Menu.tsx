import React, { ReactNode, useRef, useState, useLayoutEffect } from "react";
import { Icon } from "../../../common/IconComp";
import BackDropBlur from "./BackDropBlur";

interface MenuProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    anchorEl?: HTMLElement | null;
    className?: string;
    children: ReactNode;
    placement?: 'start' | 'end' | 'top' | 'bottom' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
    onClose?: () => void;
    trigger?: ReactNode;
    closeIcon?: ReactNode;
    blurBack?: boolean;
}

export const Menu: React.FC<MenuProps> = ({
    open: controlledOpen,
    setOpen,
    className,
    children,
    placement = 'bottom',
    onClose,
    trigger,
    closeIcon,
    blurBack = false
}) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const isControlled = controlledOpen !== undefined && setOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const [menuClasses, setMenuClasses] = useState('');
    const placementAll: string[] = placement.split('-');

    useLayoutEffect(() => {
        if (open && menuRef.current) {
            let classes = ' md3-menu  ';
            if (placementAll.includes('top')) classes += 'top-0';
            if (placementAll.includes('bottom')) classes += 'top-full ';
            if (placementAll.includes('start')) classes += ' start';
            if (placementAll.includes('end')) classes += ' !right-0';
            setMenuClasses(classes);
        }
    }, [open, placement]);

    const handleClose = () => {
        if (isControlled) {
            setOpen?.(false);
        } else {
            setInternalOpen(false);
        }
        onClose?.();
    };

    const handleTriggerClick = () => {
        if (isControlled) {
            setOpen?.(!open);
        } else {
            setInternalOpen(!open);
        }
    };

    return (
        <>
            <div className="md3-menu-container">
                {trigger && React.cloneElement(
                    trigger as React.ReactElement,
                    {
                        onClick: handleTriggerClick,
                        'aria-haspopup': 'menu',
                        'aria-expanded': open,
                    }
                )}

                <div data-md3

                    ref={menuRef}
                    className={` 
                    ${className || ""}
                    ${menuClasses} 
                    absolute  flex flex-col 
                    md3-menu md3-elevation ${open ? " md3-menu-enter " : " md3-menu-leave  "} `} >
                    {open &&
                        <>  <div
                            className={`px-2 flex`}
                            onClick={handleClose}>
                            {closeIcon ?? <Icon icon='close' size='md' />}
                        </div>
                            <div className={`md3-menu-list overflow-hidden `}>
                                {children}
                            </div>
                        </>}
                </div>
            </div>
            {blurBack &&
                <BackDropBlur
                    open={open}
                    setOpen={handleClose}
                    className="z-40" />}
        </>
    );
};

interface MenuItemProps {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    divider?: 'top' | 'bottom' | 'both' | 'none';
    value?: string | number | null;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    children,
    onClick,
    disabled,
    className,
    leadingIcon,
    trailingIcon,
    divider,
    value
}) => (
    <div onClick={disabled ? undefined : onClick}
        data-value={value}
        className={`  md3-menu-item-container 
        ${divider ? ` md3-menu-item-divider-${divider}` : ""}`}
        data-md3>
        <div
            className={`md3-menu-item${disabled ? " disabled" : ""} 
            ${className || ""}`}
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}

            role="menuitem"
            data-md3
        >
            {leadingIcon &&
                <span className="md3-menu-item-icon leading">
                    {leadingIcon}
                </span>}
            <span className="md3-menu-item-label">
                {children}
            </span>
            {trailingIcon &&
                <span className="md3-menu-item-icon trailing">
                    {trailingIcon}
                </span>}
        </div>
    </div>
);



interface TabsProps {
    children: ReactNode;
    activeTab: string;
    onTabClick: (tab: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ children, activeTab, onTabClick }) => {
    return (
        <div className="md3-tabs" data-md3>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    const tab = child.props.tab;
                    const isActive = tab === activeTab;
                    const classes = `md3-tab ${isActive ? 'active' : ''}`;
                    return <div className={classes} onClick={() => onTabClick(tab)}>{child.props.label}</div>;
                }
                return child;
            })}
        </div>
    );
};



