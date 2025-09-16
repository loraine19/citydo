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

export default function PostDetailCard(props: { post: PostView, mines?: boolean, change: (e: any) => void, expand: boolean, setExpand: (expand: boolean) => void }) {
    const [post, setPost] = useState<PostView>(props.post)
    const { expand, setExpand } = props
    const { id, title, description, image, categoryS, category, createdAt, Likes, toogleLike } = post
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
                className="CardImage" >
                <CardLarge.Chips className="justify-end !p-2">
                    <DateChip
                        start={createdAt}
                        prefix="publié le " />
                </CardLarge.Chips>
            </img>}>
            <CardLarge.Chips className="justify-between">

                <div className="md3-card-chips flex-1 !overflow-auto">
                    <Link to={`/annonce?search=&category=${category}`}>
                        <Chip
                            size="sm"
                            value={`${categoryS}`}
                            color="rose"
                        />
                    </Link>
                </div>

                {<MoreButton
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
            <CardLarge.SupportingText className="line-clamp-2 flex-1 h-full">
                {description}
            </CardLarge.SupportingText>
            <CardLarge.Media>
                <Button
                    className="max-w-max"
                    size='small'
                    onClick={async () => { setPost(await toogleLike()) }}
                    variant={ILike ? "filled" : "tonal"}
                    color="rose"
                    iconPosition="end"
                    icon={{
                        style: '-mt-[1px]',
                        icon: 'favorite',
                        fill: ILike,
                        title: ILike ? "retirer de mes favoris" : "j'aime"
                    }}>
                    {Likes?.length}

                </Button>
            </CardLarge.Media>

            <CardLarge.Footer className="md3-card-large-footer ">
                <div className=" w-full flex-1 items-center flex truncate pl-2 -ml-2 ">
                    <ProfileDiv
                        profile={Author} />
                </div>
            </CardLarge.Footer>

        </CardLarge>
    )
}



