import { Participant } from "../../../../../domain/entities/Participant";
import { Icon } from "../../../common/IconComp";
import { OnlineDot } from "../../../common/onlineDot";
import { AvatarUser } from "../../../common/AvatarUser";
import { Menu, MenuItem } from "../../base/baseComps/Menu";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Chip from "../../../common/adaptatersComps/Chip";

type AvatarStackProps = { avatarDatas: Participant[], ref?: boolean };
export function AvatarStack(props: AvatarStackProps) {
    const { avatarDatas } = props;
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const AVATAR_WIDTH = 44;
    const AVATAR_OVERLAP = 12;
    const [open, setOpen] = useState(false);

    const [maxVisible, setMaxVisible] = useState(1);

    useEffect(() => {
        function updateMaxVisible() {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                let calculated = 1;
                if (avatarDatas.length > 1) {
                    calculated = Math.floor(
                        ((containerWidth - 14) - AVATAR_WIDTH) / (AVATAR_WIDTH - AVATAR_OVERLAP)
                    ) + 1;
                }
                calculated = Math.max(1, Math.min(calculated, avatarDatas.length));
                setMaxVisible(calculated);
            } else {
                setMaxVisible(1);
            }
        }
        updateMaxVisible();
        window.addEventListener("resize", updateMaxVisible);
        let resizeObserver: ResizeObserver | undefined;
        if (containerRef.current) {
            resizeObserver = new ResizeObserver(updateMaxVisible);
            resizeObserver.observe(containerRef.current);
        }

        return () => window.removeEventListener("resize", updateMaxVisible);
    }, [avatarDatas.length, containerRef.current?.offsetWidth]);

    const visibleAvatars = avatarDatas.slice(0, maxVisible);
    const hiddenCount = avatarDatas.length - visibleAvatars.length > 0
        ? <Chip
            onClick={() => setMaxVisible(avatarDatas.length)}
            color='cyan'
            value={`+${avatarDatas.length - visibleAvatars.length}`}
            className=" !border-[4px] !h-[2.65rem] !w-[2.65rem] flex items-center justify-center !rounded-full md3-cyan-container shrink-0 font-semibold !border-[var(--md3-primary-container)] text-[1rem] pt-0.5 pr-0.5 p-0"
        />
        : null;

    return (
        <div
            onScroll={
                (e) => {
                    if (e.currentTarget.scrollLeft === 0) {
                        setMaxVisible(visibleAvatars.length);
                    }
                }
            }
            ref={containerRef}
            className={` ${maxVisible === avatarDatas.length ? 'overflow-y-auto' : ''} flex flex-1 items-center -space-x-3 overflow-x-auto w-full !rounded-full pr-3 `}
        >
            {visibleAvatars?.map((Participant: Participant, index) =>
                <Menu
                    open={open}
                    setOpen={setOpen}
                    MenuKey={Participant.userId + index + '_avatar'}
                    className="px-2"
                    blurBack
                    placement={'auto'}
                    trigger={
                        <div className="relative !h-[2.65rem] !w-[2.65rem] flex hover:!z-[1] ">
                            <div className="absolute hover:!z-[1] flex flex-1 top-0 left-0 h-[2.65rem] !w-[2.65rem] ">
                                <AvatarUser
                                    Profile={Participant?.User?.Profile}
                                    avatarSize={'md'}
                                    avatarStyle="border-[4px] !h-[2.65rem] !w-[2.65rem] !border-[var(--md3-primary-container)] !hover:z-[2] !focus:z-[2] !shadow-none  top-0 left-0 " />
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

                        <span className="font-bold">{Participant?.User?.Profile?.firstName}<br /> {Participant?.User?.Profile?.lastName}
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
                        leadingIcon={<Icon icon="groups" fill size="lg" bg />}>
                        <div className="flex flex-col">
                            <span>Groupes : </span>
                            {Participant?.User?.GroupUser?.map((group, index) =>
                                <small key={index}
                                    className="!line-clamp-1">⌖ {group?.Group?.name.split(':')[0]}
                                </small>)}
                        </div>
                    </MenuItem >

                </Menu >

            )
            }
            <div className="relative !h-[2.65rem] !z-[1] !w-[2.65rem] flex hover:!z-[4] ">
                <div className="absolute hover:!z-[4] flex flex-1 top-0 left-0 h-[2.65rem] !w-[2.65rem] ">
                    <div>{hiddenCount}</div>
                </div>
            </div>

        </div >
    );
}