import React from "react";
import { Icon } from "./IconComp";
import { MenuItem } from "../shared/base/baseComps/Menu";
import { useUxStore } from "../../../application/stores/ux.store";

interface ShareDivProps {
    url: string;
    text?: string;
}

const shareLinks = (url: string, text?: string) => ({
    email: `mailto:?subject=${encodeURIComponent(text || "Check this out!")}&body=${encodeURIComponent(url)}`,
    sms: `sms:?body=${encodeURIComponent(text ? `${text} ${url}` : url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text ? `${text} ${url}` : url)}`,
    snapchat: `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(url)}`,
});

export const ShareDiv: React.FC<ShareDivProps> = ({ url, text }) => {
    const links = shareLinks(url, text);
    const { color } = useUxStore(state => state)
    const menuItems = [
        {
            label: 'Email',
            icon: <Icon size="lg" bg fill color={color ?? 'slate'} icon="mail" />,
            link: links.email
        },
        {
            label: 'SMS',
            icon: <Icon size="lg" bg fill color={color ?? 'slate'} icon="sms" />,
            link: links.sms
        },
        {
            label: 'WhatsApp',
            icon: <Icon size="lg" bg fill color="green" icon="whatsapp" />,
            link: links.whatsapp
        },
        {
            label: 'Snapchat',
            icon: <Icon size="lg" bg fill color="orange" icon="snapchat" />,
            link: links.snapchat
        }
    ];

    return (


        <>
            {menuItems.map((item) => (
                <MenuItem
                    className="px-4"
                    leadingIcon={item.icon}
                    key={item.label}
                    onClick={() => {
                        window.open(item.link, "_blank");
                    }}
                >

                    {item.label}
                </MenuItem>
            ))}

        </>
    );
};

export default ShareDiv;