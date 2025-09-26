import { ReactNode } from "react";
import { CardMD } from "../shared/base/baseComps/Cards";
import { Icon } from "./IconComp";
import { useUxStore } from "../../../application/stores/ux.store";


type CardConfirmFormProps = {
    title: ReactNode;
    content: ReactNode;
};

export const CardConfirmForm: React.FC<CardConfirmFormProps> = ({
    title,
    content,
}) => {
    const { color } = useUxStore(state => state);
    return (
        <CardMD className="flex-1 !flex !min-w-full" variant="outlined">
            <CardMD.Header>
                <Icon color={color ?? "green"} bg icon="check" />
            </CardMD.Header>
            <CardMD.Headline>
                {title}xxx
            </CardMD.Headline>
            <CardMD.SupportingText className="flex !max-h-[35vh]   overflow-auto flex-col gap-2">
                {content}
            </CardMD.SupportingText>
        </CardMD>
    )
}