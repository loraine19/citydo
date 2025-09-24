import ModifBtnStack from "../../../common/ModifBtnStack";
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
import { IconAnimate } from "../../../common/IconAnimate";
import { Button } from "../../base/baseComps/Buttons";
import { MoreButton } from "../../../common/moreBtn";
import { GroupLink } from "../../../common/GroupLink";

type PostCardProps = { post: PostView, mines?: boolean, change: (e: any) => void, update?: () => void, short?: boolean, autoFit?: boolean }

export default function PostCard({ post: initialPost, mines, change, update, autoFit }: PostCardProps) {
    const [post, setPost] = useState<PostView>(initialPost);
    const { id, title, image, categoryS, createdAt, Likes, User, flagged, toogleLike, Group } = post;
    const deletePost = async (id: number) => await DI.resolve('deletePostUseCase').execute(id)
    const myActions: Action[] = GenereMyActions(post, "annonce", deletePost)

    return (
        <CardMD
            autoFit={autoFit}
            className="min-h-full fadeIn"
            imagePosition="top"
            link={`/annonce/${id}`}
            image={
                image && <CardMD.Image
                    src={image as string}
                    alt={title}
                    className="relative"
                >
                    <IconAnimate
                        active={post?.ILike}
                        icon={'favorite'} />

                    <CardMD.Chips className={`w-full flex justify-end gap-2 h-max`}>
                        <DateChip
                            start={createdAt}
                            prefix=" "
                        />

                        {<MoreButton id={id} type={'annonce'} flagged={flagged} />}
                    </CardMD.Chips>
                </CardMD.Image>
            }
        >
            <CardMD.Chips className="justify-between">

                <div className="md3-card-chips flex-1 !overflow-auto">
                    <Chip
                        onClick={() => change(post?.category as string)}
                        value={`${categoryS}`}
                        color="rose"
                    />
                </div>

            </CardMD.Chips>

            <CardMD.Headline>
                <Title title={title} />
            </CardMD.Headline>

            <CardMD.Subhead className={`flex items-center gap-1`}>
                <GroupLink group={Group} />
            </CardMD.Subhead>

            <CardMD.Footer className="justify-between  items-center flex w-full">
                {!mines ?
                    <div className=" w-full flex-1 items-center flex truncate pl-2 -ml-2 ">
                        <ProfileDiv
                            date={post?.createdAt}
                            profile={User} />
                    </div> :
                    <ModifBtnStack
                        actions={myActions}
                        update={update} />}

                <Button
                    onClick={async () => {
                        setPost(await toogleLike());
                        post.ILike = !post?.ILike
                    }}
                    variant={post?.ILike ? "filled" : "tonal"}
                    color="rose"
                    iconPosition="end"
                    icon={{
                        style: '-mt-[1px]',
                        icon: post?.ILike ? "favorite" : "heart_plus",
                        fill: post?.ILike,
                        title: post?.ILike ? "retirer de mes favoris" : "j'aime"
                    }}>
                    {Likes?.length}

                </Button>
            </CardMD.Footer>
        </CardMD>
    )
}