import React, { ReactNode, useState, useRef, } from 'react';




interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    anchorElement: HTMLElement | null;
}

export const Menu: React.FC<MenuProps> = ({ isOpen, onClose, children, anchorElement }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [menuStyle, setMenuStyle] = useState({});

    React.useLayoutEffect(() => {
        if (isOpen && anchorElement && menuRef.current) {
            const rect = anchorElement.getBoundingClientRect();
            setMenuStyle({ top: rect.bottom, left: rect.left });
        }
    }, [isOpen, anchorElement]);

    return (
        <>
            <div className={`md3-scrim ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
            <div className={`md3-menu ${isOpen ? 'open' : ''}`} style={menuStyle} ref={menuRef} data-md3 onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </>
    );
};

interface MenuItemProps {
    children: ReactNode;
    onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
    return <div className="md3-menu-item" onClick={onClick}>{children}</div>;
};



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

// interface TabProps {
//     label: string;
//     tab: string;
// }


