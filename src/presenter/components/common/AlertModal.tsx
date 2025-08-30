import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import parse from 'html-react-parser';
import { Icon } from "./IconComp";
import { useAlertStore } from "../../../application/stores/alert.store";
import { AlertValues } from "../../../domain/entities/Error";
import { useUxStore } from "../../../application/stores/ux.store";


export const AlertModal = ({ values }: { values: AlertValues }) => {
    const { title, element, disableConfirm = false, confirmString, button2, isOpen, close, notif } = values;
    const { open, setOpen } = useAlertStore(state => state)
    const { color } = useUxStore(state => state)

    if (isOpen || open) return (
        <div className={`!absolute top-0 left-0 h-screen px-[3rem] py-[10vh] lg:py-[20vh] w-screen z-[1500] !flex flex-1 justify-center items-center backdropBlur `} >
            <div>
                <Card className="relative FixCardNoImage min-h-min !p-4 w-resp m-auto flex max-h-[400px] ">
                    <CardHeader
                        className="FixCardHeaderNoImage flex items-center justify-between p-4 text-center text-xl">
                        <h4>{title}
                        </h4>
                        {!disableConfirm &&
                            <Icon
                                onClick={() => { close && close() || setOpen(false) }}
                                icon="cancel"
                                size="xl"
                                color="red" />}
                    </CardHeader>
                    <CardBody className="FixCardBody max-h-[70vh] h-max items-center flex flex-col ">
                        <hr className="pb-1"></hr>
                        {notif && <p className="text-center italic text-red-800">{notif}</p>}
                        <div className="overflow-auto flex w-full max-h-max justify-center ">
                            {element && typeof element === 'string' ?
                                <Typography as='h5' className="pt-[2vh] pb-[8vh] my-6">  {parse(element as string)}</Typography> :
                                <>{element}</>
                            }
                        </div>
                    </CardBody>
                    <CardFooter className="justify-end FixCardFooter max-w-full flex flex-wrap gap-8 py-6">
                        {button2 &&
                            <Button
                                className={`rounded-full text-white lgBtn max-w-max`}
                                color="error"
                                type="button"
                                size='lg'
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
                            className={`rounded-full text-white lgBtn max-w-max ${color}StyleInv`}
                            onClick={() => {
                                values.handleConfirm && values.handleConfirm();
                                // close && close() || setOpen(false)
                            }
                            }>
                            {confirmString || 'OK'}
                        </Button>}
                    </CardFooter>
                </Card></div>
        </div>
    );
}
