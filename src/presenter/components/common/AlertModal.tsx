
import parse from 'html-react-parser';
import { useAlertStore } from "../../../application/stores/alert.store";
import { AlertValues } from "../../../domain/entities/Error";
import { useUxStore } from "../../../application/stores/ux.store";
import { CardMD } from "../shared/base/baseComps/Cards";
import { Button } from '../shared/base/baseComps/Buttons';


export const AlertModal = ({ values }: { values: AlertValues }) => {
    const { title, element, disableConfirm = false, confirmString, button2, isOpen, close, notif, disableCancel } = values;
    const { open, setOpen } = useAlertStore(state => state)
    const { color } = useUxStore(state => state)
    const { reset } = useAlertStore(state => state)



    if (isOpen || open) return (
        <div key={title ?? 'alert-modal'}
            className={`!absolute top-0 left-0 h-screen px-[3rem] py-[10vh] lg:py-[20vh] w-screen z-[9] !flex flex-1 justify-center items-center backdropBlur bg-black/50  `} >
            <div>
                <CardMD className="relative md3-elevation-4 min-h-min  w-resp m-auto flex max-h-[400px] ">
                    <CardMD.Headline className="pt-4">
                        {title ?? 'Alerte'}
                    </CardMD.Headline>
                    <CardMD.MidSection className=" max-h-[70vh] h-max  flex flex-col ">
                        {notif && <p className="text-center italic text-red-800">{notif}</p>}
                        <div className="overflow-auto flex w-full max-h-max justify-center ">
                            {element && typeof element === 'string' ?
                                <p className="md3-card-subhead pt-[2vh] pb-[4vh] my-4">
                                    {parse(element as string)}</p> :
                                <>{element}</>
                            }
                        </div>
                    </CardMD.MidSection>
                    <CardMD.Footer className=" !justify-end !pb-4 !items-end  flex flex-wrap ">
                        {!disableCancel &&
                            <Button
                                color='slate'
                                size='large'
                                className='w-full'
                                variant='outlined'
                                onClick={() => {
                                    close && close();
                                    setOpen(false);
                                    reset();
                                }}
                                icon={{
                                    style: 'absolute left-2',
                                    bg: true,
                                    reverse: true,
                                    icon: "close",
                                    size: 'md'
                                }}
                            >
                                Annuler
                            </Button>}
                        {button2 &&
                            <Button
                                size='large'
                                className='w-full'
                                variant='outlined'
                                color='error'
                                type="button"
                                onClick={() => {
                                    button2.onClick()
                                    close && close() || setOpen(false);
                                    reset();
                                }}>
                                {button2.text ?? ''}
                            </Button>}
                        <Button
                            size='large'
                            color={color as any}
                            type="button"
                            disabled={notif ? true : false}
                            className={`w-full ${!disableConfirm ? '' : 'hidden'} `}
                            onClick={() => {
                                values.handleConfirm && values.handleConfirm();
                                close && close() || setOpen(false);
                                reset();
                            }}
                            icon={{
                                style: 'absolute left-2',
                                icon: "check",
                                size: 'md',
                                bg: true
                            }}>
                            {confirmString || 'OK'}
                        </Button>
                    </CardMD.Footer>
                </CardMD>
            </div>
        </div>
    );
}
