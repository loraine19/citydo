import { Typography } from "@material-tailwind/react";
import { Participant } from "../../../../../domain/entities/Participant";
import { Icon } from "../../../common/IconComp";
import { OnlineDot } from "../../../common/onlineDot";
import { AvatarUser } from "../../../common/AvatarUser";
import PopOver from "../../../common/oldcomp/PopOver";

type AvatarStackProps = { avatarDatas: Participant[] };
export function AvatarStack(props: AvatarStackProps) {
    const { avatarDatas } = props;

    return (
        <div className="flex flex-1 items-center -space-x-3 overflow-x-auto overflow-y-hidden rounded-full pr-3 ">
            {avatarDatas?.map((Participant: Participant, index) =>
                <PopOver
                    key={index}
                    trigger={
                        <div className="relative !h-[2.65rem]  !w-[2.65rem] flex hover:!z-50">
                            <div className="absolute hover:!z-50 flex flex-1 top-0 left-0 h-[2.65rem] !w-[2.65rem] ">
                                <AvatarUser
                                    Profile={Participant?.User?.Profile}
                                    avatarSize={'sm'}
                                    avatarStyle="border-2 !h-[2.65rem]  !w-[2.65rem] !border-white !hover:z-50 !focus:z-50  top-0 left-0 " />
                            </div>
                        </div>}
                    children={<div className="!z-[1000] card  !ml-2 !py-2">
                        <div className="p-4 w-auto flex gap-4 ">
                            <div className=" relative pt-2  pr-2">
                                <Icon
                                    color='orange'
                                    fill
                                    style="absolute !bg-orange-100 top-1 -right-3  z-50  "
                                    size='sm'
                                    link={`/chat?with=${Participant?.userId}`}
                                    bg
                                    title={`Envoyer un message à ${Participant?.User?.Profile?.firstName}`}
                                    icon="sms"
                                />
                                <div className="relative -ml-1 -mb-1 ">
                                    <AvatarUser
                                        Profile={Participant.User?.Profile}
                                        avatarSize={'md'}
                                        avatarStyle="border-2 border-white scale-90" />

                                </div><OnlineDot id={Participant?.userId} />
                            </div>
                            <div className="flex flex-col pl-2">
                                <Typography
                                    as="h6">
                                    {Participant?.User?.Profile?.firstName} {Participant?.User?.Profile?.lastName}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-gray-500  border-t border-slate-50 pt-2">
                                    {Participant?.User?.GroupUser?.map((group, index) =>
                                        <p key={index}
                                            className="!line-clamp-1">⌖ {group?.Group?.name.split(':')[0]}</p>)}
                                </Typography>
                            </div>
                        </div>
                    </div>}
                />
            )
            }
        </div >
    );
}