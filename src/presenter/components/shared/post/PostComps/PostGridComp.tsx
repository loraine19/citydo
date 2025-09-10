import { PostView } from "../../../../views/viewsEntities/postViewEntities";
import PostCard from "./PostCard";

export default function PostGridComp(props: { line: PostView[], mines?: boolean, change: (e: any) => void, update?: () => void, view?: string, autoFit?: boolean }) {
    const { line, mines, change, update, autoFit } = props
    const short = "  row-span-5 h-full  h-[33vh] lg:h-[52vh]";
    const long = " row-span-6 h-full  h-[38vh] lg:!h-[58vh]";


    return (
        <div className={"grid grid-cols-[auto,auto] grid-rows-[minmax(min-content,1fr)] pt-4 gap-5 "}>
            {line[0] &&
                <div className={line[0].image ? short : short}>
                    <PostCard key={line[0].id} post={line[0]} mines={mines} change={change} update={update} short={true} autoFit={autoFit} />
                </div>}

            {line[1] &&
                <div className={line[1].image ? long : long}>
                    <PostCard key={line[1].id} post={line[1]} mines={mines} change={change} update={update} autoFit={autoFit} />
                </div>}
            {line[2] &&
                <div className={line[2].image ? long : long}>
                    <PostCard key={line[2].id} post={line[2]} mines={mines} change={change} update={update} autoFit={autoFit} />
                </div>}

            {line[3] &&
                <div className={line[2].image ? short : short}>
                    <PostCard key={line[3].id} post={line[3]} mines={mines} change={change} update={update} short={true} autoFit={autoFit} />
                </div>}
        </div >
    )
}