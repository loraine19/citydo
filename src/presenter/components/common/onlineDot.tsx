import { connectedUsersStore } from "../../../application/stores/connectedUsers.store";

interface OnlineDotProps {
    id: number;
    className?: string;
}

export const OnlineDot = ({ id, className = "-bottom-0 -left-1" }: OnlineDotProps) => {
    const connectedUsers = connectedUsersStore((state) => state.connectedUsers);
    const isOnline: boolean = connectedUsers.find((userId) => userId === id) ? true : false;
    return (
        <span title={isOnline ? "En ligne" : "Hors ligne"}
            className={`absolute !z-1 ${className}
        border-[2px] p-[4px] border-[var(--md3-primary-container)] inline-block w-1.5 h-1.5 rounded-full
        ${isOnline ? "bg-[var(--md3-green-container)]" : "invisible"}`}
        />
    );
};
