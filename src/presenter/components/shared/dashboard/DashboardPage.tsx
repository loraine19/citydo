import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import AddressMapOpen from "../../common/mapComps/AddressMapOpen";
import { Icon } from "../../common/IconComp";
import CalendarComp from "../../common/CalendarComp";
import { useCallback, useEffect, useRef, useState } from "react";
import { Skeleton } from "../../common/Skeleton";
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
import { HandleHideParams } from "../../../../application/useCases/utils.useCase";
import { OnlineDot } from "../../common/onlineDot";

export default function DashboardPage() {

    //// USER & AUTORISATION
    const { user, fetchUser, setIsLoggedIn, } = useUserStore((state) => state);
    const { setHideNavBottom, navBottom, hideNavBottom } = useUxStore((state) => state);
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
    const { notifs, notifsMsg, notifsOther, refetch, count, fetchNextPage, hasNextPage, isLoading } = notifViewModelFactory();
    const notifMapViewModelFactory = DI.resolve('notifMapViewModel');
    const { notifsMap, isLoadingMap, refetchMap, countMap } = notifMapViewModelFactory();

    //// CLASSES
    const userClasse = "flex row-span-3 lg:grid pt-11 lg:pt-8 animRev z-50";
    const eventClasse = "h-full flex !min-h-[15rem] row-span-5 lg:grid overflow-auto";
    const notifClasse = " row-span-2 lg:pt-8" + (notifs.length > 0 ? " min-h-[8rem]" : " min-h-[5.5rem]")
    const mapClasse = "flex row-span-6 !min-h-[15rem] lg:min-h-[32%] lg:grid ";


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
    }, [msg]);

    //// HANDLE HIDE  
    const utils = DI.resolve('utils')
    const handleHide = (params: HandleHideParams) => utils.handleHide(params)
    const handleHideCallback = useCallback(() => {
        const params: HandleHideParams = { divRef, setHide, max: 6 }
        handleHide(params)
    }, [divRef]);
    const [hide, setHide] = useState<boolean>(false);
    useEffect(() => { (hide !== hideNavBottom) && setHideNavBottom(hide) }, [hide]);

    return (
        <main className={`${(hideNavBottom) ? 'pb-2' : !navBottom ?
            'lg:!-mt-3 !-mt-7 pb-[1rem] ' :
            'lg:!-mt-5 -mt-10 pb-[2.8rem] lg:pb-[5rem]'} 
               relative flex !overflow-hidden anim `}
            data-cy="dashboard-body" >
            <div ref={divRef}
                onScroll={() => handleHideCallback()}
                className={" px-[1%] flex-1 h-full flex flex-col lg:grid grid-cols-2 grid-rows-[auto_auto_auto_1fr_1fr_2fr_auto_auto] w-full gap-y-2 lg:gap-y-3 lg:gap-x-4 place-content-start overflow-auto rounded-b-[1.5rem] "}>
                <div className={`${userClasse}`}>
                    <Card className="FixCard lg:h-full p-0 mt-6 lg:!mt-0 !flex-col rounded-xl bg-white flex-1 !flex anim !overflow-visible ">
                        <CardHeader className="-mt-6 flex flex-col items-center justify-center  bg-transparent shadow-none">
                            <div className="relative space-x-1 ">
                                <AvatarUser
                                    avatarSize="lg"
                                    avatarStyle="!shadow-md -mb-0.5 border border-gray-300  w-16 h-16 lg:w-[4.5rem] lg:h-[4.5rem] "
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
                            <div className="flex gap-2  pb-4 justify-center items-center ">
                                <Icon
                                    link="/myprofile"
                                    icon="person_edit"
                                    color="cyan"
                                    fill bg
                                    size="md"
                                    title="ouvrir la page profil" />
                                <Icon
                                    link="/groupe"
                                    icon="groups"
                                    color='green'
                                    fill bg
                                    size="md"
                                    title="ouvrir la page des groupes" />
                                <Icon
                                    link={modo ? '/conciliation' : ''}
                                    icon="diversity_3"
                                    color={modo ? 'orange' : 'slate'}
                                    fill bg
                                    size="md"
                                    title={modo ? "ouvrir la page conciliation" : "vous devez être concialiateur dans un groupe"} />
                                <Icon
                                    icon={(user?.Profile?.points.toString() ?? '0')}
                                    color="amber"
                                    size="md"
                                    fill bg
                                    style="!text-[1.1rem] pt-[4px] !font-extrabold"
                                    title={` vous avez ${user?.Profile?.points} pts`} />
                                <LogOutButton size="md" />
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className={`hidden lg:${notifClasse} grid-cols-1 h-full  lg:grid`}>
                    <Card className="!flex orangeBG anim FixCard">
                        <CardBody className="h-full flex flex-col pt-2.5 pb-0 px-4 ">
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
                            </div>
                            <div className="relative flex flex-col max-h-14 mb-1 w-full overflow-y-auto"
                                onScroll={() => handleScroll()}
                                ref={divRef}>
                                {!isLoading && (notifs.map((notif: NotifView, index: number) => notif?.read === false &&
                                    <div key={index + 'div'}
                                        className="flex w-full justify-between h-full gap-4 p-0.5">

                                        <div key={index}
                                            className={`${notif?.type !== ElementNotif.MESSAGE ? 'hover:bg-orange-500' : 'hover:bg-cyan-500'} px-4 font-light text-sm flex  items-center break-words pl-2 justify-between hover:cursor-pointer hover:bg-opacity-20 rounded-full py-0.5  flex-0 relative `}
                                            onClick={async () => {
                                                await readNotif(notif?.id);
                                                await refetch();
                                                notif?.link && navigate(notif?.link)
                                            }}>
                                            <p className="!line-clamp-1 ">
                                                <span
                                                    className={`mr-1 capitalize font-normal ${notif?.typeS === 'message' ? 'text-cyan-600' : 'text-orange-600'}`}>
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
                                {user?.Profile?.Address && notifsMap ?
                                    <AddressMapOpen
                                        message=" 📍 Vous êtes ici "
                                        address={user?.Profile?.Address}
                                        notifs={notifsMap} /> : <>

                                        {isLoadingMap ?
                                            <Skeleton /> :
                                            <Card className="FixCard h-full w-full !flex  !flex-col flex-1 justify-center items-center bg-gray-50">
                                                <Typography
                                                    variant="small" className="px-8 py-4">
                                                    {user?.Profile?.Address ? 'pas de nouveautés à proximité , essayer de modifier de rafraichir' : 'Veuillez renseigner votre adresse pour voir les services à proximité'}
                                                </Typography>
                                                {user?.Profile?.Address ?
                                                    <NotifDiv
                                                        notif={'impossible de charger la carte, veuillez réessayer'}
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
                                        }</>}
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className={eventClasse}>
                    <Card className="h-full !flex cyanBG anim FixCard">
                        <CardBody className="h-full flex flex-col !pt-0 p-4 ">
                            <CalendarComp logo={true} />
                        </CardBody>
                    </Card>
                </div>
                <div className={`
                    ${(!hideNavBottom && navBottom) ? 'lg:hidden -mb-4 min-h-5' : !navBottom ? 'hidden' : ' -mb-5 min-h-1'} `}>
                </div>
            </div>
        </main>
    );
}