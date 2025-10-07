import { Service, ServiceType } from "../../../../../domain/entities/Service";
import { Icon } from "../../../common/IconComp";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import { useUserStore } from "../../../../../application/stores/user.store";
import { AvatarUser } from "../../../common/AvatarUser";
import { Profile } from "../../../../../domain/entities/Profile";
import Chip from "../../../common/adaptatersComps/Chip";
import { CardMD } from "../../base/baseComps/Cards";


export default function ServiceIssueCard(props: { service: Service, clamp?: boolean }) {
    const user = useUserStore((state) => state.user)
    const { id, title, createdAt, User, UserResp, typeS, categoryS, type, } = new ServiceView(props.service, user)




    return (
        <CardMD
            variant="outlined"
            className={`!grid-rows-[auto_1fr] !h-full  !flex-1  w-full `}>
            <CardMD.Chips>
                <div className="flex flex-1 items-center gap-2 ">
                    <Chip
                        variant="tonal"
                        color="cyan"
                        value={categoryS} >
                    </Chip>
                    <Chip
                        variant="tonal"
                        color={type === ServiceType.GET ? "orange" : "green"}
                        value={typeS}>
                    </Chip>
                </div>
                <Chip
                    value={(new Date(createdAt)).toLocaleDateString('fr-FR')}>
                </Chip>
            </CardMD.Chips>
            <CardMD.Media className={` flex !flex-1 `}>
                <div className="flex h-[calc(100%-3rem)]  ">
                    <div className="flex flex-col h-full flex-1 gap-2 justify-between !overflow-auto">
                        <div className="flex items-center justify-between pr-2">
                            <small
                                className="truncate max-w-[40vw] pt-2 lg:max-w-[20vw] pr-2 font-medium">
                                {title}
                            </small>
                            <Icon
                                bg
                                icon="visibility"
                                link={`/service/${id}`}
                                title={`voir les details de service  ${title}`}
                                size="sm" />
                        </div>
                        <div className="flex gap-2 ">
                            <AvatarUser Profile={User.Profile} avatarSize="sm" />
                            <div className="flex flex-col">
                                <small>
                                    {User.Profile?.firstName}
                                </small>
                                <small>
                                    {User.Profile?.lastName}
                                </small>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-1 flex-col pt-1 justify-between items-end border-l-[1px] border-gray-400 overflow-y-auto gap-0.5">
                        <div className="flex flex-col items-end gap-2">
                            <small
                                className="text-right font-medium">
                                à réaliser le service
                            </small>
                            <div className="flex flex-row-reverse gap-2 ">
                                <AvatarUser Profile={UserResp?.Profile ?? {} as Profile} avatarSize="sm" />
                                <div className="flex flex-col items-end">
                                    <small
                                        className="max-h-4">
                                        {UserResp?.Profile?.firstName}
                                    </small>
                                    <small>
                                        {UserResp?.Profile?.lastName}
                                    </small>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </CardMD.Media>
        </CardMD >

    )
}