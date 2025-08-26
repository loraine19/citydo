import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import parse from 'html-react-parser';
import { Icon } from "./IconComp";

export type ConfirmModalProps = {
    open: boolean;
    handleConfirm: () => void;
    handleCancel: () => void;
    title: string;
    element: string | any;
    disableConfirm?: boolean;
    confirmString?: string;
}
export const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, handleConfirm, handleCancel, disableConfirm, title, element, confirmString = 'Confirmer' }) => {
    if (open) return (
        <div className="!absolute top-0 h-full w-full z-50 !flex flex-1 justify-center items-center backdropBlur">

            <Card
                className="relative h-min w-respLarge m-auto flex ">
                <CardHeader
                    className="FixCardHeaderNoImage flex items-center justify-between p-4 text-center text-xl">
                    <Typography
                        as="h5">
                        {title}
                    </Typography>

                    {!disableConfirm && <Icon
                        onClick={handleCancel}
                        icon="cancel"
                        size="3xl"
                        color="red" />}

                </CardHeader>

                <CardBody className="
                FixCardBody min-h-[18vh] max-h-[80vh] flex flex-col overflow-auto gap-6">
                    <hr></hr>{element && typeof element === 'string' ? parse(element as string) : element}
                </CardBody>
                <CardFooter className="justify-end FixCardFooter flex gap-8 pt-0">

                    <Button
                        size='lg'
                        className="rounded-full bg-cyan-500"
                        onClick={() => { handleConfirm() }}>
                        {confirmString}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}