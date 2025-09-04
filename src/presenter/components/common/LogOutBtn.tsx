import { Icon } from "./IconComp";
import DI from "../../../di/ioc";

type LogOutButtonProps = {
    size?: string;
    style?: string;
}
export const LogOutButton = ({ size = "lg", style }: LogOutButtonProps) => {
    const logOut = () => DI.resolve('logOutUseCase').execute();
    return <Icon
        bg
        icon="exit_to_app"
        size={size}
        style={` z-30 hover:!bg-red-100 hover:!text-red-700 ${style}`}
        onClick={
            async () => {
                const { message } = await logOut();
                message && location.replace('/signin?msg=' + message)
            }} title="se déconnecter" />
}