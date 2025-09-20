import { Typography } from "@material-tailwind/react"
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
import { Menu, MenuItem } from "../shared/base/baseComps/Menu"
import { useNavigate } from "react-router"

type ProfileDivProps = { profile: Partial<User>, size?: string, divRef?: React.RefObject<HTMLDivElement> }
export const ProfileDiv: React.FC<ProfileDivProps> = ({ size = 'sm', divRef, ...props }) => {
    const profile = new ProfileView(props?.profile?.Profile as Profile)
    const userDiv = props?.profile as User
    const textSize = size === "xl" && "h6" || size === "lg" && "h6" || "h6"
    const texteSize2 = size === "xl" && "text-sm" || size === "lg" && "text-sm" || "!hidden"
    const user = useUserStore(state => state.user)
    const width = size === 'xl' ? '!min-w-[5.5rem]' : size === 'lg' ? '!min-w-[3.5rem]' : '!min-w-[2.5rem]'

    const navigate = useNavigate();
    return (
        <div className="">
            <Menu
                ref
                blurBack
                key={profile?.userId + size}
                className={'px-2 overflow-auto ml-4 -mr-8 '}
                menuRef={divRef}
                placement={size === 'xl' ? "auto" : "auto"}
                trigger={
                    <div className="flex items-center  ">
                        <div className={`relative   ${width} `}>
                            <AvatarUser
                                avatarStyle=""
                                Profile={profile}
                                avatarSize={size} />
                            <OnlineDot
                                id={profile?.userId} />
                        </div>
                        <div className="flex flex-col gap-1 truncate ">
                            <Typography variant={textSize}
                                className=" pr-4 pt-1 ">
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
                    </div>
                }>
                <MenuItem
                    disabled
                    leadingIcon={
                        <div className=" relative">
                            <AvatarUser
                                Profile={profile}
                                avatarSize={'lg'}
                                avatarStyle="border-2 border-white scale-90" />

                            <OnlineDot id={profile?.userId} />
                        </div>}>

                    <span className="font-bold">{profile?.firstName}<br></br> {profile?.lastName}
                    </span>
                </MenuItem>
                <MenuItem
                    leadingIcon={<Icon icon="person" color='sky' fill size={'lg'} bg />}
                    disabled>

                    <div className="flex flex-col gap-1">
                        <span>Compétences : </span>
                        {profile?.skills?.split(',').map((skill, index) =>
                            <small key={index}
                                className="!line-clamp-1">• {skill}
                            </small>)}
                    </div>
                </MenuItem>
                <MenuItem
                    disabled
                    leadingIcon={<Icon icon="groups" color='sky' fill size={'lg'} bg />}>
                    <div className="flex flex-col gap-1">
                        <span>Groupes : </span>
                        {userDiv?.GroupUser?.map((group, index) =>
                            <small key={index}
                                className="!line-clamp-1">• {group?.Group?.name.split(':')[0]}
                            </small>)}
                    </div>
                </MenuItem>
                <MenuItem
                    title={`Envoyer un message à ${profile?.firstName}`}
                    onClick={() => navigate(`/chat?with${profile?.userId}`)}
                    leadingIcon={<Icon icon="chat" color='sky' fill size={'md'} bg />}>
                    Envoyer un message

                </MenuItem>
                <MenuItem
                    disabled
                    className={``}
                >
                    <div className="flex !min-w-full flex-1 flex-col gap-1">
                        Localisation :
                        <div className="flex flex-1 w-full  ">
                            <AddressMapOpen
                                message={<DistanceCalculator
                                    lat1={Number(profile?.Address?.lat)}
                                    lon1={Number(profile?.Address?.lng)}
                                    lat2={Number(user?.Profile?.Address?.lat)}
                                    lon2={Number(user?.Profile?.Address?.lng)} /> as any}
                                address={profile?.Address} />
                        </div>
                        <DistanceCalculator
                            lat1={Number(profile?.Address?.lat)}
                            lon1={Number(profile?.Address?.lng)}
                            lat2={Number(user?.Profile?.Address?.lat)}
                            lon2={Number(user?.Profile?.Address?.lng)} />

                        <i>{profile?.Address?.city}, {profile?.Address?.zipcode}</i>
                    </div>
                </MenuItem>
            </Menu>
        </div>

        // <Menu
        //     key={profile?.userId + size}
        //     className={size === 'xl' ? '-ml-4' : '-ml-4 '}
        //     menuRef={divRef}
        //     closeIcon={size === 'xl' ? ' ' : ' '}
        //     placement={size === 'xl' ? "center_end" : "center_start"}
        //     trigger={
        //         <div className="flex items-center gap-2 ">
        //             <div className={`relative   ${width} `}>
        //                 <AvatarUser
        //                     avatarStyle=""
        //                     Profile={profile}
        //                     avatarSize={size} />
        //                 <OnlineDot
        //                     id={profile?.userId} />
        //             </div>
        //             <div className="flex flex-col gap-1 truncate ">
        //                 <Typography variant={textSize}
        //                     className=" pr-4 pt-1.5 ">
        //                     {profile?.firstName}
        //                 </Typography>
        //                 <div className={`text-slate-500  !line-clamp-2 pr-4`}>
        //                     {userDiv?.GroupUser?.map((group: GroupUser, index: number) =>
        //                         <Typography
        //                             className={`font-light ${texteSize2} truncate !line-clamp-1`}
        //                             key={index} >
        //                             {' ⌖ ' + group?.Group?.name.split(':')[0]}
        //                         </Typography>)}
        //                 </div>
        //             </div>
        //         </div>
        //     }>

        //     <MenuItem

        //         divider="top"
        //         leadingIcon={
        //             <div className="relative mt-2 px-2">
        //                 <Icon
        //                     reverse
        //                     color='orange'
        //                     fill bg
        //                     style="absolute  -top-2 -right-1 z-50"
        //                     size='xs'
        //                     link={`/chat?with=${profile?.userId}`}
        //                     title="Envoyer un message"
        //                     icon="sms" />
        //                 <AvatarUser
        //                     Profile={profile}
        //                     avatarSize={'sm'} />
        //             </div>}>
        //         <div className="flex flex-col pl-2 -mt-2">
        //             <Typography as="h6">
        //                 {profile?.firstName} {profile?.lastName}
        //             </Typography>
        //             <i
        //                 className={profile?.skills ? "font-normal " : 'hidden'}>
        //                 • {profile?.skills}
        //             </i>
        //             <div className="font-normal flex flex-col ">
        //                 {userDiv?.GroupUser?.map((group: GroupUser, index: number) =>
        //                     <i className="!line-clamp-1"
        //                         key={index}>
        //                         {'⌖ ' + group.Group?.name}
        //                     </i>
        //                 )}
        //             </div>
        //         </div>
        //     </MenuItem>
        //     <MenuItem
        //         divider='bottom'
        //         className={`${profile?.addressShared ? '' : 'hover:!event-none'} `}
        //         leadingIcon={
        //             <div className="relative flex  ">
        //                 <Icon
        //                     disabled={profile?.addressShared ? false : true}
        //                     icon="person_pin_circle"
        //                     fill bg
        //                     size='lg'
        //                     style={profile?.addressShared ? '' : 'hover:!event-none'}
        //                     color={profile?.addressShared ? "cyan" : "gray"} />
        //                 {profile?.addressShared && profile?.Address &&
        //                     <div className={`absolute scale-[0.68] -top-7 -right-5   
        //                         ${profile?.addressShared ? 'flex ' : 'hidden'}`}>
        //                         <AddressMapOpen
        //                             message={<DistanceCalculator
        //                                 lat1={Number(profile?.Address?.lat)}
        //                                 lon1={Number(profile?.Address?.lng)}
        //                                 lat2={Number(user?.Profile?.Address?.lat)}
        //                                 lon2={Number(user?.Profile?.Address?.lng)} /> as any}
        //                             address={profile?.Address} />
        //                     </div>
        //                 }
        //             </div>
        //         }>
        //         <div className="flex flex-col p-2">
        //             <small>
        //                 <DistanceCalculator
        //                     lat1={Number(profile?.Address?.lat)}
        //                     lon1={Number(profile?.Address?.lng)}
        //                     lat2={Number(user?.Profile?.Address?.lat)}
        //                     lon2={Number(user?.Profile?.Address?.lng)} />
        //             </small>

        //             <i>{profile?.Address?.city}, {profile?.Address?.zipcode}</i>
        //         </div>
        //     </MenuItem>
        // </Menu>
    )
}
