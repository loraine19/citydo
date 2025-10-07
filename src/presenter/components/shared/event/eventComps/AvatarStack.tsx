import { Participant } from "../../../../../domain/entities/Participant";
import { Icon } from "../../../common/IconComp";
import { OnlineDot } from "../../../common/onlineDot";
import { AvatarUser } from "../../../common/AvatarUser";
import { Menu, MenuItem } from "../../base/baseComps/Menu";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

type AvatarStackProps = { avatarDatas: Participant[], ref?: boolean };
export function AvatarStack(props: AvatarStackProps) {
    const { avatarDatas } = props;
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const AVATAR_WIDTH = 44;
    const AVATAR_OVERLAP = 12;
    const [open, setOpen] = useState(false);
    const [maxVisible, setMaxVisible] = useState(1);
    const [selectedAvatar, setSelectedAvatar] = useState<number>(0);

    function updateMaxVisible() {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            let calculated = 1;
            if (avatarDatas?.length > 1) {
                calculated = Math.floor(
                    ((containerWidth - 14) - AVATAR_WIDTH) / (AVATAR_WIDTH - AVATAR_OVERLAP)
                ) + 1;
            }
            calculated = Math.max(1, Math.min(calculated, avatarDatas?.length));
            setMaxVisible(calculated);
        } else {
            setMaxVisible(1);
        }
    }
    useEffect(() => {

        updateMaxVisible();
        window.addEventListener("resize", updateMaxVisible);
        let resizeObserver: ResizeObserver | undefined;
        if (containerRef.current) {
            resizeObserver = new ResizeObserver(updateMaxVisible);
            resizeObserver.observe(containerRef.current);
        }

        return () => window.removeEventListener("resize", updateMaxVisible);
    }, [avatarDatas?.length, containerRef.current?.offsetWidth]);

    const visibleAvatars = avatarDatas?.slice(0, maxVisible);
    const hiddenCount = avatarDatas?.length - visibleAvatars?.length > 0
        ? <Icon
            bg
            textIcon={`+${avatarDatas?.length - visibleAvatars?.length}   `}
            size="md"
            onClick={() => setMaxVisible(avatarDatas?.length)}
            color='cyan'
            style=" !border-[4px] !h-[2.65rem] !font-semibold !text-[1rem] !w-[2.65rem] flex md3-border-primary-container "
        >

        </Icon>
        : null;

    return (
        <div
            onScroll={(e) => (e.currentTarget.scrollLeft <= 2) && updateMaxVisible()}
            ref={containerRef}
            className={` ${maxVisible === avatarDatas?.length ? 'overflow-x-auto' : ''} 
                flex flex-1 items-center -space-x-3.5 overflow-x-auto w-full !rounded-full pr-3 overflow-y-hidden `}
        >
            {visibleAvatars?.map((Participant: Participant) => {
                return (
                    <Menu
                        open={open && selectedAvatar === Participant?.userId}
                        setOpen={(open: boolean) => {
                            setSelectedAvatar(Participant?.userId);
                            setOpen(open);

                        }}
                        MenuKey={Participant?.userId + '_avatar'}
                        className="px-2"
                        blurBack
                        placement={'auto'}
                        trigger={
                            <div className="relative !h-[2.65rem] !w-[2.65rem] flex hover:!z-[1] ">
                                <div className="absolute hover:!z-[1] flex flex-1 top-0 left-0 h-[2.65rem] !w-[2.65rem] ">
                                    <AvatarUser
                                        Profile={Participant?.User?.Profile}
                                        avatarSize={'md'}
                                        avatarStyle="border-[4px] !h-[2.65rem] !w-[2.65rem] md3-border-primary-container !hover:z-[2] !focus:z-[2] !shadow-none  top-0 left-0 " />
                                </div>
                            </div>}>
                        <MenuItem
                            disabled
                            leadingIcon={
                                <div className=" relative">
                                    <AvatarUser
                                        Profile={Participant.User?.Profile}
                                        avatarSize={'2xl'} />
                                    <OnlineDot id={Participant?.userId} />
                                </div>}>

                            <span className="font-bold">
                                {Participant?.User?.Profile?.firstName}<br />
                                {Participant?.User?.Profile?.lastName}
                            </span>
                        </MenuItem>
                        <MenuItem
                            title={`Envoyer un message à ${Participant?.User?.Profile?.firstName}`}
                            onClick={() => navigate(`/chat?with=${Participant?.userId}`)}
                            leadingIcon={<Icon icon="chat" color='sky' fill size='lg' bg />}>
                            Envoyer un message
                        </MenuItem>
                        <MenuItem
                            disabled
                            className="pointer-events-none"
                            leadingIcon={<Icon icon="group" fill size="lg" bg />}>
                            <div className="flex flex-col">
                                <span>Groupes : </span>
                                {Participant?.User?.GroupUser?.map((group, index) =>
                                    <small key={index} className="!line-clamp-1">
                                        ⌖ {group?.Group?.name?.split(':')[0]}
                                    </small>)}
                            </div>
                        </MenuItem >
                    </Menu >)
            })}
            <div className="relative !h-[2.65rem] !z-[1] !w-[2.65rem] flex hover:!z-[4] ">
                <div className="absolute hover:!z-[4] flex flex-1 top-0 left-0 h-[2.65rem] !w-[2.65rem] ">
                    <div>
                        {hiddenCount}
                    </div>
                </div>
            </div>
        </div >
    );
}