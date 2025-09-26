import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SkeletonGrid } from "../../common/Skeleton";
import DI from "../../../../di/ioc";
import { FlagView } from "../../../views/viewsEntities/flagViewEntities";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { useUxStore } from "../../../../application/stores/ux.store";
import { HandleHideParams, HandleScrollParams } from "../../../../application/useCases/utils.useCase";
import DetailsHeadSection from "../base/baseComps/DetailsHeadSection";
import { FlagCard } from "./flagCards/FlagCard";
import { useNavStore } from "../../../../application/stores/nav.store";
import FormHeadSection from "../base/baseComps/FormHeadSection";

export default function FlagPage() {
    const { flags, isLoading, error, refetch, hasNextPage, fetchNextPage, count } = DI.resolve('flagsViewModel');
    const [notif, setNotif] = useState<string>('');

    useEffect(() => {
        if (error) {
            setNotif('Une erreur est survenue lors du chargement');
        } else if (count === 0 && !isLoading) {
            setNotif('Aucun signalement trouvé');
        } else {
            setNotif('');
        }
    }, [isLoading, error, count]);

    // HANDLE SCROLL
    const utils = DI.resolve('utils');
    const handleScroll = (params: HandleScrollParams) => utils.handleScroll(params);
    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const onScroll = useCallback(() => {
        const params: HandleScrollParams = {
            divRef,
            hasNextPage,
            fetchNextPage,
            setIsBottom,
        };
        handleScroll(params);
    }, [divRef, hasNextPage, fetchNextPage]);

    // HANDLE HIDE
    const handleHide = (params: HandleHideParams) => utils.handleHide(params);
    const { setHideNavBottom, hideNavBottom } = useUxStore((state) => state);
    const handleHideCallback = useCallback(() => {
        const params: HandleHideParams = { divRef, setHide };
        handleHide(params);
    }, [divRef]);
    const [hide, setHide] = useState<boolean>(false);
    useEffect(() => {
        if (hide !== hideNavBottom) setHideNavBottom(hide);
    }, [hide, hideNavBottom, setHideNavBottom]);

    //// TO NAV BAR
    const { setSearchSection } = useNavStore((state) => state);

    const SearchSection = useMemo(() => (
        <FormHeadSection
            isLoading={isLoading}
            notif={notif}
            refetch={refetch}
            error={error}
            infosChipValue={`${count ?? flags.length ?? 'aucun '} Signalements`} >
        </FormHeadSection>
    ), [isLoading, open,]);

    useEffect(() => {
        setSearchSection(SearchSection);
        return () => {
            setSearchSection(undefined);
        }
    }, [SearchSection, isLoading, open]);
    return (
        <main>
            <DetailsHeadSection
                hidden={hideNavBottom && !isLoading && !error && !notif}
                notif={notif}
                error={error}
                isLoading={isLoading}
                refetch={refetch}
            />
            {isLoading ? (
                <SkeletonGrid small count={6} />
            ) : (
                <section
                    ref={divRef}
                    onScroll={() => { onScroll(); handleHideCallback(); }}
                    className="GridSmall"
                >
                    {flags.map((element: FlagView, index: number) => (

                        <FlagCard
                            key={index}
                            flag={element}
                            update={refetch}
                        />
                    ))}
                    <LoadMoreButton
                        isBottom={isBottom}
                        hasNextPage={hasNextPage}
                        handleScroll={onScroll}
                    />
                </section>
            )}
        </main>
    );
}
