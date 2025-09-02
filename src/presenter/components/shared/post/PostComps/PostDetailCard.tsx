import { Card, CardHeader, Typography, CardBody, CardFooter } from "@material-tailwind/react";
import { Icon } from "../../../common/IconComp";
import { useState, } from "react";
import { Flag } from "../../../../../domain/entities/Flag";
import { Like } from "../../../../../domain/entities/Like";
import { useUserStore } from "../../../../../application/stores/user.store";
import { DateChip } from "../../../common/ChipDate";
import { PostView } from "../../../../views/viewsEntities/postViewEntities";
import { Title } from "../../../common/CardTitle";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { User } from "../../../../../domain/entities/User";
import Chip from "../../../common/adaptatersComps/Chip";

export default function PostDetailCard(props: { post: PostView, mines?: boolean, change: (e: any) => void }) {
    const [post, setPost] = useState<PostView>(props.post)
    const { id, title, description, image, categoryS, createdAt, Likes, toogleLike } = post
    const { user } = useUserStore()
    const userId: number = user.id
    const haveImage: boolean = post?.image ? true : false
    const Author: User = post?.User
    const flagged: boolean = post?.Flags?.find((flag: Flag) => flag.userId === userId) ? true : false
    const ILike: boolean = post?.Likes?.find((like: Like) => like.userId === userId) ? true : false

    return (
        <Card className={haveImage ? "CardDetailGrid" : "CardDetailGridNoImage"}>
            <CardHeader
                className={haveImage ? "DetailCardHeader" : "FixCardHeaderNoImage"}>
                <div className={haveImage ? "ChipDiv " : "ChipDivNoImage"}>
                    <Chip
                        size='sm'
                        value={categoryS}
                        className={'CyanChip'}>
                    </Chip>
                    <DateChip
                        start={createdAt}
                        prefix="publié le " />
                </div>
                {image &&
                    <img
                        onError={(e) => e.currentTarget.src = "/image/placeholder.jpg"}
                        src={image as any}
                        alt={title}
                        className="CardImage" />}
            </CardHeader>
            <CardBody className="DetailCardBody  ">
                <Title
                    title={title}
                    flagged={flagged}
                    id={id}
                    type="annonce"
                    group={post.Group}
                />
                <Typography
                    className="description">
                    {description}
                </Typography>
            </CardBody>
            <CardFooter className="DetailCardFooter">
                <ProfileDiv profile={Author} />
                <div className="flex items-center gap-2 ">
                    <button
                        onClick={async () => {
                            const data = await toogleLike()
                            data && setPost(data)
                        }}>
                        <Chip
                            value={`${Likes?.length}`}
                            variant="ghost"
                            className="!h-max !px-4 rounded-full GrayChip flex items-center "
                            icon={
                                <Icon
                                    icon="thumb_up"
                                    size="md"
                                    fill={ILike}
                                    color={ILike ? "rose" : "gray"}
                                    style=" hover:text-cyan-800 "
                                    title={ILike ? "Je n'aime plus" : "J'aime ce post"} />}>
                        </Chip>
                    </button>
                </div>
            </CardFooter>
        </Card>
    )
}



