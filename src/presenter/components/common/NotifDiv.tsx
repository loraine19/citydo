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

    useEffect(() => {
        if (attempt <= 2 && (notif || error)) setTimeout(() => {
            notif;
            refetch();
            attempt++
        }, 500);
    }, [notif, error, isLoading, attempt]);

    useEffect(() => {
        if (error === 'session expirée' && attempt > 3) window.location.replace('/signin');
    }, [error]);

    return (
        <div
            id='notifDiv'
            className={`!max-w-full absolute !top-[1rem] h-fit w-full left-0 notif min-w-max  min-h-max !justify-start  ${className}`}>
            {error ? 'Une erreur est survenue : ' : ''}
            <span className="md3-card-subhead opacity-70 w-full text-center pt-4 ">{notif !== error && notif} </span>
            <div
                style={{ display: 'inline-block', transition: 'transform 0.5s' }}
                className={'py-3 '}
                onClick={e => {
                    const el = e.currentTarget;
                    el.classList.add('spin');
                    setAttempt(attempt + 1);
                    refetch();
                    setTimeout(() => { el.classList.remove('spin'); refetch() }, 700);
                }}
            >
                <Icon
                    reverse
                    style={(attempt > 3) ? '!hidden' : 'md3-elevation-1'}
                    color={color}
                    size='3xl'
                    title="Recharger la liste"
                    bg={!isLoading}
                    icon={'refresh'}
                />
            </div>

        </div>
    )
}
export default NotifDiv