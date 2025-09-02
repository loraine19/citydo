import { Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import { useUxStore } from "../../../application/stores/ux.store";

export function Skeleton(props: { className?: string }) {
    const { className } = props ?? 'SubGrid'
    const style = `animate-pulse  flex items-center FixCard justify-center !w-full !h-full`;

    const { color } = useUxStore()
    return (
        <div className={`h-full  pb-1.5 w-full flex items-center justify-center ${className ?? ''}`}>
            <Card className={style + 'fixCard w-full h-full gap-2 !flex flex-col'}>
                <CardHeader className={`${color}BG bg-slate-300/70 mx-4 FixCardHeader animate-pulse !flex h-full flex-1 w-[calc(100%-1rem)] border-slate-300 lg:min-h-[220px] md:min-h-[150px] min-h-[200px]`}>
                </CardHeader>
                <CardBody className="FixCardBody flex-1 !py-4 !flex gap-2">
                    <div className="h-6 bg-slate-300 rounded-2xl  animate-pulse"></div>
                    <div className="h-4 bg-slate-300 rounded-2xl w-3/4 animate-pulse"></div>

                </CardBody>
                <CardFooter className="FixCardFooter !flex gap-2 !my-2 px-6 justify-between items-center">
                    <div className="h-8 bg-slate-300 rounded-2xl w-1/2 animate-pulse"></div>
                    <div className="h-8 bg-slate-300 rounded-2xl w-8 animate-pulse"></div>
                </CardFooter>
            </Card>
        </div>
    );
};

export function SkeletonGrid(props: { small?: boolean, count?: number }) {
    const { small, count } = props;
    let num = count ?? 4
    small ? num = 8 : num = num
    return (
        <section>
            <div className={` ${small ? 'GridSmall  min-h-full' : 'Grid'}`}>
                {[...Array(num)].map((_, index) => (
                    <div
                        key={index + 'div'}
                        className={`${small ? 'SubGridSmall flex min-h-44 justify-center items-center pt-1' : 'SubGrid  '}  `}>
                        <Skeleton
                            key={index} />
                    </div>
                ))}
            </div>
        </section>
    )
}

