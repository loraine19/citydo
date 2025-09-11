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
import { GroupLink } from "../../../common/GroupLink";
import { IconAnimate } from "../../../common/IconAnimate";
import { Button } from "../../base/baseComps/Buttons";

type PostCardProps = { post: PostView, mines?: boolean, change: (e: any) => void, update?: () => void, short?: boolean, autoFit?: boolean }

export default function PostCard({ post: initialPost, mines, change, update, short, autoFit }: PostCardProps) {
    const [post, setPost] = useState<PostView>(initialPost);
    const { id, title, description, image, categoryS, createdAt, Likes, User, flagged, ILike, toogleLike, Group } = post ?? {} as PostView;
    const deletePost = async (id: number) => await DI.resolve('deletePostUseCase').execute(id)
    const myActions: Action[] = GenereMyActions(post, "annonce", deletePost)

    return (
        <CardMD
            autoFit={autoFit}
            className="min-h-full"
            imagePosition="top"
            link={`/annonce/${id}`}
            image={
                <CardMD.Image
                    src={image as string || '/image/placeholder.jpg'}
                    alt={title}
                    className="relative"
                >

                    <div className="flex flex-1 !p-0 w-full h-max flex-wrap-reverse justify-end  gap-2">
                        <DateChip
                            start={createdAt}
                            prefix=" "
                        />

                        <IconAnimate
                            active={ILike}
                            icon={'thumb_up'} />
                    </div>
                </CardMD.Image>
            }
        >
            <CardMD.Chips>


                <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        const cat = e.currentTarget.innerText.toLowerCase();
                        change(cat as any);
                    }}>
                    <Chip
                        size="sm"
                        value={`${categoryS}`}
                        className="rounded-full h-max truncate Chip md3-rose-container shadow"
                    />
                </button>
            </CardMD.Chips>

            <CardMD.Headline className=" !line-clamp-1 ">
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

                <Button
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
            </CardMD.Footer>
        </CardMD>
    )
}