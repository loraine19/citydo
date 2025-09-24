import { ReactNode } from "react";
import { CardMD } from "../shared/base/baseComps/Cards";
import { Icon } from "./IconComp";


type CardConfirmFormProps = {
    title: ReactNode;
    content: ReactNode;
};

export const CardConfirmForm: React.FC<CardConfirmFormProps> = ({
    title,
    content,
}) => (
    <CardMD variant="outlined">
        <CardMD.Header>
            <Icon color="green" bg icon="check" />
        </CardMD.Header>
        <CardMD.Headline>
            {title}
        </CardMD.Headline>
        <CardMD.SupportingText className="flex !max-h-[25vh]  overflow-auto flex-col gap-2">
            {content}
        </CardMD.SupportingText>
    </CardMD>
);