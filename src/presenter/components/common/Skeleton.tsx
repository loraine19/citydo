import { useUxStore } from "../../../application/stores/ux.store";
import { CardMD } from "../shared/base/baseComps/Cards";

export function Skeleton(props: { className?: string, grid?: boolean, compact?: boolean }) {
    const { className, compact } = props ?? 'SubGrid'
    const style = `animate-pulse  flex items-center FixCard justify-center !w-full !h-full`;

    const { color } = useUxStore()
    return (
        <div className={`h-full !z-[0]  pb-1.5 w-full flex flex-col flex-1 items-center justify-center ${className ?? ''}`}>
            <CardMD
                autoFit={compact}
                variant="elevated"
                className={style + ' !w-full h-full grid-cols-[100%]  '}
                image={
                    <CardMD.Image
                        src="/images/placeholder.png"
                        alt=""
                        position="top"
                        className={`!w-full !flex-1 flex min-w-full ${color}Style`}
                    >

                    </CardMD.Image>
                }
            >
                <CardMD.Headline className="min-w-[100%] flex-1 flex">
                    <div className="h-6 bg-slate-200 rounded-3xl w-2/3 animate-pulse"></div>
                </CardMD.Headline>
                <CardMD.Subhead>
                    <div className="h-4 bg-slate-200 rounded-3xl w-3/4 animate-pulse"></div>
                </CardMD.Subhead>
                <CardMD.SupportingText>
                    <div className="h-4 bg-slate-200 rounded-3xl w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-slate-200 rounded-3xl w-5/6 animate-pulse"></div>
                </CardMD.SupportingText>
                <CardMD.Footer>
                    <div className="h-8 bg-slate-200 rounded-3xl w-1/2 animate-pulse"></div>
                    <div className="h-8 bg-slate-200 rounded-3xl w-8 animate-pulse"></div>
                </CardMD.Footer>
            </CardMD>
            {/* {!grid &&
                <footer><CTAMines
                    actions={[{ icon: '...loading' }]}>

                </CTAMines></footer>} */}
        </div>
    );
};

export function SkeletonGrid(props: { small?: boolean, count?: number, compact?: boolean }) {
    const { small, count, compact } = props;
    let num = count ?? 4
    small ? num = 8 : num = num
    return (
        <section>
            <div className={` ${small ? 'GridSmall  min-h-full' : 'Grid'} ${compact ? 'GridCompact' : ''} `}>
                {[...Array(num)].map((_, index) => (
                    <div
                        key={index + 'div'}
                        className={`${small ? 'SubGridSmall flex min-h-44 justify-center items-center pt-1' : 'SubGrid  '}  `}>
                        <Skeleton
                            grid
                            key={index} />
                    </div>
                ))}
            </div>
        </section>
    )
}

