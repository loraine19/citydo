import { useState, } from "react";
import { Like } from "../../../../../domain/entities/Like";
import { useUserStore } from "../../../../../application/stores/user.store";
import { DateChip } from "../../../common/ChipDate";
import { PostView } from "../../../../views/viewsEntities/postViewEntities";
import { Title } from "../../../common/CardTitle";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { User } from "../../../../../domain/entities/User";
import Chip from "../../../common/adaptatersComps/Chip";
import { MoreButton } from "../../../common/moreBtn";
import { CardLarge } from "../../base/baseComps/Cards";
import { GroupLink } from "../../../common/GroupLink";
import { Button } from "../../base/baseComps/Buttons";
import { Link } from "react-router-dom";
import { IconAnimate } from "../../../common/IconAnimate";
import BtnExpandImg from "../../../common/BtnExpandImg";

export default function PostDetailCard(props: { post: PostView, mines?: boolean, change: (e: any) => void, expand: boolean, setExpand: (expand: boolean) => void }) {
    const [post, setPost] = useState<PostView>(props.post)
    const { expand, setExpand } = props
    const { id, title, description, image, categoryS, createdAt, Likes, toogleLike } = post
    const { user } = useUserStore()
    const userId: number = user.id
    const Author: User = post?.User
    const ILike: boolean = post?.Likes?.find((like: Like) => like.userId === userId) ? true : false

    return (
        <CardLarge
            expanded={expand}
            setExpanded={setExpand}

            image={<img
                onError={(e) => e.currentTarget.src = "/image/placeholder.jpg"}
                src={image as any}
                alt={title}
                className="" >

                <div className="!relative mt-12 ml-12 scale-125 text-white">
                    <IconAnimate
                        active={post?.ILike}
                        icon={'favorite'} />
                </div>

                <CardLarge.Chips className="justify-end !p-2">

                    <DateChip
                        start={createdAt}
                        prefix="publié le " />
                    <BtnExpandImg
                        image={image as any} />
                </CardLarge.Chips>


            </img>}>
            <CardLarge.Chips className="justify-between">

                <div className="md3-card-chips flex-1 !overflow-auto">
                    <Link to={`/annonce?search=&category=${post?.category}`} >
                        <Chip
                            value={`${categoryS}`}
                            color="rose"
                        />
                    </Link>
                </div>

                {<MoreButton
                    title={post?.title}
                    id={id}
                    type={'annonce'}
                    flagged={post?.flagged} />}
            </CardLarge.Chips>

            <CardLarge.Headline>
                <Title title={title} />
            </CardLarge.Headline>

            <CardLarge.Subhead>
                <GroupLink group={post.Group} />
            </CardLarge.Subhead>
            <CardLarge.SupportingText className="line-clamp-2">
                {description}
            </CardLarge.SupportingText>
            <CardLarge.Media>
                <Button
                    className="max-w-max mb-2"
                    size='medium'
                    onClick={async () => { setPost(await toogleLike()) }}
                    variant={ILike ? "filled" : "tonal"}
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
            </CardLarge.Media>
            <CardLarge.Divider />
            <CardLarge.Footer className="md3-card-large-footer ">
                <div className=" w-full flex-1 items-center flex truncate pl-2 pb-4 -ml-2 ">
                    <ProfileDiv
                        date={post?.createdAt}
                        profile={Author} />
                </div>
            </CardLarge.Footer>

        </CardLarge>
    )
}



