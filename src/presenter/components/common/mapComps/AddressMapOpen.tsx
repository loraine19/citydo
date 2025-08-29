import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { CircleOptions } from 'leaflet';
import { Dialog, Typography } from '@material-tailwind/react';
import { Icon } from '../IconComp';
import { Address } from '../../../../domain/entities/Address';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import { NotifView } from '../../../views/viewsEntities/notifViewEntity';
import { ElementNotif } from '../../../../domain/entities/Notif';
import Chip from '../adaptatersComps/Chip';



//// ZOOM CONTROLS
function ZoomControls() {
    const map = useMap();
    const handleZoomIn = () => map.zoomIn()
    const handleZoomOut = () => map.zoomOut()

    return (
        <div className='flex flex-col lg:flex-row  gap-[1px] absolute top-[10px] left-[10px] z-[1000]'>
            <Icon
                style='!border-opacity-50 shadow-md'
                bg
                title='Zoomer'
                onClick={handleZoomIn}
                icon="add_circle"
                size="md"
            />
            <Icon
                style='!border-opacity-50 shadow-md'
                bg
                title='Dézoomer'
                onClick={handleZoomOut}
                icon="do_not_disturb_on"
                size="md"
            />
        </div>
    );
}

//// FLY TO MARKER
function FlyToMarker({ position, setFly, zoom }: { position: [number, number], zoom: number, setFly?: React.Dispatch<React.SetStateAction<boolean>> }) {
    const map = useMap();
    useEffect(() => {
        const currentCenter = map.getCenter();
        if (currentCenter?.lat !== position[0] || currentCenter?.lng !== position[1]) {
            map.flyTo(position, zoom, {
                animate: true,
                duration: 1,
            })
        }
    }, [position, map]);
    if (setFly) setFly(false);
    return null;
}


//// MARKER LIST
const MarkerList = ({ notifsMap }: { notifsMap: NotifView[] }) => {
    return (
        notifsMap.map((notif: NotifView, index: number) => notif?.Address && notif?.Address.lat && notif?.Address?.lng &&
            <Marker
                key={notif.id}
                position={[Number(notif?.Address.lat), Number(notif?.Address.lng)]}
                icon={notif.type === ElementNotif.EVENT ?
                    L.icon({
                        iconUrl: '/image/marker_l3.svg',
                        iconSize: [50, 50],
                        iconAnchor: [(notif.Address?.id && index > 0 && notif.Address.id === notifsMap[index - 1]?.Address?.id) ? 35 : 25, 50],
                        popupAnchor: [0, -20],
                        shadowAnchor: [(notif.Address?.id && index > 0 && notif.Address.id === notifsMap[index - 1]?.Address?.id) ? 35 : 25, 50],
                        shadowSize: [50, 50],
                        shadowUrl: '/image/marker_shadow.png',
                        pane: 'markerPane',
                    }) :
                    L.icon({
                        iconUrl: '/image/marker_l2.svg',
                        iconSize: [50, 50],
                        iconAnchor: [(notif.Address?.id && index > 0 && notif.Address.id === notifsMap[index - 1]?.Address?.id) ? 35 : 25, 50],
                        popupAnchor: [0, -20],
                        shadowAnchor: [(notif.Address?.id && index > 0 && notif.Address.id === notifsMap[index - 1]?.Address?.id) ? 35 : 25, 50],
                        shadowUrl: '/image/marker_shadow.png',
                        shadowSize: [50, 50],
                        pane: 'markerPane',
                    })} >
                <Popup>
                    <div>
                        <div className='flex flex-1 justify-between items-center py-1 w-full'>
                            <Typography
                                as='h4'>
                                {notif.title}
                            </Typography>
                            <Chip
                                size='sm'
                                value={notif.typeS}
                                className='CyanChip text-ellipsis rounded-full max-w-max ' />
                        </div>
                        <div className='flex max-h-16 justify-between items-center w-full'>
                            <Typography
                                variant="small"
                                className='font-normal truncate !p-0 !my-0'>
                                {notif.description}
                            </Typography>
                            <Icon
                                icon='arrow_circle_right'
                                link={notif.link}
                                title={`voir les details de ${notif.title}`}
                                size='3xl'
                                fill />
                        </div>
                    </div>
                </Popup>
            </Marker>
        )
    )
}


type AddressMapOpenProps = { address: AddressDTO | Address, message?: string | Element, notifs?: NotifView[], aera?: number, color?: string };

export const AddressMapOpen: React.FC<AddressMapOpenProps> = ({ address, message, notifs, aera, color }) => {

    const [position, setPosition] = useState<[number, number]>([
        Number(address?.lat ?? 0),
        Number(address?.lng ?? 0)
    ]);

    useEffect(() => {
        setPosition([
            Number(address?.lat ?? 0),
            Number(address?.lng ?? 0)
        ]);
    }, [address]);
    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${address?.lat},${address?.lng}`;
    const zoom = (aera && (aera / 100) > 5) ? (21 - (aera / 100)) : 14;

    const IntenaryChip = () => (
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 1000 }}>
            <Icon
                style='!text-orange-500 !shadow-md'
                link={`${googleMapsLink}`}
                bg fill
                title='Ouvrir dans Google Maps'
                size='md'
                color='orange'
                icon='near_me' />
        </div>)

    const FlyButton = () => (
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 1000 }}>
            <Icon
                color='cyan'
                style='!shadow-md'
                bg fill
                title='Zoomer sur la position'
                onClick={() => setFly(true)}
                icon="my_location"
                size="md" />
        </div>)

    const CloseButton = () => (
        <Icon
            style='!border-opacity-50 shadow-md'
            bg fill
            icon='close'
            size='md'
            title='Fermer la carte' />)

    const ExpandButton = () => (
        <Icon
            style='!border-opacity-50 shadow-md'
            bg
            icon='expand_content'
            fill
            size='md'
            title='Ouvrir la carte' />)


    const [fly, setFly] = useState(false);

    const circleOptions: Partial<CircleOptions> = {
        color,
        fillColor: color,
        fillOpacity: 0.4,
        weight: 1,
    };
    const circleRadius = aera ?? 200;

    const MapDiv: React.FC = () => (
        <MapContainer
            center={position}
            zoom={zoom}
            zoomControl={false}
            attributionControl={false}
            scrollWheelZoom={false}
            className='!z-10 flex flex-1 !rounded-xl ' >
            <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
            <ZoomControls />
            {notifs &&
                <MarkerList notifsMap={notifs} />}
            {!aera ? (
                <Marker
                    position={position}
                    icon={L.icon({
                        iconUrl: '/image/marker_orange.svg',
                        iconSize: [60, 60],
                        iconAnchor: [30, 60],
                        popupAnchor: [0, -30],
                        shadowAnchor: [30, 60],
                        shadowSize: [61, 61],
                        shadowUrl: '/image/marker_shadow.png'
                    })}>
                    <Popup>
                        {typeof message === 'string' ? message : <>{message}</> || `${address?.address} ${address?.city}`}
                    </Popup>
                </Marker>
            ) : (
                <Circle
                    center={position}
                    radius={circleRadius}
                    pathOptions={circleOptions}
                />
            )}
            {!message && <FlyToMarker position={position} zoom={zoom} />}
            {fly && <FlyToMarker position={position} setFly={setFly} zoom={zoom} />}
            <IntenaryChip />
            {!fly && <FlyButton />}
        </MapContainer>)

    return (
        <>
            <div className='border border-blue-gray-100 relative flex flex-1 min-h-[8.5rem] lg:min-h-[6rem] !h-[100%] !rounded-[0.8rem] w-full  shadow-md mb-2 lg:mb-0'>
                <MapDiv />

                <Dialog>
                    <Dialog.Trigger className='z-[50] absolute top-2.5 right-2.5'>
                        <ExpandButton />
                    </Dialog.Trigger>
                    <Dialog.Overlay className='backdropBlur !bg-transparent'>
                        <Dialog.Content className='flex flex-1 h-full w-full border-0 shadow-none !bg-transparent'>
                            <div className='Map '>
                                <MapDiv />
                            </div>
                            <Dialog.DismissTrigger className='z-[600] absolute top-5 right-5'>
                                <CloseButton />
                            </Dialog.DismissTrigger>
                        </Dialog.Content>
                    </Dialog.Overlay>
                </Dialog>
            </div>


        </>
    );
}
export default AddressMapOpen;