import { Card } from "@material-tailwind/react";

export function Skeleton(props: { className?: string }) {
    const { className } = props ?? 'SubGrid'
    const style = `animate-pulse flex items-center justify-center !w-full !h-full`;
    return (
        <div className={`h-full w-full flex items-center justify-center ${className ?? ''}`}>
            <Card className={style}> &nbsp;</Card></div>
    );
};

export function SkeletonGrid(props: { small?: boolean, count?: number }) {
    const { small, count } = props;
    let num = count ?? 4
    small ? num = 8 : num = num
    return (
        <section>
            <div className={` ${small ? 'GridSmall  min-h-full' : 'Grid'} gap-4`}>
                {[...Array(num)].map((_, index) => (
                    <div
                        key={index + 'div'}
                        className={`${small ? 'SubGridSmall flex min-h-44 justify-center items-center -mt-5 pt-1' : ' '} SubGrid `}>
                        <Skeleton
                            key={index} />
                    </div>
                ))}
            </div>
        </section>
    )
}

