import { Popover, Typography, PopoverContent, PopoverTrigger } from "@material-tailwind/react";
import { Participant } from "../../../../../domain/entities/Participant";
import { Icon } from "../../../common/IconComp";
import { OnlineDot } from "../../../common/onlineDot";
import { AvatarUser } from "../../../common/AvatarUser";

type AvatarStackProps = { avatarDatas: Participant[] };
export function AvatarStack(props: AvatarStackProps) {
    const { avatarDatas } = props;

    return (
        <div className="flex items-center -space-x-2 overflow-y-auto  rounded-full">
            {avatarDatas?.map((Participant: Participant, index) =>
                <Popover key={index} >
                    <PopoverTrigger>
                        <div className="relative hover:!z-10">
                            <AvatarUser
                                Profile={Participant?.User?.Profile}
                                avatarSize={'sm'}
                                avatarStyle="border-2 !h-[2.6rem] !w-[2.6rem] !border-white !hover:z-10 !focus:z-10" />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="!z-[1000]  !ml-24 !py-2">
                        <div className="p-2 w-auto flex items-center gap-4 ">
                            <div className=" relative pt-2  pr-2">
                                <Icon
                                    color='orange'
                                    fill
                                    style="absolute !bg-orange-100 top-1 -right-1  z-50  "
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
                    </PopoverContent>
                </Popover>

            )
            }
        </div >
    );
}