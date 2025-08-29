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
                <CardBody className="
                FixCardBody max-h-[70vh] overflow-auto items-center flex flex-col justify-between">
                    <hr className="pb-1"></hr>
                    {notif && <p className="text-center italic text-red-800">{notif}</p>}
                    <div className="overflow-auto flex w-full h-full justify-center items-center ">  <>{element && typeof element === 'string' ? parse(element as string) : element}</>
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
                        className={`rounded-full text-white lgBtn max-w-max bg-${color}-500`}
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
