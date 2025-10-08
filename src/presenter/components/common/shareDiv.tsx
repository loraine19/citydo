import React from "react";
import { Icon } from "./IconComp";
import { MenuItem } from "../shared/base/baseComps/Menu";
import { useUxStore } from "../../../application/stores/ux.store";

interface ShareDivProps {
    url: string;
    text?: string;
}

const shareLinks = (url: string, text?: string) => {
    const introText = 'J\'ai trouvé quelque chose d\'intéressant sur City\'do : ';
    const linkedText = text
        ? `${introText}\n\n ** ${text} ** \n${url}\n\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015\nPartagé via City'do !\nhttps://citydo.fr`
        : url;
    return {
        email: `mailto:?subject=${encodeURIComponent(text || "Je te recommande sur City'do")}&body=${encodeURIComponent(linkedText)}`,
        sms: `sms:?body=${encodeURIComponent(linkedText)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(linkedText)}`,
        snapchat: `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(url)}`,
    };
};

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
        },
        {
            label: 'Copier le lien',
            icon: <Icon size="lg" fill bg color={'slate'} icon="content_copy" />,
            link: '#',
            onClick: () => {
                navigator.clipboard.writeText(url);
            }
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
                        item.onClick ? item.onClick() :
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