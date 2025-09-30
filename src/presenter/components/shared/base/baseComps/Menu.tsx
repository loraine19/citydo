import React, { ReactNode, useRef, useState, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../../../common/IconComp";
import BackDropBlur from "./BackDropBlur";

interface MenuProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    anchorEl?: HTMLElement | null;
    className?: string;
    children: ReactNode;
    placement?: 'auto' | 'center-trigger' | 'center' | 'up-bottom-right' | 'free' | 'bottom' | 'top' | 'top-left' | 'bottom-left';
    onClose?: () => void;
    trigger?: ReactNode;
    closeIcon?: ReactNode;
    blurBack?: boolean;
    menuRef?: React.RefObject<HTMLDivElement>;
    MenuKey: string | number;
    fitMax?: boolean;
    title?: string;
    left?: boolean;
    isVisible?: boolean;
    containerClassName?: string;
}

export const Menu: React.FC<MenuProps> = ({
    open: controlledOpen,
    setOpen,
    className,
    children,
    placement: givenPlacement = 'bottom',
    onClose,
    trigger,
    closeIcon,
    blurBack = false,
    menuRef,
    fitMax,
    MenuKey,
    title,
    isVisible = false,
    left = false,
    containerClassName
}) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = setOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const menuRefAuto = useRef<HTMLDivElement>(null);
    const root = document.getElementById("root");

    // Track the currently open menu key globally
    (window as any).__CURRENT_MENU_KEY__ = (window as any).__CURRENT_MENU_KEY__ || null;

    useEffect(() => {
        if (isControlled) {
            // Only open if controlledOpen is true and MenuKey matches the global currentMenuKey
            if (controlledOpen && MenuKey === (window as any).__CURRENT_MENU_KEY__) {
                setInternalOpen(true);
            } else {
                setInternalOpen(false);
            }
        }
    }, [controlledOpen, isControlled, MenuKey]);


    //// INIT PORTAL ROOT
    const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
    useEffect(() => {
        const rootEl = document.getElementById('app') || document.body;
        setPortalRoot(rootEl);
    }, []);


    //// HANDLE MULTIPLE MENUS
    const openMenus: Set<() => void> = (window as any).__OPEN_MENUS__ || ((window as any).__OPEN_MENUS__ = new Set<() => void>());

    // Close handler for this menu
    const path = window.location.pathname;

    const handleClose = React.useCallback(() => {
        setOpen?.(false);
        setInternalOpen(false);
        onClose?.();
    }, [setOpen, onClose]);

    // Close all menus on route change
    useEffect(() => {
        const handleClickOutside = () => {
            const menuNode = (menuRef?.current || menuRefAuto.current);
            if (menuNode) handleClose();
        };
        handleClickOutside();
    }, [path]);

    //// CLOSE MENU CLICK OUTSIDE
    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (event: MouseEvent) => {
            const menuNode = (menuRef?.current || menuRefAuto.current);
            if (menuNode && !menuNode.contains(event.target as Node)) {
                handleClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, menuRef, menuRefAuto, handleClose]);


    //// REGISTER/UNREGISTER MENU IN GLOBAL SET
    useEffect(() => {
        if (open) openMenus.add(handleClose)
        else openMenus.delete(handleClose)
        return () => {
            openMenus.delete(handleClose);
        };
    }, [open, handleClose]);


    const menuCurrent = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRect = containerRef.current ? containerRef.current.getBoundingClientRect() : null;
    const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
    const [placement] = useState<string | null>(givenPlacement);
    type PlaceProps = {
        triggerRect: DOMRect,
        menuCurrent: React.RefObject<HTMLDivElement>,
        style: React.CSSProperties,
        cropt?: boolean,
        placeHor?: 'right' | 'left'
    }

    const placeBottom = (props: PlaceProps) => {
        const { triggerRect, style, cropt, placeHor = 'right' } = props;
        style.top = `${triggerRect.bottom}px`;
        style.left = `${triggerRect.left}px`;
        style.transformOrigin = `top`;
        if (cropt) {
            style.maxHeight = `${(window.innerHeight - triggerRect.bottom) - 16}px`;
            style.overflowY = 'auto';
        }
        if (placeHor === 'left') {
            style.left = `${triggerRect.right - (menuCurrent?.current?.offsetWidth || 0)}px`;
        }

    }
    const placeTop = (props: PlaceProps) => {
        const { triggerRect, menuCurrent, style, cropt, placeHor = 'right' } = props;
        const MenuHeight = menuCurrent?.current?.offsetHeight || 0;
        const top = MenuHeight > (window.innerHeight - triggerRect.top) ?
            (triggerRect.top - MenuHeight) : (triggerRect.top - MenuHeight);
        style.top = `${top}px`;
        style.left = `${triggerRect.left}px`;
        style.transformOrigin = `bottom`;
        if (cropt) {
            style.maxHeight = `${triggerRect.top - 16}px`;
            style.overflowY = 'auto';
        }
        if (placeHor === 'left') {
            style.left = `${triggerRect.left}px`;
        }
    }

    useLayoutEffect(() => {
        let style: React.CSSProperties = {};

        if (triggerRect && menuCurrent.current) {
            const menuHeight = menuCurrent.current.clientHeight;
            const menuWidth = menuCurrent.current.offsetWidth;

            // Calculate available space
            const spaceBottom = window.innerHeight - triggerRect.bottom;
            const spaceTop = triggerRect.top;
            const spaceRight = window.innerWidth - triggerRect.right;
            const spaceLeft = triggerRect.left;

            style.position = 'fixed';

            if (givenPlacement === 'auto') {
                if (spaceTop > menuHeight) {
                    if (spaceRight >= menuWidth) placeTop({ triggerRect, menuCurrent, style });
                    else placeTop({ triggerRect, menuCurrent, style, placeHor: 'left' });
                }
                else if (spaceTop >= spaceBottom) {
                    if (spaceRight > menuWidth) placeTop({ triggerRect, menuCurrent, style, cropt: true });
                    else placeTop({ triggerRect, menuCurrent, style, cropt: true, placeHor: 'left' });
                }
                else {
                    if (spaceBottom > menuHeight) {
                        if ((spaceRight > menuWidth) || (spaceRight > spaceLeft)) {
                            placeBottom({ triggerRect, menuCurrent, style });
                        }
                        else placeBottom({ triggerRect, menuCurrent, style, placeHor: 'left' });
                    }
                    else {
                        if ((spaceRight > menuWidth) || (spaceRight > spaceLeft)) {
                            placeBottom({ triggerRect, menuCurrent, style, cropt: true });
                        }
                        else placeBottom({ triggerRect, menuCurrent, style, cropt: true, placeHor: 'left' });
                    }
                }
            }

            if (placement === 'bottom') {
                if (spaceBottom >= menuHeight) placeBottom({ triggerRect, menuCurrent, style });
                else if (spaceTop > spaceBottom) placeTop({ triggerRect, menuCurrent, style });
                else if (spaceRight >= menuWidth || spaceRight > spaceLeft) placeBottom({ triggerRect, menuCurrent, style, cropt: true, });
                else placeBottom({ triggerRect, menuCurrent, style, cropt: true, placeHor: 'left' });
            }
            else if (placement === 'top') {
                if (spaceTop >= (menuHeight)) placeTop({ triggerRect, menuCurrent, style });
                else if (spaceBottom >= (menuHeight)) placeBottom({ triggerRect, menuCurrent, style });
                else if (spaceTop >= spaceBottom) placeTop({ triggerRect, menuCurrent, style, cropt: true });
                else if ((spaceBottom > spaceTop) && (spaceRight > menuWidth)) placeBottom({ triggerRect, menuCurrent, style, cropt: true });
                else if ((spaceBottom >= menuHeight) && (spaceRight < menuWidth)) placeBottom({ triggerRect, menuCurrent, style, placeHor: 'left' });
                else placeTop({ triggerRect, menuCurrent, style, cropt: true });
            }
            else if (placement === 'top-left') {
                if (spaceTop >= menuHeight && spaceLeft >= menuWidth) {
                    placeTop({ triggerRect, menuCurrent, style, placeHor: 'left' });
                } else if (spaceTop >= menuHeight && spaceRight >= menuWidth) {
                    placeTop({ triggerRect, menuCurrent, style });
                } else if (spaceBottom >= menuHeight && spaceLeft >= menuWidth) {
                    placeBottom({ triggerRect, menuCurrent, style, placeHor: 'left' });
                } else if (spaceBottom >= menuHeight && spaceRight >= menuWidth) {
                    placeBottom({ triggerRect, menuCurrent, style, placeHor: 'right' });
                }
                else placeTop({ triggerRect, menuCurrent, style, cropt: true, placeHor: 'left' });
            }
            else if (placement === 'bottom-left') {
                if (spaceBottom >= menuHeight && spaceLeft >= menuWidth) {
                    placeBottom({ triggerRect, menuCurrent, style, cropt: false, placeHor: 'left' });
                } else if (spaceBottom >= menuHeight && spaceRight >= menuWidth) {
                    placeBottom({ triggerRect, menuCurrent, style, cropt: false, placeHor: 'right' });
                } else if (spaceTop >= menuHeight && spaceLeft >= menuWidth) {
                    placeTop({ triggerRect, menuCurrent, style, cropt: false, placeHor: 'left' });
                } else if (spaceTop >= menuHeight && spaceRight >= menuWidth) {
                    placeTop({ triggerRect, menuCurrent, style, cropt: false, placeHor: 'right' });
                } else {
                    placeBottom({ triggerRect, menuCurrent, style, cropt: true, placeHor: 'left' });
                }
            }

            else if (placement === 'center-trigger') {
                style.top = `${(triggerRect.bottom / 2) > 200 ? (triggerRect.bottom / 2) : 200}px`;
                style.left = `${triggerRect.right / 2}px`;
                style.transformOrigin = `top`;
            }
            else if (placement === 'center') {
                style.top = `${(window.innerHeight - menuHeight) / 2}px`;
                style.left = `${(window.innerWidth - menuWidth) / 2}px`;
                style.transformOrigin = `center`;
            }
            else if (placement === 'up-bottom-right') {
                style.top = `${triggerRect.bottom - triggerRect.height}px`;
                style.left = `${triggerRect.right - menuWidth > 0 ? (triggerRect.right - menuWidth - triggerRect.width / 2) : 0}px`;
                style.transformOrigin = `top`;
            }
            // else {
            //     // Default/fallback: bottom placement with reduced height and overflow
            //     style.top = `${triggerRect.bottom}px`;
            //     style.left = `${triggerRect.left}px`;
            //     style.transformOrigin = `top`;
            //     style.maxHeight = `calc(100vh - ${triggerRect.bottom + 16}px)`;
            //     style.overflowY = 'auto';
            //     style.backgroundColor = 'purple';
            // }
        }
        if (style !== menuStyle && open) setMenuStyle(style);

    }, [open]);

    const handleTriggerClick = () => {
        // Close all other open menus before opening this one
        openMenus.forEach((close: any) => {
            if (close !== handleClose) close();
        });
        if (isControlled) {
            setOpen?.(!open);
            setVisible(true);
        } else {
            setInternalOpen(!open);
            setVisible(true);
        }
    };

    const [visible, setVisible] = useState(isVisible ?? false);
    const [openPortal, setOpenPortal] = useState(open);

    useEffect(() => {
        setVisible(false);
    }, []);

    useEffect(() => {
        if (open) setOpenPortal(true);
        if (visible && !open) setTimeout(() => setOpenPortal(false), 500);
    }, [open, visible]);

    // MODIFIÉ : Création d'une variable pour le contenu du menu pour plus de clarté
    const menuContent = (
        <div
            data-md3-menu
            aria-expanded={open}
            id={'menu-button_' + MenuKey}
            key={'menu-button_' + MenuKey}
            ref={menuRef || menuRefAuto}
            style={{
                ...menuStyle,
                width: fitMax ? `${triggerRect?.width}px` : '',
            }}
            className={` ${className || ""} 
            md3-menu md3-elevation 
            ${visible ? "" : "invisible"}
            ${left && (!open ? "md3-animation-slide-out-left" : "md3-animation-slide-left")}
            ${!left && (open ? "md3-menu-enter" : "md3-menu-leave")}
            `} >

            <div className={`
            ${(open) ? "!z-auto " : " z-0 "}`}
                ref={menuCurrent}>

                <div className="md3-menu-list">
                    <div onClick={handleClose}
                        className="md3-menu-header flex w-full items-center py-1 px-2 justify-between">
                        {title &&
                            <div className="flex-1 font-medium  -mb-1 p-3 text-[0.95rem] ">
                                {title}
                            </div>}
                        {closeIcon ??

                            <Icon
                                onClick={handleClose}
                                icon='close'
                                bg color='slate'
                                size='sm' />
                        }
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div
                ref={containerRef}
                key={MenuKey}
                data-md3-menu
                className={`md3-menu-container ${containerClassName ?? ''}  ${(menuRef || menuRefAuto) ? "" : "relative"} `}>

                {(trigger) && React.cloneElement(
                    trigger as React.ReactElement,
                    {
                        ref: root,
                        onClick: handleTriggerClick,
                        'aria-haspopup': 'menu',
                        'aria-expanded': open,
                        id: 'menu-button',
                    }
                )}

                {/* MODIFIÉ : On utilise le portail pour afficher le menu */}
                {(openPortal || open) && portalRoot && createPortal(menuContent, portalRoot)}
            </div>

            {/* MODIFIÉ : On utilise aussi le portail pour le fond flou */}
            {openPortal && blurBack && portalRoot && createPortal(
                <BackDropBlur
                    blurKey={'menu-blur' + MenuKey}
                    open={openPortal}
                    setOpen={handleClose}
                    className="z-[2]"
                />,
                portalRoot
            )}
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
        key={value || (typeof children === 'string' ? children : undefined)}
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



