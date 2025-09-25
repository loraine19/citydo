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
import { useNavigate } from "react-router-dom";

type PostCardProps = { post: PostView, mines?: boolean, change: (e: any) => void, update?: () => void, short?: boolean, autoFit?: boolean }

export default function PostCard({ post: initialPost, mines, change, update, autoFit }: PostCardProps) {
    const [post, setPost] = useState<PostView>(initialPost);
    const deletePost = async (id: number) => await DI.resolve('deletePostUseCase').execute(id)
    const myActions: Action[] = GenereMyActions(post, "annonce", deletePost)
    const navigate = useNavigate();

    return (
        <CardMD
            autoFit={autoFit}
            className="min-h-full fadeIn"
            imagePosition="top"
            image={
                <CardMD.Image
                    onClick={() => {
                        navigate(`/annonce/${post?.id}`);
                    }}
                    src={post?.image as string}
                    alt={post?.title}
                    className="relative"
                >
                    <IconAnimate
                        active={post?.ILike}
                        icon={'favorite'} />

                    <CardMD.Chips className={`w-max right-0 flex absolute justify-end gap-2  h-max`}>
                        <DateChip
                            start={post?.createdAt}
                            prefix=" "
                        />

                        {<MoreButton id={post?.id} type={'annonce'} flagged={post?.flagged} />}
                    </CardMD.Chips>
                </CardMD.Image>
            }
        >
            <CardMD.Chips className="justify-between flex-1 min-h-max">
                <Chip
                    onClick={() => change(post?.category as string)}
                    value={`${post?.categoryS}`}
                    color="rose"
                />

            </CardMD.Chips>

            <CardMD.Headline>
                <Title title={post?.title} />
            </CardMD.Headline>

            <CardMD.Subhead className={`flex items-start flex-1 gap-1`}>
                <GroupLink group={post?.Group} />
            </CardMD.Subhead>

            <CardMD.Footer className="justify-between  items-center flex w-full">
                {!mines ?
                    <div className=" w-full flex-1 items-center flex truncate pl-2 -ml-2 ">
                        <ProfileDiv
                            date={post?.createdAt}
                            profile={post?.User} />
                    </div> :
                    <ModifBtnStack
                        actions={myActions}
                        update={update} />}

                <Button
                    onClick={async () => {
                        setPost(await post?.toogleLike());
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
                    {post?.Likes?.length}

                </Button>
            </CardMD.Footer>
        </CardMD>
    )
}