import ModifBtnStack from "../../../common/ModifBtnStack";
import { Icon } from "../../../common/IconComp";
import { Action } from "../../../../../domain/entities/frontEntities";
import { GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import { DateChip } from "../../../common/ChipDate";
import DI from "../../../../../di/ioc";
import { PostView } from "../../../../views/viewsEntities/postViewEntities";
import { useState } from "react";
import { Title } from "../../../common/CardTitle";
import { ProfileDiv } from "../../../common/ProfilDiv";
import Chip from "../../../common/adaptatersComps/Chip";
import { CardMD } from "../../base/baseComps/Cards";
import { GroupLink } from "../../../common/GroupLink";
import { IconAnimate } from "../../../common/IconAnimate";

type PostCardProps = { post: PostView, mines?: boolean, change: (e: any) => void, update?: () => void, short?: boolean, autoFit?: boolean }

export default function PostCard({ post: initialPost, mines, change, update, short, autoFit }: PostCardProps) {
    const [post, setPost] = useState<PostView>(initialPost);
    const { id, title, description, image, categoryS, createdAt, Likes, User, flagged, ILike, toogleLike, Group } = post ?? {} as PostView;
    const deletePost = async (id: number) => await DI.resolve('deletePostUseCase').execute(id)
    const myActions: Action[] = GenereMyActions(post, "annonce", deletePost)

    return (
        <CardMD
            autoFit={autoFit}
            className="min-h-full lg:h-[53vh]"
            imagePosition="top"
            link={`/annonce/${id}`}
            image={
                <CardMD.Image
                    src={image as string || '/image/placeholder.jpg'}
                    alt={title}
                    className="relative"
                >

                    <div className="flex flex-1 !p-0 w-full h-max flex-wrap-reverse justify-between  gap-2">
                        <button className="h-max w-max"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                const cat = e.currentTarget.innerText.toLowerCase();
                                change(cat as any);
                            }}>
                            <Chip
                                size="sm"
                                value={`${categoryS}`}
                                className="rounded-full h-max truncate cyanChip shadow"
                            />
                        </button>
                        <DateChip
                            start={createdAt}
                            prefix="le"
                        />

                        <IconAnimate
                            active={ILike}
                            icon={'thumb_up'} />
                    </div>
                </CardMD.Image>
            }
        >
            <CardMD.Headline className="">
                <Title
                    title={title}
                    flagged={flagged}
                    type="post"
                />
            </CardMD.Headline>
            <CardMD.Subhead>

                <GroupLink group={Group} />
            </CardMD.Subhead>
            <CardMD.SupportingText className={short ? "line-clamp-1" : "line-clamp-2"}>
                {description}
            </CardMD.SupportingText>
            <CardMD.Footer className="justify-between items-center flex w-full">
                {!mines ?
                    <div className=" w-full flex-1 truncate pl-2 -ml-2 ">
                        <ProfileDiv
                            profile={User} />
                    </div> :
                    <ModifBtnStack
                        actions={myActions}
                        update={update} />}
                <button
                    onClick={async () => { setPost(await toogleLike()) }}
                    className={mines ? `hidden md:flex` : `flex`}>
                    <Chip
                        size="sm"
                        value={`${Likes?.length}`}
                        variant="ghost"
                        className="pt-1 rounded-full h-full grayChip flex items-center"
                        icon={
                            <Icon
                                icon="thumb_up"
                                size="md"
                                fill={ILike}
                                color={ILike ? "rose" : "gray"}
                                title={ILike ? "je n'aime plus" : "j'aime"}
                            />
                        }
                    />
                </button>
            </CardMD.Footer>
        </CardMD>
    )
}