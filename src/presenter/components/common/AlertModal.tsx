import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import parse from 'html-react-parser';
import { Icon } from "./IconComp";
import { useAlertStore } from "../../../application/stores/alert.store";
import { AlertValues } from "../../../domain/entities/Error";


export const AlertModal = ({ values }: { values: AlertValues }) => {
    const { title, element, disableConfirm = false, confirmString, button2, isOpen, close, notif } = values;
    const { open, setOpen } = useAlertStore(state => state)

    if (isOpen || open) return (
        <div className={`!absolute top-0 left-0 h-screen px-[3rem] py-[10vh] lg:py-[20vh] w-screen z-[1500] !flex flex-1 justify-center items-center backdropBlur `} >
            <Card className="relative FixCardNoImage min-h-min !p-8 w-resp m-auto flex max-h-[400px] ">
                <CardHeader
                    className="FixCardHeaderNoImage flex items-center justify-between p-4 text-center text-xl">
                    <Typography
                        as="h6">{title}
                    </Typography>
                    {!disableConfirm &&
                        <Icon
                            onClick={() => { close && close() || setOpen(false) }}
                            icon="cancel"
                            size="xl"
                            color="red" />}
                </CardHeader>
                <CardBody className="
                FixCardBody max-h-[70vh] flex flex-col !overflow-auto gap-6">
                    <hr className="pb-8"></hr>
                    {notif && <p className="text-center italic text-red-800">{notif}</p>}
                    {element && typeof element === 'string' ? parse(element as string) : element}
                </CardBody>
                <CardFooter className="justify-end FixCardFooter max-w-full flex flex-wrap gap-8 py-6">
                    {button2 &&
                        <Button
                            color="error"
                            type="button"
                            size='lg'
                            className=" text-white lgBtn max-w-max"
                            onClick={() => {
                                button2.onClick()
                            }}>
                            {button2.text ?? '-'}
                        </Button>}
                    {<Button
                        type="button"
                        color="primary"
                        disabled={notif ? true : false}
                        size='lg'
                        className="rounded-full text-white lgBtn max-w-max"
                        onClick={() => {
                            values.handleConfirm && values.handleConfirm();
                            // close && close() || setOpen(false)
                        }
                        }>
                        {confirmString || 'OK'}
                    </Button>}
                </CardFooter>
            </Card>
        </div>
    );
}
