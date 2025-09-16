import React, { ReactNode, useRef, useState, useLayoutEffect, useEffect } from "react";
import { Icon } from "../../../common/IconComp";
import BackDropBlur from "./BackDropBlur";

interface MenuProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    anchorEl?: HTMLElement | null;
    className?: string;
    children: ReactNode;
    placement?: 'start' | 'end' | 'top' | 'bottom' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'up' | 'down' | 'left' | 'right' | 'center' | 'center_start' | 'center_end' | 'center_top' | 'center_bottom' | 'center_up';
    onClose?: () => void;
    trigger?: ReactNode;
    closeIcon?: ReactNode;
    blurBack?: boolean;
    menuRef?: React.RefObject<HTMLDivElement>;
    key?: string | number;
    fitMax?: boolean;
    ref?: boolean;
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
    blurBack = false,
    menuRef,
    fitMax,
    ref,
    key,
}) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = controlledOpen !== undefined && setOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const placementAll: string[] = placement.split('-');
    const menuRefAuto = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (menuRefAuto.current) {
            const refDiv = document.getElementById('refDiv');
            if (refDiv && ref) {
                refDiv.appendChild(menuRefAuto.current);
            }
        }
        console.log("menuRefAuto", menuRefAuto, menuRef);
    }, []);

    const triggerRef = useRef<HTMLDivElement>(null);
    const menuCurrent = useRef<HTMLDivElement>(null);
    const triggerHeight = triggerRef?.current?.offsetHeight ?? 0;
    const triggerWidth = triggerRef.current?.offsetWidth ?? 24;
    const menuWidth = ((menuCurrent?.current?.offsetWidth ?? 180) + triggerWidth).toString();
    const ml = ((menuCurrent?.current?.offsetWidth ?? 180) * 0.5).toString();
    const mt = ((menuCurrent?.current?.offsetHeight ?? 180) * 1 + triggerHeight * 1.5).toString();
    const mtUp = ((menuCurrent?.current?.offsetHeight ?? 180) * 1.5).toString();


    const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

    useLayoutEffect(() => {
        if (open) {
            let style: React.CSSProperties = {};
            if (placementAll.includes('top')) style.top = 0;
            if (placementAll.includes('bottom')) style.top = '100%';
            if (placementAll.includes('start')) {
                style.left = 0;
                style.top = '100%';
            }
            if (placementAll.includes('end')) style.right = 0;
            if (placementAll.includes('up')) style.bottom = '100%';
            if (placementAll.includes('center')) {
                style.marginLeft = `calc(50% - ${ml}px)`;
                style.marginRight = `calc(50% - ${ml}px)`;
                style.left = '0%';
                style.top = '10%';

            }
            if (placementAll.includes('center_end')) {
                style.translate = `0 -${triggerHeight}px`
                    ;

            }
            if (placementAll.includes('center_start')) {
                style.marginTop = `-${mt}px`;

            }
            if (placementAll.includes('center_bottom')) {
                style.marginLeft = `-${menuWidth}px`;
            }
            if (placementAll.includes('center_top')) {
                style.top = '0%'
            }
            if (placementAll.includes('center_up')) {
                style.marginTop = `-${mtUp}px`;
            }
            setMenuStyle(style);
        } else {
            setMenuStyle({});
        }
    }, [open, placement, menuWidth]);


    const handleClose = () => {
        if (isControlled) {
            setOpen?.(false);
        } else {
            setInternalOpen(false);
        }
        onClose?.();
    };

    // Keep track of all open menus globally
    const openMenus = (window as any).__OPEN_MENUS__ || ((window as any).__OPEN_MENUS__ = new Set<() => void>());

    // Register/unregister this menu's close handler
    useEffect(() => {
        if (open) {
            openMenus.add(handleClose);
        } else {
            openMenus.delete(handleClose);
        }
        return () => {
            openMenus.delete(handleClose);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleTriggerClick = () => {
        // Close all other open menus before opening this one
        openMenus.forEach((close: any) => {
            if (close !== handleClose) close();
        });
        if (isControlled) {
            setOpen?.(!open);
        } else {
            setInternalOpen(!open);
        }
    };

    return (
        <>
            <div
                key={key}
                data-md3-menu
                className={`md3-menu-container   ${(menuRef || menuRefAuto) ? "" : "relative"} `}>
                {(trigger) && React.cloneElement(
                    trigger as React.ReactElement,

                    {
                        ref: ref ? triggerRef : undefined,
                        onClick: handleTriggerClick,
                        'aria-haspopup': 'menu',
                        'aria-expanded': open,
                    }
                )}
                {
                    <div data-md3
                        key={key}
                        ref={menuRef || menuRefAuto}
                        style={{ ...menuStyle, maxWidth: fitMax ? `${triggerWidth}px` : '' }}
                        className={` 
                    ${className || ""}
                  
                    md3-menu md3-elevation ${open ? " md3-menu-enter " : " md3-menu-leave "} `} >

                        {open &&
                            <div
                                className={`animSheetRev `}
                                ref={menuCurrent}>
                                <div
                                    className={`px-2 flex`}
                                    onClick={handleClose}>
                                    {closeIcon ?? <Icon icon='close' size='md' />}
                                </div>
                                <div onClick={handleClose}
                                    className={`md3-menu-list overflow-hidden `}>
                                    {children}
                                </div>
                            </div>}
                    </div>}


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
    bg?: boolean
}

export const MenuItem: React.FC<MenuItemProps> = ({
    children,
    onClick,
    disabled,
    className,
    leadingIcon,
    trailingIcon,
    divider,
    value,
    bg
}) => (
    <div
        onClick={disabled ? undefined : onClick}
        data-value={value}
        className={`md3-menu-item-container
            ${bg ? '' : 'border-t border-slate-300/80 !pt-1 first:border-0 first:!pt-0'}
            ${divider ? `md3-menu-item-divider-${divider}` : ''}
        `}
        data-md3

    >
        <div
            className={`md3-menu-item${disabled ? " disabled" : ""}
                ${bg ? '' : ' !bg-transparent'}
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



