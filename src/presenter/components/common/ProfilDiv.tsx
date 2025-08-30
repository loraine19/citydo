import { Popover, PopoverTrigger, PopoverContent, Typography } from "@material-tailwind/react"
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

type ProfileDivProps = { profile: Partial<User>, size?: string }
export const ProfileDiv: React.FC<ProfileDivProps> = ({ size = 'sm', ...props }) => {
    const profile = new ProfileView(props.profile?.Profile as Profile)
    const userDiv = props.profile as User
    const textSize = size === "xl" && "h6" || size === "lg" && "h6" || "h6"
    const texteSize2 = size === "xl" && "text-sm" || size === "lg" && "text-sm" || "!hidden"
    const user = useUserStore(state => state.user)

    return (
        <>
            <div className={`relative pl-1 min-w-max pb-0.5 truncate z-50 flex items-center px-0 gap-3`}>
                <Popover placement="bottom-start">
                    <PopoverTrigger>
                        <div className={`relative mt-0.5 mb-0.5`}>
                            <AvatarUser
                                avatarStyle=""
                                Profile={profile}
                                avatarSize={size} />
                            <OnlineDot
                                id={profile?.userId} />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className=" w-auto !p-6 z-50 ">
                        <div className="flex gap-6  pb-2 ">
                            <div className="relative gap-4 ">
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
                            <div className="flex flex-col pl-2">
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
                                        <div className="!line-clamp-1"
                                            key={index}>
                                            {'⌖ ' + group.Group?.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
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
                                                lat2={Number(user.Profile?.Address?.lat)}
                                                lon2={Number(user.Profile?.Address?.lng)} /> as any}
                                            address={profile?.Address} />
                                    </div>
                                }
                            </div>
                            <DistanceCalculator
                                lat1={Number(profile?.Address?.lat)}
                                lon1={Number(profile?.Address?.lng)}
                                lat2={Number(user.Profile?.Address?.lat)}
                                lon2={Number(user.Profile?.Address?.lng)} />
                            <br></br>
                            {profile?.Address?.city}, {profile?.Address?.zipcode}
                        </div>
                    </PopoverContent>
                </Popover>
                <div className="flex flex-col gap-1 truncate">
                    <Typography variant={textSize}
                        className="border-b pb-1 border-slate-400/50 pr-4  ">
                        {profile?.firstName} {profile?.lastName}
                    </Typography>
                    <div className={`text-slate-500 !line-clamp-2 pr-4`}>
                        {userDiv?.GroupUser?.map((group: GroupUser, index: number) =>
                            <Typography
                                className={`font-light ${texteSize2} !line-clamp-1`}
                                key={index} >
                                {' ⌖ ' + group.Group?.name.split(':')[0]}
                            </Typography>)}
                    </div>
                </div>
            </div>
        </>

    )
}