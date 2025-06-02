import { Card, CardHeader, Typography, CardBody, CardFooter, Chip } from "@material-tailwind/react";
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

type PostCardProps = { post: PostView, mines?: boolean, change: (e: any) => void, update?: () => void, short?: boolean }

export default function PostCard({ post: initialPost, mines, change, update, short }: PostCardProps) {
    const [post, setPost] = useState<PostView>(initialPost);
    const { id, title, description, image, categoryS, createdAt, Likes, User, flagged, ILike, toogleLike, Group } = post
    const haveImage: boolean = post.image ? true : false
    const deletePost = async (id: number) => await DI.resolve('deletePostUseCase').execute(id)
    const myActions: Action[] = GenereMyActions(post, "annonce", deletePost)

    return (
        <Card className={haveImage ? "FixCard " : "FixCardNoImage  "}>
            <CardHeader className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                floated={haveImage}>
                <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                    <button onClick={(e: any) => change(e)}>
                        <Chip
                            size="sm"
                            value={`${categoryS}`}
                            className={'CyanChip'}>
                        </Chip>
                    </button>
                    <DateChip
                        start={createdAt}
                        prefix=" " />
                </div>
                {image &&
                    <img
                        onError={(e) => e.currentTarget.src = "/image/placeholder2.png"}
                        src={image as any}
                        alt={title}
                        className="h-full  w-full object-cover"
                    />}
            </CardHeader>
            <CardBody className={` FixCardBody !flex-1`}>
                <Title
                    title={title}
                    flagged={flagged} id={id}
                    type='service'
                    group={Group}
                />
                <div className="flex flex-col h-full ">
                    <Typography
                        className={`${short ? '!line-clamp-1' : '!line-clamp-2'} leading-[1.3rem] overflow-x-auto`}
                        color="blue-gray">
                        {description}
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="CardFooter   ">
                {!mines ?
                    <div className=" w-full truncate pl-2 -ml-2 ">
                        <ProfileDiv
                            profile={User} />
                    </div> :
                    <ModifBtnStack
                        actions={myActions}
                        update={update} />}
                <div className="flex items-center pl-4 gap-2">
                    <button
                        onClick={async () => { setPost(await toogleLike()) }}
                        className={mines ? `hidden md:flex` : `flex`}>
                        <Chip
                            size="md" value={`${Likes?.length}`}
                            variant="ghost"
                            className="  rounded-full h-full  flex items-center"
                            icon={<Icon
                                icon="thumb_up"
                                size="md"

                                fill={ILike}
                                color={ILike ? "cyan" : "gray"}
                                title={ILike ? "je n'aime plus" : "j'aime"}
                            />}>
                        </Chip>
                    </button>
                    <Icon
                        icon="arrow_circle_right"
                        link={`/annonce/${id}`}
                        title={`voir les details de l'annonce  ${title}`}
                        size="4xl"
                        fill />
                </div>
            </CardFooter>
        </Card >
    )
}