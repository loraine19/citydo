import { Icon, sizeMap } from './IconComp';
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

    const sizeArray = sizeMap


    const classicStyle = '!flex !shadow cursor-pointer min-w-max hover:!shadow hover:!scale-[1.02] hover:!saturate-[1.1] transition-all duration-200 ease-in-out'

    const [inError, setInError] = useState<boolean>(false);
    return (
        <div
            className={`relative rounded-full overflow-hidden  max-w-max h-full min-w-max ${classicStyle} ${avatarStyle} ${style} ${sizeArray[avatarSize]?.class}`}

        >
            {Profile?.image && !inError ? (
                <img
                    onError={() => setInError(true)}
                    referrerPolicy="unsafe-url"
                    className={`${sizeArray[avatarSize]?.class} object-cover w-full h-full rounded-full bg-${userColor}-100 text-white text-xs fadeIn`}
                    alt={Profile?.firstName || 'user'}
                    src={Profile?.image as string}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <Icon
                        bg
                        fill
                        style={`leading-[1] pt-[0%] flex font-semibold bg-${userColor}-100 text-${userColor}-800 w-full h-full`}
                        color={userColor ?? 'slate'}
                        size={avatarSize}
                        icon={Profile?.firstName?.charAt(0).toUpperCase() || '?'}
                    />
                </div>
            )}
        </div>
    );
};
