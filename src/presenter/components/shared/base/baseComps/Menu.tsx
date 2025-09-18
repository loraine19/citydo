import React, { ReactNode, useRef, useState, useLayoutEffect, useEffect } from "react";
import { Icon } from "../../../common/IconComp";
import BackDropBlur from "./BackDropBlur";

interface MenuProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    anchorEl?: HTMLElement | null;
    className?: string;
    children: ReactNode;
    placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'auto';
    onClose?: () => void;
    trigger?: ReactNode;
    closeIcon?: ReactNode;
    blurBack?: boolean;
    menuRef?: React.RefObject<HTMLDivElement>;
    key?: string | number;
    fitMax?: boolean;
    ref?: boolean;
    title?: string
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
    title
}) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = controlledOpen !== undefined && setOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const menuRefAuto = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (menuRefAuto.current) {
            const refDiv = document.getElementById('refDiv');
            const blurDiv = document.getElementById('blurDiv');
            if (refDiv && ref) {
                refDiv.appendChild(menuRefAuto.current);
            }
            else if (blurDiv && blurBack && ref) {
                blurDiv.appendChild(menuRefAuto.current);
            }
        }
        console.log("menuRefAuto", menuRefAuto, menuRef);
    }, [open]);

    const triggerRef = useRef<HTMLDivElement>(null);
    const menuCurrent = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerWidth = triggerRef.current?.offsetWidth ?? 44;
    const triggerRect = containerRef.current ? containerRef.current.getBoundingClientRect() : null;
    const menuWidth = ((menuCurrent?.current?.offsetWidth ?? 180) + triggerWidth).toString();


    const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

    useLayoutEffect(() => {
        if (open) {
            let style: React.CSSProperties = {};

            if (triggerRect && menuCurrent.current) {
                const viewportHeight = window.innerHeight;
                const viewportWidth = window.innerWidth;
                const menuHeight = menuCurrent.current.offsetHeight;
                const menuWidth = menuCurrent.current.offsetWidth;

                // Calculate available space
                const spaceBelow = viewportHeight - triggerRect.bottom;
                const spaceAbove = triggerRect.top;
                const spaceRight = viewportWidth - triggerRect.right;
                const spaceLeft = triggerRect.left;


                if (placement === 'top-left'
                    || (placement === 'auto' && (spaceLeft >= menuWidth
                        && (spaceAbove >= menuHeight) && spaceAbove >= 250))
                ) {
                    style.position = 'fixed';
                    style.top = `${(triggerRect.top - menuHeight)}px`;
                    style.left = `${triggerRect.left - menuWidth}px`;
                }
                else if (placement === 'top-right'
                    || (placement === 'auto' && (spaceRight >= menuWidth
                        && (spaceAbove >= menuHeight) && spaceAbove >= 250))
                ) {

                    style.position = 'fixed';
                    style.top = `${(triggerRect.top - menuHeight)}px`;
                    style.left = `${triggerRect.left}px`;
                }
                else if (placement === 'bottom-left'
                    || (placement === 'auto' && (spaceLeft >= menuWidth && spaceBelow >= menuHeight))
                ) {
                    style.position = 'fixed';
                    style.top = `${triggerRect.bottom}px`;
                    style.left = `${triggerRect.left - menuWidth}px`;
                }
                else if (placement === 'bottom-right'
                    || (placement === 'auto' && (spaceRight >= menuWidth && spaceBelow >= menuHeight))
                ) {
                    style.position = 'fixed';
                    style.top = `${triggerRect.bottom}px`;
                    style.left = `${triggerRect.left}px`;
                }

                //Centrer on triiger center if no space
                else {
                    style.position = 'fixed';
                    style.top = `${triggerRect.bottom / 2 > 200 ? triggerRect.bottom / 2 : 200}px`;
                    style.left = `${triggerRect.right / 2}px`;
                }


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
                ref={containerRef}
                key={key}
                data-md3-menu
                className={`md3-menu-container  ${(menuRef || menuRefAuto) ? "" : "relative"} `}>
                {(trigger) && React.cloneElement(
                    trigger as React.ReactElement,

                    {
                        ref: triggerRef,
                        onClick: handleTriggerClick,
                        'aria-haspopup': 'menu',
                        'aria-expanded': open,
                        id: 'menu-button',
                    }
                )}

                {<div data-md3
                    key={key}
                    ref={menuRef || menuRefAuto}
                    style={(!open || open) ? {
                        ...menuStyle,
                        maxWidth: fitMax ? `${triggerWidth}px` : ''
                    } : {}}
                    className={` ${className || ""} 
                    md3-menu md3-elevation ${open ? " md3-menu-enter " : " md3-menu-leave "} `} >


                    {<div className={`${open ? "!z-[999]" : " hidden -z-10 "}`}
                        ref={menuCurrent}>

                        <div
                            onClick={handleClose}>
                            {closeIcon ??
                                <div className={`px-2 pt-2  -mb-7 flex justify-end w-full`}>
                                    <Icon
                                        icon='close'
                                        bg color='slate'
                                        size='sm'
                                        style='place-self-end' />
                                </div>}
                        </div>

                        <div onClick={handleClose}
                            className={`md3-menu-list overflow-hidden `}>
                            {title &&
                                <div className="flex-1 font-medium text-slate-700 -mb-1 p-3 text-[0.95rem] ">
                                    {title}
                                </div>}
                            {children}
                        </div>
                    </div>}
                </div>
                }
            </div>
            {blurBack && <BackDropBlur
                open={open}
                setOpen={handleClose}
                className="" >

            </BackDropBlur>
            }
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
    bg?: boolean,
    title?: string
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
    bg,
    title
}) => (
    <div
        title={title}
        onClick={disabled ? undefined : onClick}
        data-value={value}
        className={` md3-menu-item-container
          
            ${bg ? '' : 'border-t border-slate-300/80 !pt-1 rounded-none first:border-0 first:!pt-0'}
            ${divider ? `md3-menu-item-divider-${divider}` : ''}
        `}
        data-md3

    >
        <div
            className={`md3-menu-item${disabled ? " disabled" : ""} 
                ${bg ? '' : ' rounded-none bg-transparent'}
                ${className || ""} `}
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            role="menuitem"
            data-md3
        >
            {leadingIcon &&
                <span className="md3-menu-item-icon leading">
                    {leadingIcon}
                </span>}
            <span className="md3-menu-item-label w-full">
                {children}
            </span>
            {trailingIcon &&
                <span className="md3-menu-item-icon trailing w-full flex-1 justify-end flex pr-1">
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



