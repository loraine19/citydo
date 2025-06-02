import { Post, PostCategory } from "../../../domain/entities/Post";
import { Flag } from "../../../domain/entities/Flag";
import DI from "../../../di/ioc";
import { Like } from "../../../domain/entities/Like";

export class PostView extends Post {
    flagged: boolean = false;
    ILike: boolean = false;
    categoryS: string = 'error';
    isMine: boolean = false;
    shareA: string[] = [];
    toogleLike: () => Promise<PostView>;

    constructor(post: Post, userId: number) {
        super(post)
        if (!post) {
            setTimeout(() => {
                if (!post) throw new Error('Impossible de récupérer les annonces')
            }, 500);
        }
        this.flagged = post?.Flags?.find((flag: Flag) => flag.userId === userId) ? true : false;
        this.ILike = post?.Likes?.find((like: Like) => like.userId === userId) ? true : false;
        this.categoryS = PostCategory[this.category as string as keyof typeof PostCategory];
        this.isMine = post?.userId === userId;
        this.shareA = post?.share?.toString().split('_')
        this.toogleLike = async () => {
            await DI.resolve('toogleLikeUseCase').execute(post, post.id, userId);
            const updatedPost = await DI.resolve('getPostByIdUseCase').execute(post.id);
            return new PostView(updatedPost, userId)
        }
    }
}
