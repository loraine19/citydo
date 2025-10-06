import AddressMapOpen from "../../common/mapComps/AddressMapOpen";
import { Icon } from "../../common/IconComp";
import CalendarComp from "../../common/CalendarComp";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../../application/stores/user.store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NotifView } from "../../../views/viewsEntities/notifViewEntity";
import DI from "../../../../di/ioc";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { useAlertStore } from "../../../../application/stores/alert.store";
import { AvatarUser } from "../../common/AvatarUser";
import NotifDiv from "../../common/NotifDiv";
import { useUxStore } from "../../../../application/stores/ux.store";
import { OnlineDot } from "../../common/onlineDot";
import { CardMD } from "../base/baseComps/Cards";
import GeoLocBtn from "../../common/mapComps/GeoLocBtn";
import Chip from "../../common/adaptatersComps/Chip";
export default function DashboardPage() {

    //// USER & AUTORISATION
    const { user, fetchUser, setIsLoggedIn, } = useUserStore((state) => state);
    const { setHideNavBottom, navBottom } = useUxStore((state) => state);
    useEffect(() => {
        if (!user) {
            setIsLoggedIn(false);
            setTimeout(() => {
                setAlertValues({
                    title: "Session expirée",
                    element: "Veuillez vous reconnecter.",
                    confirmString: "OK",
                    handleConfirm: () => {
                        setOpen(false);
                        window.location.reload();
                    },
                });
            }, 10000);
        }
        else setIsLoggedIn(true);

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
    const { notifsMap, isLoadingMap, refetchMap, errorMap } = notifMapViewModelFactory();

    //// CLASSES
    const userClasse = "row-start-1 md:h-full row-end-3 col-start-1 col-end-2 flex animRev p-2   ";
    const notifClasse = "row-start-1 row-end-2 col-start-2 col-end-3 animRev p-2 " + (notifs.length > 0 ? " min-h-[4rem] " : "min-h-[5rem]");
    const eventClasse = "anim row-start-3 row-end-5 col-start-1 col-end-2  flex flex-col h-full  p-2 flex-1 ";
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

    //// HANDLE ADDRESS
    const [address, setAddress] = useState(user?.Profile?.Address);
    const [auto] = useState(true);
    const [hideUser, setHideUser] = useState(false);

    return (
        <main className={` wRespXL overflow-auto xs:overflow-hidden 
            ${navBottom && ' hBottomNav !-mt-2 '} `}
            data-cy="dashboard-body" >
            <div
                onScroll={() => {
                    if (divRef.current) {
                        const { scrollTop, scrollHeight, clientHeight } = divRef.current;
                        if (scrollTop + clientHeight + 6 >= scrollHeight) {
                            setHideUser(true);
                        } else {
                            setHideUser(false);
                        }
                    }
                    console.log(hideUser);
                    handleScroll();
                }}
                ref={divRef}
                className={` pt-[2rem]
                    px-[0.3rem] flex-1 max-max overflow-auto flex flex-col
                    md:grid md:grid-cols-2 md:grid-rows-[max-content,max-content,1fr,1fr]
                    w-full place-content-start  rounded-b-[1rem] 
                `}>

                {/* USER CARD  */}
                <div className={`${userClasse}`}>
                    <CardMD className=" !overflow-visible min-h-full  flex-1 anim ">
                        <CardMD.Media className={`-top-[2.5rem]  w-full flex-1 items-center absolute`}>
                            <div className={"relative "}>
                                <AvatarUser
                                    avatarSize="6xl"
                                    avatarStyle="ring-[6px]  ring-[var(--md3-surface)]"
                                    Profile={user?.Profile} />
                                <OnlineDot
                                    id={user?.id} />
                            </div>
                        </CardMD.Media>

                        <CardMD.Subhead className="justify-center items-center !pt-5 ">
                            <div className="rounded-full md3-slate-container px-12 m py-2 flex flex-col items-center justify-center shadow-sm my-2">
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
                    <CardMD className="!flex pt-2">
                        <CardMD.Subhead className="flex gap-2 items-center">
                            <div className="relative">
                                <Icon
                                    fill bg
                                    icon="notifications"
                                    link="/notification"
                                    size="md"
                                    color="orange"
                                    title="voir mes notifications" />
                                <span className={notifsOther.length < 1 ? "hidden" : " absolute -top-0.5 right-0 w-3 h-3 rounded-full md3-orange border-[2px] md3-border-primary-container"} />
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
                                <NotifDiv
                                    isLoading={isLoading}
                                    error={error}
                                    refetch={refetch}
                                    notif={isLoading ? 'Chargement...' :
                                        error ??
                                            notifs.length === 0 ? 'Aucune notification' : ''} />}

                        </CardMD.Subhead>

                        {/* NOTIFS LIST */}
                        <CardMD.Media className="relative" >
                            <NotifDiv
                                isLoading={isLoading}
                                refetch={refetch}
                                notif={error} />
                            <div className="relative flex flex-col max-h-[1.5rem]  w-full overflow-y-auto"
                                onScroll={() => handleScroll()}
                                ref={divRef}>
                                <div className="relative overflow-auto gap-1 flex flex-col">
                                    {!isLoading && (notifs.map((notif: NotifView, index: number) => notif?.read === false &&
                                        <div key={index + 'div'}
                                            className="flex w-full justify-between h-full gap-2 ">
                                            <div key={index}
                                                className={`hover:bg-[var(--md3-surface)] font-light text-sm flex  items-center break-words justify-between hover:cursor-pointer rounded-xl  flex-0 relative `}
                                                onClick={async () => {
                                                    await readNotif(notif?.id);
                                                    await refetch();
                                                    notif?.link && navigate(notif?.link)
                                                }}>
                                                <div className="!line-clamp-1 ">
                                                    <Chip
                                                        size="small"
                                                        variant="outlined"
                                                        color={notif?.typeS === 'message' ? 'cyan' : 'orange'}
                                                        className={` capitalize font-normal`}
                                                        value={notif?.typeS} />
                                                    <span className="w-full px-1">
                                                        {notif?.description}
                                                    </span>
                                                </div>
                                                <Icon

                                                    fill
                                                    icon={"cancel"}
                                                    onClick={async () => {
                                                        await readNotif(notif?.id);
                                                        await refetch();
                                                    }}
                                                    size="md"
                                                    style="hover:cursor-pointer min-w-max opacity-60"
                                                    title={"fermer " + notif?.title} />
                                            </div>

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
                            <GeoLocBtn
                                setAddress={setAddress}
                                auto={auto}
                            />
                        </CardMD.Subhead>
                        <CardMD.Media className="flex-1 h-full flex">

                            {
                                // If address exists and notifsMap is loaded, show the map
                                address && notifsMap && !isLoadingMap ? (
                                    <AddressMapOpen
                                        message=" Vous êtes ici "
                                        address={address}
                                        notifs={notifsMap}
                                    />
                                ) : (
                                    // If address exists, show loading/error or no data message
                                    address ? (
                                        <NotifDiv
                                            notif={errorMap ?? isLoadingMap ? 'Chargement...' : 'Aucune donnée à afficher'}
                                            isLoading={isLoadingMap}
                                            refetch={refetchMap}
                                        />
                                    ) : (
                                        // If no address, prompt user to add address or use geolocation
                                        <>
                                            <Icon
                                                icon="add"
                                                fill
                                                bg
                                                color="orange"
                                                title="ajouter votre adresse ou utiliser la géolocalisation"
                                                onClick={() => navigate('/myprofile#address')}
                                            />
                                            <span className="text-sm font-light opacity-80 mt-2">
                                                Ajouter votre adresse dans votre profil, ou utiliser la géolocalisation pour voir les notifications autour de vous
                                            </span>
                                        </>
                                    )
                                )
                            }
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