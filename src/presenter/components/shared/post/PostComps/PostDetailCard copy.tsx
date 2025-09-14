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
import { MoreButton } from "../../../common/moreBtn";

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
                {image &&
                    <div className="CardImageDiv"> <img
                        onError={(e) => e.currentTarget.src = "/image/placeholder.jpg"}
                        src={image as any}
                        alt={title}
                        className="CardImage" />
                    </div>}
                <div className={haveImage ? "ChipDiv " : "ChipDivNoImage"}>
                    <Chip
                        size='sm'
                        value={categoryS}
                        className={'cyanChip'}>
                    </Chip>
                    <DateChip
                        start={createdAt}
                        prefix="publié le " />
                </div>

            </CardHeader>
            <CardBody className="DetailCardBody  ">
                <Title
                    large
                    title={title}
                />
                <MoreButton
                    flagged={flagged}
                    id={id}
                    type="annonce"
                />
                <div className="CardOverFlow pt-1">
                    <h6>Desciption</h6>
                    <Typography
                        className="description">
                        {description}
                    </Typography>
                </div>

            </CardBody>
            <CardFooter className="DetailCardFooter !flex ">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                        <h6>Auteur</h6>
                        <ProfileDiv profile={Author} />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <h6>Likes &nbsp;</h6>
                        <button
                            onClick={async () => {
                                const data = await toogleLike()
                                data && setPost(data)
                            }}>
                            <Chip
                                size="sm"
                                value={`${Likes?.length}`}
                                variant="ghost"
                                className="!h-max !px-4 rounded-full grayChip flex items-center "
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
                </div>
            </CardFooter>
        </Card>
    )
}



