import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { CircleOptions } from 'leaflet';
import { Popover, PopoverTrigger, PopoverContent, Typography } from '@material-tailwind/react';
import { Icon } from '../IconComp';
import { Address } from '../../../../domain/entities/Address';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import { NotifView } from '../../../views/viewsEntities/notifViewEntity';
import { ElementNotif } from '../../../../domain/entities/Notif';
import Chip from '../adaptatersComps/Chip';


function ZoomControls() {
    const map = useMap();
    const handleZoomIn = () => map.zoomIn()
    const handleZoomOut = () => map.zoomOut()

    return (
        <div className='flex flex-col lg:flex-row  gap-[1px] absolute top-[10px] left-[10px] z-[1000]'>
            <Icon
                style='!border-opacity-50 !shadow-md'
                bg
                color='slate'
                title='Zoomer'
                onClick={handleZoomIn}
                icon="add_circle"
                size="md"
            />
            <Icon
                style='!border-opacity-50 !shadow-md'
                bg
                color='slate'
                title='Dézoomer'
                onClick={handleZoomOut}
                icon="do_not_disturb_on"
                size="md"
            />
        </div>
    );
}
function FlyToMarker({ position, setFly, zoom }: { position: [number, number], zoom: number, setFly?: React.Dispatch<React.SetStateAction<boolean>> }) {
    const map = useMap();
    useEffect(() => {
        const currentCenter = map.getCenter();
        if (currentCenter.lat !== position[0] || currentCenter.lng !== position[1]) {
            map.flyTo(position, zoom, {
                animate: true,
                duration: 1,
            })
        }
    }, [position, map]);
    if (setFly) setFly(false);
    return null;
}


const MarkerList = ({ notifsMap }: { notifsMap: NotifView[] }) => {
    return (
        notifsMap.map((notif: NotifView, index: number) => notif?.Address && notif?.Address.lat && notif?.Address?.lng &&
            <Marker
                key={notif.id}
                position={[notif?.Address.lat, notif?.Address.lng]}
                icon={notif.type === ElementNotif.EVENT ?
                    L.icon({
                        iconUrl: '/image/marker_l2.svg',
                        iconSize: [50, 50],
                        iconAnchor: [(notif.Address?.id && index > 0 && notif.Address.id === notifsMap[index - 1]?.Address?.id) ? 35 : 25, 50],
                        popupAnchor: [0, -20],
                        shadowAnchor: [(notif.Address?.id && index > 0 && notif.Address.id === notifsMap[index - 1]?.Address?.id) ? 35 : 25, 50],
                        shadowSize: [50, 50],
                        shadowUrl: '/image/marker_shadow.png',
                        pane: 'markerPane',
                    }) :
                    L.icon({
                        iconUrl: '/image/marker_l3.svg',
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
                        <div className='flex flex-1 justify-between items-center  w-full'>
                            <Typography
                                variant='h6'
                                className=''>
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
                                style='!text-gray-900'
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

    const [position, setPosition] = useState<[number, number]>([address?.lat, address?.lng]);
    useEffect(() => { setPosition([address.lat, address.lng]) }, [address]);
    const [open, setOpen] = useState(false);
    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${address.lat},${address.lng}`;
    const zoom = (aera && (aera / 100) > 5) ? (21 - (aera / 100)) : 14;

    const IntenaryChip = () => (
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 1000 }}>
            <Icon
                style='!border-opacity-50 !shadow-md'
                link={`${googleMapsLink}`}
                bg fill
                title='Ouvrir dans Google Maps'
                size='md'
                color='cyan'
                icon='near_me' />
        </div>)

    const FlyButton = () => (
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 1000 }}>
            <Icon
                style='!border-opacity-50 !shadow-md'
                bg fill
                title='Zoomer sur la position'
                onClick={() => setFly(true)}
                icon="my_location"
                size="md" />
        </div>)

    const CloseButton = () => (
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 900 }}>
            <Icon
                style='!border-opacity-50 shadow-md'
                bg fill
                icon='close'
                size='md'
                onClick={() => setOpen(false)}
                title='Fermer la carte' />
        </div>)

    const ExpandButton = () => (
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 600 }}>
            <Icon
                style='!border-opacity-50 shadow-md'
                bg
                icon='expand_content'
                fill
                size='md'
                onClick={() => setOpen(true)}
                title='Ouvrir la carte' />
        </div>)

    const [fly, setFly] = useState(false);

    const circleOptions: Partial<CircleOptions> = {
        color,
        fillColor: color,
        fillOpacity: 0.4,
        weight: 1,
    };
    const circleRadius = aera ?? 200;

    return (
        <Popover open={open} >
            <PopoverTrigger className='!w-full !h-full '>
                <div className='!relative border border-slate-300 !flex flex-1 !h-[100%] !rounded-[0.8rem] shadow-md mb-2 lg:mb-0'>
                    <ExpandButton />
                    <MapContainer
                        center={position}
                        zoom={zoom}
                        zoomControl={false}
                        attributionControl={false}
                        scrollWheelZoom={false}
                        className='!z-10 flex flex-1 !rounded-xl ' >
                        <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
                        <ZoomControls />
                        {notifs && <MarkerList notifsMap={notifs} />}
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
                        {/* Only show FlyButton if not already zoomed in */}
                        {!fly && <FlyButton />}
                    </MapContainer>
                </div>
            </PopoverTrigger >
            <PopoverContent>
                <div className='Map flex flex-col FixedCenter'>
                    <MapContainer
                        center={position}
                        zoom={zoom}
                        scrollWheelZoom={false}
                        className='shadow-xl rounded-xl border-2 border-gray-300 flex w-full h-full' >
                        <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />

                        {notifs && <MarkerList notifsMap={notifs} />}
                        {!aera ? <Marker
                            position={position}
                            icon={L.icon({
                                iconUrl: '/image/marker_orange.svg',
                                iconSize: [60, 60],
                                iconAnchor: [30, 60],
                                popupAnchor: [0, -5],
                                shadowAnchor: [30, 60],
                                shadowSize: [61, 61],
                                shadowUrl: '/image/marker_shadow.png'
                            })}>
                            <Popup>
                                {typeof message === 'string' ?
                                    message :
                                    <>{message}</>
                                    || `${address?.address} ${address?.city}`}
                                <br />
                                <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
                                    y aller
                                </a>
                            </Popup>
                        </Marker> :
                            <Circle
                                center={position}
                                radius={circleRadius}
                                pathOptions={circleOptions}
                            />}

                        {!message && <FlyToMarker position={position} zoom={zoom} />}
                        {fly && <FlyToMarker position={position} setFly={setFly} zoom={zoom} />}
                        <IntenaryChip />
                        <FlyButton />
                        <CloseButton />
                    </MapContainer>
                </div>
            </PopoverContent>
        </Popover >
    );
}
export default AddressMapOpen;