
import SubHeader from "../../common/SubHeader";
import { FlagCard } from "./flagCards/FlagCard";
import { SkeletonGrid } from "../../common/Skeleton";
import DI from "../../../../di/ioc";
import { FlagView } from "../../../views/viewsEntities/flagViewEntities";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { useCallback, useEffect, useRef, useState } from "react";
import NotifDiv from "../../common/NotifDiv";
import { useUxStore } from "../../../../application/stores/ux.store";
import { HandleHideParams, HandleScrollParams } from "../../../../application/useCases/utils.useCase";



export default function FlagPage() {

    const { flags, isLoading, error, refetch, hasNextPage, fetchNextPage, count } = DI.resolve('flagsViewModel')

    const [notif, setNotif] = useState<string>('...');

    useEffect(() => {
        switch (true) {
            case error:
                setNotif('Une erreur est survenue lors du chargement')
                break;
            case (count === 0 && !isLoading):
                setNotif('Aucun signalement trouvé')
                break;
            default:
                setNotif('')
        }
    }, [isLoading, error, count]);

    //// HANDLE SCROLL
    const utils = DI.resolve('utils')
    const handleScroll = (params: HandleScrollParams) => utils.handleScroll(params)
    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const onScroll = useCallback(() => {
        const params: HandleScrollParams = {
            divRef,
            hasNextPage,
            fetchNextPage,
            setIsBottom,
        }
        handleScroll(params)
    }, [divRef]);


    //// HANDLE HIDE  
    const handleHide = (params: HandleHideParams) => utils.handleHide(params)
    const { setHideNavBottom, hideNavBottom } = useUxStore((state) => state);
    const handleHideCallback = useCallback(() => {
        const params: HandleHideParams = { divRef, setHide }
        handleHide(params)
    }, [divRef]);
    const [hide, setHide] = useState<boolean>(false);
    useEffect(() => { (hide !== hideNavBottom) && setHideNavBottom(hide) }, [hide]);


    //// RENDER
    return (

        <main>
            <div className="sectionHeader">
                <SubHeader
                    qty={count}
                    type={"Signalement"}
                    closeBtn={true} link="/" />
                {(notif && !isLoading) &&
                    <NotifDiv
                        notif={notif}
                        isLoading={isLoading}
                        refetch={refetch} />}
            </div>
            {isLoading ?
                <SkeletonGrid small count={6} /> :
                <section
                    id='refDiv'
                    ref={divRef}
                    onScroll={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onScroll();
                        handleHideCallback();

                    }}
                    className="GridSmall "
                >
                    {flags.map((element: FlagView, index: number) =>
                        <div className="SubGrid " key={'div' + index}>
                            <FlagCard
                                key={index}
                                flag={element}
                                update={refetch} />
                        </div>
                    )}
                    <LoadMoreButton
                        isBottom={isBottom}
                        hasNextPage={hasNextPage}
                        handleScroll={onScroll} />
                </section>}

        </main>
    )

}