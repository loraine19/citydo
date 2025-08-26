import { Card, CardHeader, Typography, CardBody, Chip } from "@material-tailwind/react";
import { Service, ServiceType } from "../../../../../domain/entities/Service";
import { Icon } from "../../../common/IconComp";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import { useUserStore } from "../../../../../application/stores/user.store";
import { AvatarUser } from "../../../common/AvatarUser";
import { Profile } from "../../../../../domain/entities/Profile";


export default function ServiceIssueCard(props: { service: Service, clamp?: boolean }) {
    const user = useUserStore((state) => state.user)
    const { id, title, description, createdAt, User, UserResp, typeS, points, categoryS, type, } = new ServiceView(props.service, user)




    return (
        <Card className={`CardFix !h-full shadow-none !flex !gap-2 border border-gray-200  bg-blue-gray-50 opacity-95 !py-0 mb-1 md:!py-1`}>
            <CardHeader
                className="fixCardHeaderNoImage mx-2 mt-1 py-1 shadow-none bg-transparent"
                floated={false}>
                <div className="flex justify-between items-center ">
                    <div className="flex items-center gap-2 ">
                        <Chip
                            size='sm'
                            value={categoryS}
                            className="CyanChip lowercase" >
                        </Chip>
                        <Chip
                            size='sm'
                            value={typeS}
                            className={`${type === ServiceType.GET ? "OrangeChip lowercase" : "GreenChip lowercase"}`}>
                        </Chip>
                    </div>
                    <div className="flex items-center gap-2">
                        <Chip
                            size='sm'
                            value={(new Date(createdAt)).toLocaleDateString('fr-FR')}
                            className="GrayChip lowercase">
                        </Chip>
                    </div>
                </div>
            </CardHeader>
            <CardBody className={` FixCardBody  !flex-1 !py-2.5 `}>
                <div className="flex h-full ">
                    <div className="flex flex-col flex-1 gap-2 justify-between overflow-y-auto">
                        <div className="flex items-center justify-between pr-2">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="truncate max-w-[40vw] pt-2 lg:max-w-[20vw] pr-2 font-medium">
                                {title}
                            </Typography>
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
                                <Typography
                                    className="max-h-4"
                                    variant="small">
                                    {User.Profile?.firstName}
                                </Typography>
                                <Typography
                                    variant="small">
                                    {User.Profile?.lastName}
                                </Typography>
                            </div>
                        </div>
                        <div
                            className="flex flex-1 overflow-auto">  <Typography
                                color="blue-gray"
                                variant="small"
                                className={`${props.clamp ? '!line-clamp-3 md:!line-clamp-4 lg:!line-clamp-1' : ''} flex-0 pr-2  leading-[1.1rem]`}>
                                {description}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col pt-1 justify-between items-end border-l-[1px] border-gray-400 overflow-y-auto gap-0.5">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-right font-medium">
                            à réaliser le service
                        </Typography>
                        <div className="flex flex-row-reverse gap-2 ">
                            <AvatarUser Profile={UserResp?.Profile ?? {} as Profile} avatarSize="sm" />
                            <div className="flex flex-col items-end">
                                <Typography
                                    className="max-h-4"
                                    variant="small">
                                    {UserResp?.Profile?.firstName}
                                </Typography>
                                <Typography
                                    variant="small">
                                    {UserResp?.Profile?.lastName}
                                </Typography>
                            </div>
                        </div>
                        <Typography variant="h5" >
                            {points[1] && <span className="!text-[1.2rem] font-light">de </span>}
                            {points[0]}
                            {points[1] && <>
                                <span className="!text-[1.2rem] font-light">à</span> {points[1]}</>}
                            <span className="!text-[1rem] font-light">
                                &nbsp; points
                            </span>
                        </Typography>
                    </div>
                </div>
            </CardBody>
        </Card >

    )
}