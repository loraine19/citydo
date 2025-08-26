import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useState } from 'react';
import { AuthHeader } from './auth.Comps/AuthHeader';
import { Typography, Button, Card, CardBody, Input } from '@material-tailwind/react';
import { useSearchParams } from 'react-router-dom';
import DI from '../../../../di/ioc';
import { DeleteDTO } from '../../../../infrastructure/DTOs/AuthDTO';
import { UserDTO } from '../../../../infrastructure/DTOs/UserDTO';
import { useUserStore } from '../../../../application/stores/user.store';
import { Icon } from '../../common/IconComp';


export default function DeleteAccountPage() {
    const [searchParams] = useSearchParams();
    const user = useUserStore(state => state.user)
    const [notif, setNotif] = useState<string>('Vous aller supprimer votre compte, ainsi que toutes vos données');
    const params = { email: searchParams.get("email"), token: searchParams.get("token") }
    const { email, token } = params
    if (!user || user.email !== email) { window.location.href = '/signin?msg=Vous devez vous connecter' }

    const deleteAccountConfirm = async (data: DeleteDTO) => await DI.resolve('deleteAccountConfirmUseCase').execute(data)

    const formSchema = object({
        email: string().required("email est obligatoire").min(8, "minimum 8 charactères"),
    })

    const formik = useFormik({
        initialValues: new UserDTO(user),
        validationSchema: formSchema,
        onSubmit: async values => {
            formik.values = values
            const data: DeleteDTO = { email: email as string, deleteToken: token as string }
            const deleteAccount = await deleteAccountConfirm(data)
            if (deleteAccount.message) {
                setNotif(deleteAccount?.message);
                setTimeout(() => { window.location.href = '/signin?msg=' + deleteAccount?.message }, 1000);
            }
            else if (deleteAccount.error) { setNotif(deleteAccount?.error) }
            else { setNotif('une erreur est survenue') }
        },
    });


    return (
        <>

            <div className=" w-respLarge flex justify-between items-center">
                <AuthHeader />
                <Icon
                    fill
                    size='3xl'
                    icon='cancel'
                    title='fermer'
                    link='/' />
            </div>
            <form onSubmit={formik.handleSubmit}
                className='flex flex-col gap-8 w-full  py-[5vh] '>
                <main className='flex  flex-col items-center gap-4 pb-2'>
                    <Card className='w-respLarge flex py-4 flex-col items-center'>
                        <CardBody className='flex w-full w-resp flex-col text-center gap-4'>
                            <Typography
                                variant="h5"
                                color="blue-gray"
                                className="mb-2">
                                Suppression de compte
                            </Typography>
                            <Typography
                                color="gray"
                                className="mb-4">
                                {notif}
                            </Typography>
                            <Input
                                labelProps={{ className: "before:content-none after:content-none" }}
                                className={`inputStandart ${formik.errors.email ? 'error' : ''}`}
                                placeholder={'email'}
                                name="email"
                                value={email as string}
                                disabled={true} />
                        </CardBody>
                    </Card>
                </main>
                <footer className="flex justify-center w-respLarge">
                    <Button
                        type="submit"
                        size="lg"
                        className="lgBtn"
                        color="red" >
                        <Icon
                            color="white"
                            icon="delete"
                            size='3xl'
                            title='fermer'
                        />
                        Confirmer la suppression
                    </Button>

                </footer>
            </form>

        </>
    )
}