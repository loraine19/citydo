import { useUxStore } from "../../../application/stores/ux.store";
import { CardMD } from "../shared/base/baseComps/Cards";

export function Skeleton(props: { className?: string, grid?: boolean, compact?: boolean }) {
    const { compact } = props ?? 'SubGrid'
    const style = `animate-pulse  flex items-center FixCard justify-center !w-full !h-full`;

    const { color } = useUxStore()
    return (
        <CardMD
            autoFit={compact}
            className={style + ' min-h-full opacity-60 anim '}
            image={
                <CardMD.Image
                    src="public/image/placeholder.jpg"
                    alt=""
                    position="top"
                    className={`min-h-full md3-${color}-container`}
                >
                    <div className={`min-h-[99%]h-full md3-${color}-container rounded-2xl w-full animate-pulse"`}></div>

                </CardMD.Image>
            }
        >
            <CardMD.Headline className="w-full flex-1 flex">
                <div className="h-6 md3-surface rounded-3xl w-2/3 animate-pulse"></div>
            </CardMD.Headline>
            <CardMD.Subhead className="flex-1  min-h-[1rem] ">
                <div className="h-4 md3-surface rounded-3xl w-3/4 animate-pulse"></div>
            </CardMD.Subhead>
            <CardMD.SupportingText className="flex-1 !flex-col   min-h-[5rem] ">
                <div className="h-4 md3-surface rounded-3xl w-full mb-2 animate-pulse"></div>
                <div className="h-4 md3-surface rounded-3xl w-5/6 animate-pulse"></div>
            </CardMD.SupportingText>
            <CardMD.Footer className="flex-1 gap-8 min-h-[7rem] ">
                <div className="h-8 md3-surface rounded-3xl w-1/2 animate-pulse"></div>
                <div className="h-8 md3-surface rounded-3xl w-8 animate-pulse"></div>
            </CardMD.Footer>
        </CardMD>
    );
};

export function SkeletonGrid(props: { small?: boolean, count?: number, compact?: boolean }) {
    const { small, count, compact } = props;
    let num = count ?? 4
    small ? num = 8 : num = num
    return (
        <section>
            <div className={` 
            ${small ? 'GridSmall  min-h-full' : 'Grid'} 
                ${compact ? 'GridCompact' : ''} `}>
                {[...Array(num)].map((_, index) => (
                    <div
                        key={index + 'div'}
                        className={`${small ? 'SubGridSmall flex min-h-44 justify-center items-center pt-1' : 'SubGrid h-max '}  `}>
                        <Skeleton
                            grid
                            key={index} />
                    </div>
                ))}
            </div>
        </section>
    )
}

