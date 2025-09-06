import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
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
    const userClasse = "flex row-span-3 lg:grid  animRev z-50  ";
    const eventClasse = "h-full flex !min-h-[14rem] row-span-5 pb-0.5 lg:grid overflow-auto";
    const notifClasse = " row-span-2  " + (notifs.length > 0 ? " min-h-[8rem]" : " min-h-[5.5rem]")
    const mapClasse = "flex row-span-6  !min-h-[14rem] lg:min-h-[32%] lg:grid ";


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
        <main className={`
            ${navBottom ? '-mt-6  !max-h-[calc(100dvh_-_8rem)] lg:!max-h-[calc(100dvh_-_9.5rem)] ' : '!-mt-6 !max-h-[calc(100dvh_-_3.5rem)] lg:!max-h-[calc(100dvh_-_2rem)] '} lg:!mt-0  overflow-hidden `}
            data-cy="dashboard-body" >
            <div ref={divRef}
                className={" px-[1%] flex-1 max-max overflow-auto  flex flex-col lg:grid grid-cols-2 grid-rows-[auto_auto_auto_1fr_1fr_2fr_auto_auto] w-full gap-y-2 lg:gap-y-3 lg:gap-x-4  place-content-start pt-11 lg:pt-6 rounded-b-[1rem] lg:pb-6  pb-3 "}>

                {/* USER CARD  */}
                <div className={`${userClasse}`}>
                    <Card className="FixCard lg:h-full p-0 mt-6 lg:!mt-0 !flex-col rounded-2xl bg-white flex-1 !flex anim !overflow-visible ">
                        <CardHeader className="-mt-6 flex flex-col items-center justify-center  bg-transparent shadow-none">
                            <div className="relative !z-40 space-x-1 ">
                                <AvatarUser
                                    avatarSize="lg"
                                    avatarStyle="!shadow-md -mb-0.5  w-16 h-16 lg:w-[4.5rem] lg:h-[4.5rem] "
                                    Profile={user?.Profile} />
                                <OnlineDot
                                    id={user?.id} />
                            </div>

                            <div className="flex flex-col items-center justify-center pt-1">
                                <Typography
                                    className={'border-b-[1px] px-4 !border-gray-400'}
                                    as="h6" >
                                    {user?.Profile?.firstName}
                                </Typography>
                            </div>
                        </CardHeader>
                        <CardBody className="flex flex-col items-center justify-center px-4 py-0">
                            <div className="flex gap-1 border rounded-full mb-4 justify-center items-center py-1 px-2 flex-1 bg-slate-200 border-slate-300">

                                <Icon bg clear
                                    link="/myprofile"
                                    icon="person_edit"
                                    size="lg"
                                    title="ouvrir la page profil" />
                                <hr className="bg-slate-400/40 h-3/4 w-[1px]" />
                                <Icon bg clear
                                    link="/groupe"
                                    icon="groups"
                                    size="lg"
                                    title="ouvrir la page des groupes" />
                                <hr className="bg-slate-400/40 h-3/4 w-[1px]" />
                                <Icon bg clear
                                    link={modo ? '/conciliation' : ''}
                                    icon="diversity_3"
                                    size="lg"
                                    title={modo ? "ouvrir la page conciliation" : "vous devez être conciliateur dans un groupe"} />
                                <hr className="bg-slate-400/40 h-3/4 w-[1px]" />
                                <LogOutButton
                                    style={'!border-0'} size="lg" />
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* NOTIF CARD  */}
                <div className={`hidden lg:${notifClasse} grid-cols-1 h-full  lg:grid`}>
                    <Card className="!flex bg-gradient-to-t from-orange-100 to-orange-50 anim FixCard">
                        <CardBody className="h-full flex flex-col py-2.5 px-4 ">
                            <div className="flex gap-2.5 py-1 items-center">
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
                                <Typography> {count > 0 ?
                                    <>{count} {count > 1 ? 'notifications' : 'notification'} </> :
                                    'Vous n\'avez pas de notifications'}
                                </Typography>
                                <NotifDiv
                                    isLoading={isLoading}
                                    refetch={refetch}
                                    notif={error} />
                            </div>
                            <div className="relative flex flex-col max-h-14 mb-1 w-full overflow-y-auto"
                                onScroll={() => handleScroll()}
                                ref={divRef}>
                                <div className="relative overflow-auto !border-none hover:!border-none flex flex-col gap-1">

                                    {!isLoading && (notifs.map((notif: NotifView, index: number) => notif?.read === false &&
                                        <div key={index + 'div'}
                                            className="flex w-full justify-between h-full gap-4 -ml-1">

                                            <div key={index}
                                                className={`${notif?.type !== ElementNotif.MESSAGE ? 'hover:bg-orange-500' : 'hover:bg-cyan-500'} px-4 font-light text-sm flex  items-center break-words pl-2 justify-between hover:cursor-pointer hover:bg-opacity-20 rounded-full py-0.5  flex-0 relative `}
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
                        </CardBody>
                    </Card>
                </div>
                {/* MAPCARD  */}
                <div className={mapClasse}>
                    <Card className="h-full !flex flex-1 gray100 anim FixCard">
                        <CardBody className="h-full min-h-[20vh] lg!min-h-[100%] flex flex-col !pt-3 p-4">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <Icon
                                        fill
                                        bg
                                        icon="location_on"
                                        link="/service"
                                        size="md"
                                        color="slate"
                                        title="voir mes services" />

                                    <Typography >
                                        {isLoadingMap ?
                                            'Chargement...' :
                                            ` ${countMap ?? 0} nouveautés à proximité`}
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex-1 flex">
                                {(user?.Profile?.Address && notifsMap && !isLoadingMap) ?
                                    <AddressMapOpen
                                        message=" Vous êtes ici "
                                        address={user?.Profile?.Address}
                                        notifs={notifsMap} /> :
                                    <>
                                        <Card className="FixCard h-full w-full !flex  !flex-col flex-1 justify-center items-center bg-gray-50">
                                            <Typography
                                                variant="small" className="px-8 py-4">
                                                {user?.Profile?.Address ? 'pas de nouveautés à proximité , essayer de modifier de rafraichir' : 'Veuillez renseigner votre adresse pour voir les services à proximité'}
                                            </Typography>
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
                                        </Card>

                                    </>}
                            </div>
                        </CardBody>
                    </Card>
                </div>
                {/* CALENDARD CARD  */}
                <div className={eventClasse}>
                    <Card className="h-full !flex bg-gradient-to-t from-cyan-100 to-cyan-50 anim FixCard">
                        <CardBody className="h-full flex flex-col !pt-0 p-4 ">
                            <CalendarComp logo={true} />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </main>
    );
}