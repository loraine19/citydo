import { Card, CardHeader, Typography, CardBody } from "@material-tailwind/react";
import { Service, ServiceType } from "../../../../../domain/entities/Service";
import { Icon } from "../../../common/IconComp";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import { useUserStore } from "../../../../../application/stores/user.store";
import { AvatarUser } from "../../../common/AvatarUser";
import { Profile } from "../../../../../domain/entities/Profile";
import Chip from "../../../common/adaptatersComps/Chip";


export default function ServiceIssueCard(props: { service: Service, clamp?: boolean }) {
    const user = useUserStore((state) => state.user)
    const { id, title, description, createdAt, User, UserResp, typeS, points, categoryS, type, } = new ServiceView(props.service, user)




    return (
        <Card className={`CardFix !grid-rows-[auto_1fr] !h-full  shadow-none !gap-2 border border-gray-200  bg-slate-50 opacity-95 !py-0 mb-1 md:!py-1`}>
            <CardHeader className="FixCardHeaderNoImage mt-1 px-3 py-2 shadow-none bg-transparent">
                <div className="flex w-full justify-between items-center ">
                    <div className="flex items-center gap-2 ">
                        <Chip
                            value={categoryS}
                            className="cyanChip lowercase" >
                        </Chip>
                        <Chip
                            value={typeS}
                            className={`${type === ServiceType.GET ? "orangeChip lowercase" : "greenChip lowercase"}`}>
                        </Chip>
                    </div>
                    <div className="flex items-center gap-2">
                        <Chip
                            value={(new Date(createdAt)).toLocaleDateString('fr-FR')}
                            className="grayChip lowercase">
                        </Chip>
                    </div>
                </div>
            </CardHeader>
            <CardBody className={` FixCardBody flex !flex-1 !py-2.5 `}>
                <div className="flex h-[calc(100%-3rem)]  ">
                    <div className="flex flex-col h-full flex-1 gap-2 justify-between !overflow-auto">
                        <div className="flex items-center justify-between pr-2">
                            <Typography
                                variant="small"
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
                        <div className="flex flex-1 pb-1 !overflow-auto">
                            <Typography
                                variant="small"
                                className={`${props.clamp ? ' !line-clamp-1 ' : '!line-clamp-6 '} pr-2`}>
                                {description}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col pt-1 justify-between items-end border-l-[1px] border-gray-400 overflow-y-auto gap-0.5">
                        <div className="flex flex-col items-end gap-2">
                            <Typography
                                variant="small"
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
                        </div>
                        <Typography as="h5" >
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