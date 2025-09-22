import AddressMapOpen from "../../common/mapComps/AddressMapOpen";
import { Icon } from "../../common/IconComp";
import CalendarComp from "../../common/CalendarComp";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../../application/stores/user.store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NotifView } from "../../../views/viewsEntities/notifViewEntity";
import DI from "../../../../di/ioc";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { ElementNotif } from "../../../../domain/entities/Notif";
import { useAlertStore } from "../../../../application/stores/alert.store";
import { AvatarUser } from "../../common/AvatarUser";
import NotifDiv from "../../common/NotifDiv";
import { useUxStore } from "../../../../application/stores/ux.store";
import { OnlineDot } from "../../common/onlineDot";
import { CardMD } from "../base/baseComps/Cards";
export default function DashboardPage() {

    //// USER & AUTORISATION
    const { user, fetchUser, setIsLoggedIn, } = useUserStore((state) => state);
    const { setHideNavBottom, navBottom } = useUxStore((state) => state);
    useEffect(() => {
        !user ? setIsLoggedIn(false) : setIsLoggedIn(true);
        !user?.Profile && fetchUser()
        setHideNavBottom(false)
    }, [user])
    const navigate = useNavigate();

    //// PARAMS
    const [searchParams] = useSearchParams();
    const msg = searchParams.get("msg");

    //// NOTIFICATIONS
    const readNotif = async (id: number) => await DI.resolve('readNotifUseCase').execute(id);
    const notifViewModelFactory = DI.resolve('notifViewModel');
    const { notifs, notifsMsg, notifsOther, refetch, count, fetchNextPage, hasNextPage, isLoading, error } = notifViewModelFactory();
    const notifMapViewModelFactory = DI.resolve('notifMapViewModel');
    const { notifsMap, isLoadingMap, refetchMap, countMap } = notifMapViewModelFactory();

    //// CLASSES

    const userClasse = "row-start-1 row-end-3 col-start-1 col-end-2 flex animRev p-2 !max-h-max  ";
    const notifClasse = "row-start-1 row-end-2 col-start-2 col-end-3 animRev p-2 " + (notifs.length > 0 ? " min-h-[4rem] " : "min-h-[5rem]");
    const eventClasse = " row-start-3 row-end-5 col-start-1 col-end-2  flex flex-col h-full  p-2 flex-1 ";
    const mapClasse = "row-start-2 row-end-5 col-start-2 col-end-3 flex flex-1  flex-col h-full p-2";

    //// HANDLE SCROLL NOTIFICATIONS
    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 5 >= scrollHeight) {
                setIsBottom(true)
                if (hasNextPage) fetchNextPage()
            } else setIsBottom(false)
        }
    }

    //// HANDLE NOTIFICATIONS ALERT
    const { setAlertValues, setOpen } = useAlertStore(state => state)
    useEffect(() => {
        msg && setOpen(true)
        setAlertValues({
            handleConfirm: () => { setOpen(false); window.location.href = '/' },
            title: "Notification",
            element: msg || '',
            disableConfirm: true,
            confirmString: 'ok',
        });
    }, [msg])


    return (
        <main

            className={` lg:!-mt-0 !overflow-hidden  wRespXL
            ${navBottom ? ' !max-h-[calc(100dvh_-_8rem)] lg:!max-h-[calc(100dvh_-_8rem)] ' :
                    ' !max-h-[calc(100dvh_-_3.5rem)] lg:!max-h-[calc(100dvh_-_2rem)] '} `}
            data-cy="dashboard-body" >
            <div
                ref={divRef}
                className={` 
                    px-[1rem] flex-1 max-max overflow-auto flex flex-col
                    md:grid md:grid-cols-2 md:grid-rows-[max-content,max-content,1fr,1fr]
                    w-full place-content-start pt-6 rounded-b-[1rem] lg:pb-6 -mt-2 pb-3 
                `}>

                {/* USER CARD  */}
                <div className={`${userClasse}`}>
                    <CardMD className=" !overflow-visible pt-6 flex-1 anim ">
                        <CardMD.Media className="-top-[1.5rem]  w-full flex-1 items-center absolute ">
                            <div className="relative ">
                                <AvatarUser
                                    avatarSize="6xl"
                                    avatarStyle="!shadow -mt-0 border border-slate-900/10 "
                                    Profile={user?.Profile} />
                                <OnlineDot
                                    id={user?.id} />
                            </div>
                        </CardMD.Media>

                        <CardMD.Subhead className="justify-center items-center !py-3 ">

                            <div className="rounded-full md3-slate-container px-12 m py-2 flex flex-col items-center justify-center shadow-sm mt-2">

                                <span>
                                    Bienvenue&nbsp;
                                    {user?.Profile?.firstName ?? ""}   !
                                </span>
                                <span className="text-sm font-normal opacity-80">
                                    vous avez  {user?.Profile?.points ?? 0} points
                                </span>
                            </div>
                        </CardMD.Subhead>
                    </CardMD>
                </div>

                {/* NOTIF CARD  */}
                <div className={`hidden ${notifClasse} grid-cols-1 h-full  md:grid`}>
                    <CardMD className="!flex  pt-2">
                        <CardMD.Subhead className="flex gap-2 items-center">
                            <div className="relative">
                                <Icon
                                    fill bg
                                    icon="notifications"
                                    link="/notification"
                                    size="md"
                                    color="orange"
                                    title="voir mes notifications" />
                                <span className={notifsOther.length < 1 ? "hidden" : " absolute -top-0.5 right-0 w-3 h-3 rounded-full bg-orange-500 border-[2px] border-[var(--md3-primary-container)]"} />
                            </div>
                            <div className="relative">
                                < Icon
                                    fill bg
                                    icon="forum"
                                    link="/chat"
                                    size="md"
                                    color="cyan"
                                    title="voir mes messages" />
                                <span className={notifsMsg.length < 1 ? "hidden" : " absolute -top-0.5 right-0 w-3 h-3 rounded-full bg-cyan-500 border-[2px] border-[var(--md3-primary-container)]"} />
                            </div>
                            {count > 0 ?
                                <>{count} {count > 1 ? 'notifications' : 'notification'} </> :
                                'Vous n\'avez pas de notifications'}

                        </CardMD.Subhead>
                        {/* NOTIFS LIST */}
                        <CardMD.Media className="relative" >
                            <NotifDiv
                                isLoading={isLoading}
                                refetch={refetch}
                                notif={error} />
                            <div className="relative flex flex-col max-h-[3rem]  w-full overflow-y-auto"
                                onScroll={() => handleScroll()}
                                ref={divRef}>
                                <div className="relative overflow-auto gap-0.5 flex flex-col">
                                    {!isLoading && (notifs.map((notif: NotifView, index: number) => notif?.read === false &&
                                        <div key={index + 'div'}
                                            className="flex w-full justify-between h-full gap-2 -ml-1">
                                            <div key={index}
                                                className={`${notif?.type !== ElementNotif.MESSAGE ? 'hover:bg-orange-500' : 'hover:bg-cyan-500'} px-4 font-light text-sm flex  items-center break-words pl-2 justify-between hover:cursor-pointer hover:bg-opacity-20 rounded-full  flex-0 relative `}
                                                onClick={async () => {
                                                    await readNotif(notif?.id);
                                                    await refetch();
                                                    notif?.link && navigate(notif?.link)
                                                }}>
                                                <i className="!line-clamp-1 ">
                                                    <span
                                                        className={` capitalize font-normal ${notif?.typeS === 'message' ? 'text-cyan-600' : 'text-orange-600'}`}>
                                                        {notif?.typeS} :&nbsp;
                                                    </span>
                                                    <span className="w-full">
                                                        {notif?.description}
                                                    </span>
                                                </i>
                                            </div>
                                            <Icon
                                                fill
                                                icon={"close"}
                                                onClick={async () => {
                                                    await readNotif(notif?.id);
                                                    await refetch();
                                                }}
                                                size="md"
                                                style="hover:cursor-pointer absolute right-0 !z-50"
                                                title={"fermer " + notif?.title} />
                                        </div>))}
                                </div>
                            </div>
                            <LoadMoreButton
                                style="-mb-8"
                                color="orange"
                                size="2xl"
                                isBottom={isBottom}
                                hasNextPage={hasNextPage}
                                handleScroll={() => handleScroll()} />
                        </CardMD.Media>
                    </CardMD>
                </div>

                {/* MAPCARD  */}
                <div className={mapClasse}>
                    <CardMD className="min-h-full !flex flex-1 py-2  anim  ">
                        <CardMD.Subhead>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <Icon
                                        fill
                                        bg
                                        icon="location_on"
                                        link="/service"
                                        size="md"
                                        color="slate"
                                        title="voir mes services" />
                                    {isLoadingMap ?
                                        'Chargement...' :
                                        ` ${countMap ?? 0} nouveautés à proximité`}
                                </div>
                            </div>
                        </CardMD.Subhead>
                        <CardMD.Media className="flex-1 h-full flex">
                            {(user?.Profile?.Address && notifsMap && !isLoadingMap) ?
                                <AddressMapOpen
                                    message=" Vous êtes ici "
                                    address={user?.Profile?.Address}
                                    notifs={notifsMap} /> :
                                <CardMD className="FixCard h-full w-full !flex  !flex-col flex-1 justify-center items-center bg-gray-50">
                                    <CardMD.Subhead className="flex-1 h-full">
                                        {user?.Profile?.Address ? 'pas de nouveautés à proximité , essayer de modifier de rafraichir' : 'Veuillez renseigner votre adresse pour voir les services à proximité'}
                                    </CardMD.Subhead>
                                    {user?.Profile?.Address ?
                                        <NotifDiv
                                            notif={
                                                isLoadingMap ? 'Chargement...' : 'impossible de charger la carte, veuillez réessayer'}
                                            isLoading={isLoadingMap}
                                            refetch={refetchMap} />
                                        : <Icon
                                            icon="add"
                                            fill bg
                                            color="orange"
                                            title="ajouter votre adresse"
                                            onClick={() => navigate('/myprofile#address')} />
                                    }
                                </CardMD>}
                        </CardMD.Media>
                    </CardMD>
                </div>

                {/* CALENDARD CARD  */}
                <div className={eventClasse}>
                    <CardMD className="min-h-full grid pb-2">

                        <CalendarComp logo={true} />
                    </CardMD>
                </div>
            </div>
        </main>
    );
}