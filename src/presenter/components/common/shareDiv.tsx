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

    return (
        <div className="flex  flex-col  gap-2 pt-2">
            <p className="md3-card-subhead">  {text}</p>


            <MenuItem className=" "
                leadingIcon={

                    <Icon bg fill
                        color={color ?? 'slate'} icon="mail" />}>

                <a
                    href={links.email}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                >     <span >Email</span>
                </a>
            </MenuItem>
            <MenuItem
                leadingIcon={
                    <Icon
                        bg fill
                        color={color ?? 'slate'}
                        link={links.sms}
                        target="_blank"
                        rel="noopener noreferrer"
                        icon={'sms'} />
                }
            >
                <span >SMS</span>
            </MenuItem>
            <MenuItem leadingIcon={

                <Icon
                    bg fill
                    color="green"
                    link={links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={'whatsapp'} />}>
                <span >WhatsApp</span>
            </MenuItem>
            <MenuItem
                leadingIcon={
                    <Icon
                        bg fill
                        color="orange"
                        link={links.snapchat}
                        target="_blank"
                        rel="noopener noreferrer"
                        icon={'snapchat'} />}>
                <span >Snapchat</span>
            </MenuItem>

        </div>
    );
};

export default ShareDiv;