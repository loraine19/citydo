import React, { ReactNode, useRef, useState, useLayoutEffect, useEffect } from "react";
// AJOUTÉ : Importer createPortal
import { createPortal } from "react-dom";
import { Icon } from "../../../common/IconComp";
import BackDropBlur from "./BackDropBlur";

interface MenuProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    anchorEl?: HTMLElement | null;
    className?: string;
    children: ReactNode;
    placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'auto' | 'center-trigger' | 'center' | 'up-bottom-right' | 'free';
    onClose?: () => void;
    trigger?: ReactNode;
    closeIcon?: ReactNode;
    blurBack?: boolean;
    menuRef?: React.RefObject<HTMLDivElement>;
    key: string | number;
    fitMax?: boolean;
    title?: string;
    left?: boolean;
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
    key,
    title,
    left = false
}) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = controlledOpen;
    const open = isControlled ? controlledOpen : internalOpen;
    const menuRefAuto = useRef<HTMLDivElement>(null);
    const root = document.getElementById("root");

    // AJOUTÉ : État pour stocker l'élément racine du portail
    const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

    // AJOUTÉ : Effet pour trouver la div#app après le premier rendu
    useEffect(() => {
        const rootEl = document.getElementById('app') || document.body;
        setPortalRoot(rootEl);
    }, []);


    // Global set to track open menus
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
            if (menuNode) {
                handleClose();
            }
        };
        handleClickOutside();
    }, [path]);

    // Close menu on click outside
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
    }, [open, handleClose]);


    const triggerRef = useRef<HTMLDivElement>(null);
    const menuCurrent = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerWidth = triggerRef.current?.offsetWidth ?? 44;
    const triggerRect = containerRef.current ? containerRef.current.getBoundingClientRect() : null;
    const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
    const [placement, setPlacement] = useState<string | null>(givenPlacement);

    useLayoutEffect(() => {
        let style: React.CSSProperties = {};

        if (triggerRect && menuCurrent.current) {
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const menuHeight = menuCurrent.current.clientHeight;
            const menuWidth = menuCurrent.current.offsetWidth;

            // Calculate available space
            const spaceBelow = viewportHeight - triggerRect.bottom;
            const spaceAbove = triggerRect.top;
            const spaceRight = viewportWidth - triggerRect.right;
            const spaceLeft = triggerRect.left;

            if (placement === 'free') {
            }
            if ((placement === 'top-left'
                || placement === 'auto') && (spaceLeft >= menuWidth
                    && (spaceAbove >= menuHeight) && spaceAbove >= 250)) {
                style.position = 'fixed';
                style.top = `${(triggerRect.top - menuHeight) > 50 ? (triggerRect.top - menuHeight) : 50}px`;
                style.left = `${triggerRect.left - menuWidth}px`;
                style.transformOrigin = `bottom`
            }
            else if ((placement === 'top-right'
                || placement === 'auto') && (spaceRight >= menuWidth
                    && (spaceAbove >= menuHeight) && spaceAbove >= 250)
            ) {
                style.position = 'fixed';
                style.top = `${(triggerRect.top - menuHeight) > 50 ? (triggerRect.top - menuHeight) : 50}px`;
                style.left = `${triggerRect.left}px`;
                style.transformOrigin = `bottom`;
            }
            else if ((placement === 'bottom-left'
                || placement === 'auto')
                && (spaceLeft >= menuWidth && spaceBelow >= menuHeight)) {
                style.position = 'fixed';
                style.top = `${triggerRect.bottom}px`;
                style.left = `${triggerRect.left - menuWidth}px`;
                style.transformOrigin = `top`
            }
            else if (placement === 'bottom-right' || placement === 'auto') {
                if (spaceRight >= menuWidth && spaceBelow >= menuHeight) {
                    style.position = 'fixed';
                    style.top = `${triggerRect.bottom}px`;
                    style.left = `${triggerRect.left}px`;
                    style.transformOrigin = `top`
                }
                else (setPlacement('up-bottom-right'))
            }

            //Centrer on triiger center if no space
            else if (placement === 'center-trigger') {
                style.position = 'fixed';
                style.top = `${(triggerRect.bottom / 2) > 200 ? (triggerRect.bottom / 2) : 200}px`;
                style.left = `${triggerRect.right / 2}px`;
                style.transformOrigin = `top`
            }
            else if (placement === 'center') {
                style.position = 'fixed';
                style.top = `${(viewportHeight - menuHeight) / 2}px`;
                style.left = `${(viewportWidth - menuWidth) / 2}px`;
                style.transformOrigin = `center`
            }

            else if (placement === 'up-bottom-right') {
                style.position = 'fixed';
                style.top = `${triggerRect.bottom - triggerRect.height}px`;
                style.left = `${triggerRect.right - menuWidth > 0 ? (triggerRect.right - menuWidth - triggerWidth / 2) : 0}px`;
                style.transformOrigin = `top`
            }
            else {
                style.position = 'fixed';
                style.top = `${(triggerRect.bottom + menuHeight) < viewportHeight
                    ? triggerRect.bottom
                    : Math.max(0, viewportHeight - menuHeight - triggerRect.height)
                    }px`;
                style.left = `${(triggerRect.right + menuWidth + triggerWidth) < viewportWidth ?
                    ((triggerRect.right - menuWidth / 2) + triggerWidth / 2) :
                    ((viewportWidth / 2 - (menuWidth / 2)) - (triggerWidth / 2))}px`;
                style.transformOrigin = `top`
            }
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

    const [visible, setVisible] = useState(false);
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
            id={'menu-button_' + key}
            key={key}
            ref={menuRef || menuRefAuto}
            style={{
                ...menuStyle,
                maxWidth: fitMax ? `${triggerWidth}px` : ''
            }}
            className={` ${className || ""} 
            md3-menu md3-elevation 
            ${visible ? "" : "invisible"}
            ${left && (!open ? "md3-animation-slide-out-left" : "md3-animation-slide-left")}
            ${!left && (open ? "md3-menu-enter" : "md3-menu-leave")}
            `} >

            <div className={`
            ${(open) ? "!z-auto" : " z-0 "}`}
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
                key={key}
                data-md3-menu
                className={`md3-menu-container  ${(menuRef || menuRefAuto) ? "" : "relative"} `}>

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
                    key={'backdrop-blur' + key}
                    open={openPortal}
                    setOpen={handleClose}
                    className="z-[1]"
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



