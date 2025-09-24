import { Icon } from "./IconComp"
import { Profile } from "../../../domain/entities/Profile"
import { DistanceCalculator } from "./CalculatorDistance"
import { useUserStore } from "../../../application/stores/user.store"
import AddressMapOpen from "./mapComps/AddressMapOpen"
import { OnlineDot } from "./onlineDot"
import { User } from "../../../domain/entities/User"
import { ProfileView } from "../../views/viewsEntities/profileViewEntity"
import { AvatarUser } from "./AvatarUser"
import { Menu, MenuItem } from "../shared/base/baseComps/Menu"
import { useNavigate } from "react-router-dom"
import { Group } from "../../../domain/entities/Group"
import { useState } from "react"

type ProfileDivProps = { profile: Partial<User>, size?: string, divRef?: React.RefObject<HTMLDivElement>, date?: Date, group?: Group }
export const ProfileDiv: React.FC<ProfileDivProps> = ({ size = 'sm', divRef, ...props }) => {
    const profile = new ProfileView(props?.profile?.Profile as Profile)
    const userDiv = props?.profile as User
    const { date, group } = props
    const groups = userDiv?.GroupUser ?? []
    // Helper to format "il y a 1h", "il y a 2j", or "le dd/mm/yy" if more than 5 days
    const getAgoString = (d?: Date | null) => {
        if (!d) return ""
        const now = new Date()
        const diffMs = now.getTime() - new Date(d).getTime()
        const diffSec = Math.floor(diffMs / 1000)
        const diffMin = Math.floor(diffSec / 60)
        const diffH = Math.floor(diffMin / 60)
        const diffD = Math.floor(diffH / 24)
        if (diffD > 5) {
            return ` ${new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}`
        } else if (diffD >= 1) {
            return ` ${diffD}j`
        } else if (diffH >= 1) {
            return ` ${diffH}h`
        } else if (diffMin >= 1) {
            return ` ${diffMin}min`
        } else {
            return ` quelques secondes`
        }
    }
    const textSize = size === "xl" && "h6" || size === "lg" && "h6" || "text-sm"
    // const texteSize2 = size === "xl" && "text-sm" || size === "lg" && "text-sm" || "!hidden"
    const user = useUserStore(state => state.user)
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate();
    return (
        <Menu

            open={isOpen}
            setOpen={setIsOpen}
            blurBack
            key={profile?.userId + size}
            className={'px-2 overflow-auto ml-4 -mr-8 '}
            placement='top-right'
            trigger={
                <div className="flex items-center gap-2 ">
                    <div className={`relative`}>
                        <AvatarUser
                            avatarStyle=""
                            Profile={profile}
                            avatarSize={size} />
                        <OnlineDot
                            id={profile?.userId} />
                    </div>
                    <div className="flex flex-col ">

                        <span
                            className={`flex gap-1 items-center  ${textSize} `}>
                            <span>  {profile?.firstName}</span>
                            {date && '•'}
                            {date &&
                                <span className="opacity-80 text-[0.8em] flex items-center ">{getAgoString(date)}
                                </span>}
                        </span>
                        {group &&
                            <span className="gap-2 items-center opacity-80 hidden xs:flex">
                                <Icon icon="groups" fill size="md" />
                                <small className="inline-flex !line-clamp-1  overflow-hidden gap-2 items-center opacity-80"> {group?.name}</small>
                            </span>}
                        {size === '6xl' &&
                            userDiv?.GroupUser.map((groupUser, index) => {
                                return (
                                    <span key={index} className="gap-2 items-center opacity-80 hidden xs:flex">
                                        <Icon icon="groups" fill size="md" />
                                        <small className="inline-flex !line-clamp-1  overflow-hidden gap-2 items-center opacity-80">
                                            {groupUser?.Group?.name.split(':')[0]}
                                        </small>
                                    </span>
                                )
                            })
                        }

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
                title={`Envoyer un message à ${profile?.firstName}`}
                onClick={() => navigate(`/chat?with=${profile?.userId}`)}
                leadingIcon={<Icon icon="chat" color='sky' fill size={'md'} bg />}>
                Envoyer un message

            </MenuItem>
            {profile?.skills && <MenuItem
                leadingIcon={<Icon icon="person" fill size={'lg'} bg />}
                disabled>

                <div className="flex flex-col">
                    <span>Compétences : </span>
                    {profile?.skills?.split(',').map((skill, index) =>
                        <small key={index}
                            className="!line-clamp-1">• {skill}
                        </small>)}
                </div>
            </MenuItem>}
            <MenuItem
                disabled
                leadingIcon={<Icon icon="groups" fill size={'lg'} bg />}>
                <div className="flex flex-col ">
                    <span>Groupes : </span>
                    {groups?.map((group, index) =>
                        <small key={index}
                            className="!line-clamp-1">• {group?.Group?.name.split(':')[0]}
                        </small>)}
                </div>
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
    )
}
