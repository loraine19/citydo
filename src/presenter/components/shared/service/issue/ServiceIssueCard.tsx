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
            className={`!grid-rows-[auto_1fr] !h-full !flex-1  w-full `}>
            <CardMD.Chips>
                <div className="flex flex-1 items-center gap-2 max-h-max">
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
            <CardMD.Media className={` flex pb-1`}>
                <div className="flex flex-1 ">
                    <div className="flex flex-col h-full flex-1 gap-2 justify-between !overflow-auto">
                        <div className="flex items-center  pr-2">
                            <p className="line-clamp-2  pr-2 font-medium">
                                {title}
                            </p>
                            <Icon
                                icon="expand_content"
                                link={`/service/${id}`}
                                title={`voir les details de service  ${title}`}
                                size="md" />
                        </div>
                        <div className="flex gap-2 ">
                            <AvatarUser Profile={User.Profile} avatarSize="md" />
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
                    <div className="flex ml-2 pl-4 min-w-[30%] flex-col pt-1 justify-between items-end border-l-[1px] border-[var(--md3-outline)] overflow-y-auto gap-0.5">
                        <div className="flex flex-col items-end gap-2">
                            <p className="text-right font-medium">
                                répondu par
                            </p>
                            <div className="flex flex-row-reverse gap-2 ">
                                <AvatarUser Profile={UserResp?.Profile ?? {} as Profile} avatarSize="md" />
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