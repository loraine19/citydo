import AddressMapOpen from "../../common/mapComps/AddressMapOpen";
import { Icon } from "../../common/IconComp";
import CalendarComp from "../../common/CalendarComp";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../../application/stores/user.store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LogOutButton } from "../../common/LogOutBtn";
import { NotifView } from "../../../views/viewsEntities/notifViewEntity";
import { Role } from "../../../../domain/entities/GroupUser";
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
    const modo = user?.GroupUser?.map(g => g.role).includes(Role.MODO) || false;
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
    const userClasse = "flex row-span-3 lg:grid  animRev  lg:min-h-full ";
    const eventClasse = " flex h-full !min-h-[13rem] row-span-5 lg:grid   ";
    const notifClasse = " row-span-1 animRev " + (notifs.length > 0 ? " min-h-[5rem]" : " min-h-[3rem]")
    const mapClasse = "flex row-span-7 h-full  lg:min-h-[32%] lg:grid ";


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
            className={`px-4 lg:!-mt-0 !overflow-hidden pb-2 bg-gradient-to-t from-slate-50
               via-slate-200  to-slate-50  wRespXL
            ${navBottom ? '-mt-6  !max-h-[calc(100dvh_-_6.5rem)] lg:!max-h-[calc(100dvh_-_8rem)] ' :
                    '!-mt-6 !max-h-[calc(100dvh_-_3.5rem)] lg:!max-h-[calc(100dvh_-_2rem)] '} `}
            data-cy="dashboard-body" >
            <div id='refDiv'
                ref={divRef}
                className={" px-[1%] flex-1 max-max overflow-auto flex flex-col lg:grid grid-cols-2 grid-rows-[auto_auto_auto_1fr_1fr_2fr_auto_auto] w-full gap-y-2 lg:gap-y-3 lg:gap-x-4 place-content-start pt-11 lg:pt-6 rounded-b-[1rem] lg:pb-6  pb-3 "}>

                {/* USER CARD  */}
                <div className={`${userClasse}`}>
                    <CardMD className="lg:h-full !overflow-visible  flex-1 anim lg:min-h-full">
                        <CardMD.Media className="-top-[1.5rem] w-full flex-1 items-center absolute ">
                            <div className="relative !z-40 ">
                                <AvatarUser
                                    avatarSize="lg"
                                    avatarStyle="!shadow -mt-0 border border-slate-900/10 w-[4.5rem] h-[4.5rem]"
                                    Profile={user?.Profile} />
                                <OnlineDot
                                    id={user?.id} />
                            </div>
                        </CardMD.Media>
                        <CardMD.Headline className="pt-[2.5rem] justify-center items-center text-center ">
                            {user?.Profile?.firstName}
                        </CardMD.Headline>
                        <CardMD.Media className="justify-center items-center ">
                            <div className="flex gap-1 border rounded-full max-w-max justify-center items-center py-1 px-2 flex-1 bg-slate-200 border-slate-300 ">
                                <Icon bg clear
                                    link="/myprofile"
                                    icon="person_edit"
                                    size="lg"
                                    title="ouvrir la page profil" />
                                <hr className="bg-slate-300 h-3/4 w-[1px]" />
                                <Icon bg clear
                                    link="/groupe"
                                    icon="groups"
                                    size="lg"
                                    title="ouvrir la page des groupes" />
                                <hr className="bg-slate-300 h-3/4 w-[1px]" />
                                <Icon bg clear
                                    link={modo ? '/conciliation' : ''}
                                    icon="diversity_3"
                                    size="lg"
                                    title={modo ? "ouvrir la page conciliation" : "vous devez être conciliateur dans un groupe"} />
                                <hr className="bg-slate-300 h-3/4 w-[1px]" />
                                <LogOutButton
                                    style={'!border-0'} size="lg" />
                            </div>
                        </CardMD.Media>
                    </CardMD>
                </div>

                {/* NOTIF CARD  */}
                <div className={`hidden lg:${notifClasse} grid-cols-1 h-full  lg:grid`}>
                    <CardMD className="!flex bg-gradient-to-t from-orange-100 to-orange-50">
                        <CardMD.Subhead className="flex gap-2 items-center">
                            <div className="relative">
                                <Icon
                                    fill bg
                                    icon="notifications"
                                    link="/notification"
                                    size="md"
                                    color="orange"
                                    title="voir mes notifications" />
                                <span className={notifsOther.length < 1 ? "hidden" : " absolute -top-0.5 right-0 w-3 h-3 rounded-full bg-orange-500 border-[2px] border-white"} />
                            </div>
                            <div className="relative">
                                < Icon
                                    fill bg
                                    icon="forum"
                                    link="/chat"
                                    size="md"
                                    color="cyan"
                                    title="voir mes messages" />
                                <span className={notifsMsg.length < 1 ? "hidden" : " absolute -top-0.5 right-0 w-3 h-3 rounded-full bg-cyan-500 border-[2px] border-white"} />
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
                            <div className="relative flex flex-col max-h-14  w-full overflow-y-auto"
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
                                                <p className="!line-clamp-1 ">
                                                    <span
                                                        className={` capitalize font-normal ${notif?.typeS === 'message' ? 'text-cyan-600' : 'text-orange-600'}`}>
                                                        {notif?.typeS} :&nbsp;
                                                    </span>
                                                    <span className="w-full">
                                                        {notif?.description}
                                                    </span>
                                                </p>
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
                    <CardMD className="min-h-full !flex flex-1  anim  ">
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
                                    <CardMD.Subhead>
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
                    <CardMD className=" min-h-full max-h-full w-full bg-gradient-to-t from-cyan-100 to-cyan-50 anim mb-4">

                        <CalendarComp logo={true} />
                    </CardMD>
                </div>
            </div>
        </main>
    );
}