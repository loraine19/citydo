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
            case 'ms':
                return 'ms';
            case 'sm':
                return 'md';
            default:
                return 'md';
        }
    }
    const classicStyle = '!flex !shadow cursor-pointer min-w-max hover:!shadow hover:!scale-[1.02] hover:!saturate-[1.1] transition-all duration-200 ease-in-out'

    const [inError, setInError] = useState<boolean>(false);
    return (
        <div className={`relative rounded-full overflow-hidden   w-max h-full min-w-max `}>
            {Profile?.image && !inError ?
                <Avatar

                    onError={() => setInError(true)}
                    referrerPolicy="unsafe-url"
                    size={avatarStyle === 'ms' ? 'sm' : avatarSize as any ?? 'sm'}
                    className={` !z-[1] ${classicStyle} ${avatarStyle} bg-${userColor}-100 text-white text-xs fadeIn min-w-max rounded-full  ${avatarSize === 'ms' ? '!w-[37px] !h-[37px]' : ''}`}
                    alt={Profile?.firstName || 'user'}
                    src={Profile?.image as string}
                /> :

                <div className='min-w-full hover:z-50 h-full flex '>
                    <Icon
                        bg
                        fill
                        style={`${avatarStyle} ${classicStyle} ${style} leading-[1] pt-[0%] flex z-auto   !min-w-full font-semibold hover:z-50 bg-${userColor}-100 text-${userColor}-800  `}
                        color={userColor ?? 'slate'}
                        size={iconSize()}
                        icon={Profile?.firstName?.charAt(0).toUpperCase() || '?'}
                    />
                </div>}
        </div>
    );
};
