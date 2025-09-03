import { Card, CardBody, CardFooter, Typography } from "@material-tailwind/react"
import { Icon } from "./IconComp"
import { Profile } from "../../../domain/entities/Profile"
import { DistanceCalculator } from "./CalculatorDistance"
import { useUserStore } from "../../../application/stores/user.store"
import AddressMapOpen from "./mapComps/AddressMapOpen"
import { OnlineDot } from "./onlineDot"
import { User } from "../../../domain/entities/User"
import { ProfileView } from "../../views/viewsEntities/profileViewEntity"
import { GroupUser } from "../../../domain/entities/GroupUser"
import { AvatarUser } from "./AvatarUser"
import PopOver from "./adaptatersComps/PopOver"

type ProfileDivProps = { profile: Partial<User>, size?: string }
export const ProfileDiv: React.FC<ProfileDivProps> = ({ size = 'sm', ...props }) => {
    const profile = new ProfileView(props?.profile?.Profile as Profile)
    const userDiv = props?.profile as User
    const textSize = size === "xl" && "h6" || size === "lg" && "h6" || "h6"
    const texteSize2 = size === "xl" && "text-sm" || size === "lg" && "text-sm" || "!hidden"
    const user = useUserStore(state => state.user)
    const width = size === 'xl' ? '!min-w-[5.5rem]' : size === 'lg' ? '!min-w-[3.5rem]' : '!min-w-[2.5rem]'

    return (
        <>
            <div className={`relative pl-1 pb-0.5 z-50 truncate flex items-center px-0 gap-2`}>
                <PopOver
                    trigger={
                        <div className={`relative p-1 mt-0.5 mb-0.5  ${width} w-full`}>
                            <AvatarUser
                                avatarStyle=""
                                Profile={profile}
                                avatarSize={size} />
                            <OnlineDot
                                id={profile?.userId} />
                        </div>}
                    children={
                        <Card className="card">
                            <CardBody>
                                <div className="flex gap-4 p-2 pt-4 ">
                                    <div className="relative">
                                        <Icon
                                            color='orange'
                                            fill bg
                                            style="absolute !bg-orange-100 -top-3 -right-4 z-50"
                                            size='sm'
                                            link={`/chat?with=${profile?.userId}`}
                                            title="Envoyer un message"
                                            icon="sms" />
                                        <AvatarUser
                                            Profile={profile}
                                            avatarSize={'sm'} />
                                    </div>
                                    <div className="flex flex-col pl-2 -mt-4">
                                        <Typography as="h6">
                                            {profile?.firstName} {profile?.lastName}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            className={profile?.skills ? "font-normal " : 'hidden'}>
                                            • {profile?.skills}
                                        </Typography>
                                        <div className="font-normal flex flex-col ">
                                            {userDiv?.GroupUser?.map((group: GroupUser, index: number) =>
                                                <i className="!line-clamp-1"
                                                    key={index}>
                                                    {'⌖ ' + group.Group?.name}
                                                </i>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                            <CardFooter className="pt-0 pb-2 px-6">
                                <div className={`${profile?.addressShared ? '' : 'hover:!event-none'} flex gap-8 relative pt-2 `}>
                                    <div className="relative flex  ">
                                        <Icon
                                            disabled={profile?.addressShared ? false : true}
                                            icon="person_pin_circle"
                                            fill bg
                                            size='lg'
                                            style={profile?.addressShared ? '-ml-2' : 'hover:!event-none'}
                                            color={profile?.addressShared ? "cyan" : "gray"} />
                                        {profile?.addressShared && profile?.Address &&
                                            <div className={`absolute scale-[0.68] -top-7 -right-6  
                                    ${profile?.addressShared ? 'flex ' : 'hidden'}`}>
                                                <AddressMapOpen
                                                    message={<DistanceCalculator
                                                        lat1={Number(profile?.Address?.lat)}
                                                        lon1={Number(profile?.Address?.lng)}
                                                        lat2={Number(user?.Profile?.Address?.lat)}
                                                        lon2={Number(user?.Profile?.Address?.lng)} /> as any}
                                                    address={profile?.Address} />
                                            </div>
                                        }
                                    </div>
                                    <div>
                                        <small> <DistanceCalculator
                                            lat1={Number(profile?.Address?.lat)}
                                            lon1={Number(profile?.Address?.lng)}
                                            lat2={Number(user?.Profile?.Address?.lat)}
                                            lon2={Number(user?.Profile?.Address?.lng)} />
                                        </small>
                                        <hr className="pt-1 border-t border-slate-200" />
                                        <i>{profile?.Address?.city}, {profile?.Address?.zipcode}</i>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>}
                />
                <div className="flex flex-col gap-1 truncate ">
                    <Typography variant={textSize}
                        className="border-b pb-1 border-slate-400/50 pr-4  ">
                        {profile?.firstName}
                    </Typography>
                    <div className={`text-slate-500  !line-clamp-2 pr-4`}>
                        {userDiv?.GroupUser?.map((group: GroupUser, index: number) =>
                            <Typography
                                className={`font-light ${texteSize2} truncate !line-clamp-1`}
                                key={index} >
                                {' ⌖ ' + group?.Group?.name.split(':')[0]}
                            </Typography>)}
                    </div>
                </div>
            </div >
        </>

    )
}