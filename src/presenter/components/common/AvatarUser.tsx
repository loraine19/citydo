import { Avatar } from '@material-tailwind/react';
import { Icon } from './IconComp';
import { Profile } from '../../../domain/entities/Profile';
import { Colors } from '../../../domain/entities/utilsEntity';
import { useState } from 'react';

interface AvatarUserProps {
    Profile: Profile;
    avatarSize?: string;
    avatarStyle?: string;
    style?: string;
}

export const AvatarUser = ({ Profile, avatarSize = '', avatarStyle = '', style = '' }: AvatarUserProps) => {
    const colors = Object.values(Colors).slice(0, 8) as string[]
    const userColor = colors[
        Math.floor(
            Math.abs(
                (Profile?.userId ?? '').toString()
                    .split('')
                    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
            ) % (colors.length - 1)
        )
    ]

    const iconSize = () => {
        switch (avatarSize) {
            case 'xl':
                return '4xl';
            case 'lg':
                return '3xl';
            case 'md':
                return '2xl';
            case 'sm':
                return 'md';
            default:
                return 'md';
        }
    }
    const classicStyle = '!flex !shadow cursor-pointer min-w-max hover:!shadow-lg hover:!scale-[1.02] hover:!saturate-[1.1] transition-all duration-200 ease-in-out'

    const [inError, setInError] = useState<boolean>(false);
    return (
        <>
            {Profile?.image && !inError ?
                <Avatar
                    onError={() => setInError(true)}
                    referrerPolicy="unsafe-url"
                    size={avatarSize as any ?? 'sm'}
                    className={`${classicStyle} ${avatarStyle} bg-${userColor}-100 text-white text-xs  fadeIn rounded-full`}
                    alt={Profile?.firstName || 'user'}
                    src={Profile?.image as string}
                /> :

                <div className='min-w-full hover:z-50 h-full flex '>
                    <Icon
                        bg
                        fill
                        style={`${avatarStyle} ${classicStyle} ${style} leading-[1] pt-[10%] flex z-auto  font-comfortaa !min-w-full font-bold hover:z-50`}
                        color={userColor}
                        size={iconSize()}
                        icon={Profile?.firstName?.charAt(0).toUpperCase() || '?'}
                    />
                </div>}
        </>
    );
};
