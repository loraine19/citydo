import { useEffect, useState } from "react";
import { Icon } from "../common/IconComp";
import { useUxStore } from "../../../application/stores/ux.store";

type NotifDivProps = {
    notif: string;
    isLoading: boolean;
    refetch: () => void;
    error?: any;
}
const NotifDiv: React.FC<NotifDivProps> = ({ notif, isLoading, refetch, error }) => {
    const { color } = useUxStore((state) => state);
    let [attempt, setAttempt] = useState<number>(0);

    useEffect(() => {
        if (attempt < 2 && !isLoading && !error) setTimeout(() => {
            notif; refetch(); attempt++
        }, 1000);
    }, [notif, error]);

    return (
        <div className={`notif min-w-max min-h-max !justify-start `}>
            {error ? 'Une erreur est survenue : ' : ''}
            {notif}
            <span
                style={{ display: 'inline-block', transition: 'transform 0.5s' }}
                className={''}
                onClick={e => {
                    e.stopPropagation();
                    const el = e.currentTarget;
                    el.classList.add('spin');
                    setAttempt(attempt + 1);
                    setTimeout(() => { el.classList.remove('spin'); refetch() }, 700);
                }}
            >
                <Icon
                    style={(attempt > 2 || isLoading || error) ? '!hidden' : ''}
                    color={color}
                    size='3xl'
                    title="Recharger la liste"
                    bg={!isLoading}
                    icon={'refresh'}
                />
            </span>

        </div>
    )
}
export default NotifDiv