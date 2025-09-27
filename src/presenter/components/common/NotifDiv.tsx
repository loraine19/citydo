import { useEffect, useState } from "react";
import { Icon } from "../common/IconComp";
import { useUxStore } from "../../../application/stores/ux.store";

type NotifDivProps = {
    notif: string;
    isLoading: boolean;
    refetch: () => void;
    error?: any;
    className?: string;
}
const NotifDiv: React.FC<NotifDivProps> = ({ notif, isLoading, refetch, error, className }) => {
    const { color } = useUxStore((state) => state);
    let [attempt, setAttempt] = useState<number>(0);
    const [opacity, setOpacity] = useState<string>('0');

    useEffect(() => {
        if (attempt <= 2 && (notif || error))
            setTimeout(() => {
                refetch();
                setAttempt(attempt + 1);
            }, 700);
    }, [notif, error, isLoading, attempt]);

    useEffect(() => {
        if (error === 'session expirée' && attempt > 3) window.location.replace('/signin');
    }, [error]);

    useEffect(() => {
        setOpacity((5 * attempt).toString());
    }, [notif, error, attempt]);

    return (
        <div
            id='notifDiv'
            className={`!max-w-full absolute !top-[1rem] h-fit w-full left-0 notif min-w-max min-h-max !justify-start  ${className}`}>
            {error ? 'Une erreur est survenue : ' : ''}
            <span className={`md3-card-subhead opacity-[${opacity}%] w-full text-center pt-4 `}>
                {notif !== error ? notif : error}
            </span>


            <Icon
                onClick={() => {
                    setAttempt(attempt + 1);
                    refetch();
                }}
                style={(attempt > 3) ? '!hidden' : ''}
                color={color}
                size='4xl'
                title="Recharger la liste"
                icon={(isLoading || attempt <= 2) ? 'progress_activity' : 'refresh'}
            />
        </div>
    )
}
export default NotifDiv