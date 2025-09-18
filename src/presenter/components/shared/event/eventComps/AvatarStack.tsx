import { Participant } from "../../../../../domain/entities/Participant";
import { Icon } from "../../../common/IconComp";
import { OnlineDot } from "../../../common/onlineDot";
import { AvatarUser } from "../../../common/AvatarUser";
import { Menu, MenuItem } from "../../base/baseComps/Menu";
import { useNavigate } from "react-router";

type AvatarStackProps = { avatarDatas: Participant[], ref?: boolean };
export function AvatarStack(props: AvatarStackProps) {
    const { avatarDatas } = props;
    const navigate = useNavigate();

    return (
        <div className="flex flex-1 items-center -space-x-3 overflow-x-auto overflow-y-hidden !rounded-full pr-3 ">
            {avatarDatas?.map((Participant: Participant, index) =>
                <Menu
                    className="px-2"
                    ref
                    blurBack
                    placement={'auto'}
                    key={index}
                    trigger={
                        <div className="relative !h-[2.65rem] !z-[1] !w-[2.65rem] flex hover:!z-[4] ">
                            <div className="absolute hover:!z-[4] flex flex-1 top-0 left-0 h-[2.65rem] !w-[2.65rem] ">
                                <AvatarUser
                                    Profile={Participant?.User?.Profile}
                                    avatarSize={'sm'}
                                    avatarStyle="border-2 !h-[2.65rem] !w-[2.65rem] !border-white !hover:z-50 !focus:z-50  top-0 left-0 " />
                            </div>
                        </div>}>
                    <MenuItem
                        disabled
                        leadingIcon={
                            <div className=" relative">
                                <AvatarUser
                                    Profile={Participant.User?.Profile}
                                    avatarSize={'lg'}
                                    avatarStyle="border-2 border-white scale-90" />

                                <OnlineDot id={Participant?.userId} />
                            </div>}>

                        <span className="font-bold">{Participant?.User?.Profile?.firstName}<br></br> {Participant?.User?.Profile?.lastName}
                        </span>
                    </MenuItem>
                    <MenuItem
                        disabled
                        className="pointer-events-none"
                        leadingIcon={<Icon icon="groups" color='sky' bg />}>
                        <div className="flex flex-col gap-1">
                            <span>Groupes : </span>
                            {Participant?.User?.GroupUser?.map((group, index) =>
                                <span key={index}
                                    className="!line-clamp-1">⌖ {group?.Group?.name.split(':')[0]}
                                </span>)}
                        </div>
                    </MenuItem>
                    <MenuItem
                        title={`Envoyer un message à ${Participant?.User?.Profile?.firstName}`}
                        onClick={() => navigate(`/chat/${Participant?.userId}`)}
                        leadingIcon={<Icon icon="chat" color='sky' bg />}>
                        Envoyer un message

                    </MenuItem>
                </Menu>

            )}
        </div >
    );
}