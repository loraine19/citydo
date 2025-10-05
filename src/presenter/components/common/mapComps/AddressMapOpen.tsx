import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { CircleOptions } from 'leaflet';
import { Icon } from '../IconComp';
import { Address } from '../../../../domain/entities/Address';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import { NotifView } from '../../../views/viewsEntities/notifViewEntity';
import { ElementNotif } from '../../../../domain/entities/Notif';
import Chip from '../adaptatersComps/Chip';
import { MenuItem } from '../../shared/base/baseComps/Menu';
import BackDropBlur from '../../shared/base/baseComps/BackDropBlur';



//// ZOOM CONTROLS
function ZoomControls() {
    const map = useMap();
    const handleZoomIn = () => map.zoomIn()
    const handleZoomOut = () => map.zoomOut()

    return (
        <div className='flex absolute top-[9px] left-[9px] !z-[999] pointer-events-auto'>
            <div className='md3-slate-container border-[var(--md3-outline)] rounded-full md3-elevation-2 p-[5px] flex flex-col gap-[1px]'>
                <Icon
                    title='Zoomer'
                    onClick={handleZoomIn}
                    icon="add_circle"
                    size="lg"
                />
                <Icon
                    title='Dézoomer'
                    onClick={handleZoomOut}
                    icon="do_not_disturb_on"
                    size="lg"
                />
            </div>
        </div>
    );
}

//// FLY TO MARKER
function FlyToMarker({ position, setFly, zoom }: { position: [number, number], zoom: number, setFly?: React.Dispatch<React.SetStateAction<boolean>> }) {
    const map = useMap();
    useEffect(() => {
        const currentCenter = map.getCenter();
        if (currentCenter?.lat !== position[0] || currentCenter?.lng !== position[1]) {
            const map = useMap();
            const point = map.project(position, map.getZoom());
            const newLatLng = map.unproject(point, map.getZoom());
            map.flyTo([newLatLng.lat, newLatLng.lng], zoom, {
                animate: true,
                duration: 1,
            });
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
                icon={
                    L.icon({
                        iconUrl: notif.type === ElementNotif.SERVICE ? '/image/marker_service.svg' : '/image/marker_event.svg',
                        iconSize: [50, 50],
                        iconAnchor: [(notif.Address?.id && index > 0 && notif.Address.id === notifsMap[index - 1]?.Address?.id) ? 35 : 25, 50],
                        popupAnchor: [0, -20],
                        className: 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.1]',
                        pane: 'markerPane',
                    })} >
                <Popup>
                    <div>
                        <div className='flex flex-1 justify-between items-center py-1 w-full'>
                            <h6>
                                {notif.title}
                            </h6>
                            <Chip
                                variant='outlined'
                                color='cyan'
                                value={notif.typeS} />
                        </div>
                        <div className='flex justify-between items-center w-full'>
                            <i
                                className='font-normal truncate !p-0 !my-0'>
                                {notif.description}
                            </i>
                            <Icon
                                bg clear
                                icon='arrow_forward_ios'
                                link={notif.link}
                                title={`voir les details de ${notif.title}`}
                                size='lg'
                                fill />
                        </div>
                    </div>
                </Popup>
            </Marker>
        )
    )
}


type AddressMapOpenProps = {
    address: AddressDTO | Address,
    lat?: number,
    lng?: number,
    message?: string | Element,
    notifs?: NotifView[],
    aera?: number,
    color?: string
};

export const AddressMapOpen: React.FC<AddressMapOpenProps> = ({ address, lat = 0, lng = 0, message, notifs, aera, color }) => {

    const [position, setPosition] = useState<[number, number]>(lat && lng ? [lat, lng] : [
        Number(address?.lat ?? 0),
        Number(address?.lng ?? 0)
    ]);

    useEffect(() => {
        if (!lat && !lng) setPosition([
            Number(address?.lat ?? 0),
            Number(address?.lng ?? 0)
        ]);
    }, [address]);
    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${address?.lat},${address?.lng}`;
    // Calculate zoom based on area: smaller area = higher zoom, larger area = lower zoom
    const getZoomFromArea = (area?: number) => {
        if (!area) return 14;
        const minZoom = 12;
        const maxZoom = 18;
        const zoom = Math.round(17 - Math.log2(area / 54));
        return Math.max(minZoom, Math.min(maxZoom, zoom));
    };
    const zoom = getZoomFromArea(aera);

    const IntenaryChip = () => (

        <Icon
            style='!text-orange-500 md3-elevation-2 absolute bottom-2 right-2 pointer-events-auto !z-[999] '
            link={`${googleMapsLink}`}
            bg fill
            title='Ouvrir dans Google Maps'
            size='md'
            color='orange'
            icon='near_me' />)

    const FlyButton = () => (

        <Icon
            color='cyan'
            style='md3-elevation-2 absolute bottom-2 left-2 pointer-events-auto !z-[999] '
            bg fill
            title='Zoomer sur la position'
            onClick={() => setFly(true)}
            icon="my_location"
            size="md" />)


    const [open, setOpen] = useState(false);
    const CloseButton = () => (
        <Icon
            onClick={() => setOpen(false)}
            style='md3-elevation-2 absolute top-2 right-2 pointer-events-auto !z-[999] '
            bg fill
            color='slate'
            icon='close'
            size='md'
            title='Fermer la carte' />)


    const ExpandButton = () => (
        <Icon
            onClick={() => setOpen(true)}
            style='pointer-events-auto !border-opacity-50 md3-elevation-2 absolute top-2 right-2 !z-[999] '
            bg
            icon='expand_content'
            fill
            size='md'
            title='Ouvrir la carte' />)


    const [fly, setFly] = useState(false);

    //// AREA CIRCLE
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
            className='flex flex-1 items-center justify-center rounded-[var(--md3-radius-large)]' >
            <ZoomControls />

            {!message && <FlyToMarker position={position} zoom={zoom} />}
            {fly && <FlyToMarker position={position} setFly={setFly} zoom={zoom} />}
            <IntenaryChip />
            {!fly && <FlyButton />}
            <TileLayer
                url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />

            {!aera ? (
                <Marker
                    position={position}
                    icon={L.icon({
                        className: 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.1]  !pt-5',
                        iconUrl: '/image/marker_orange.svg',
                        iconSize: [80, 80],
                        iconAnchor: [40, 75],
                    })}>
                    <Popup>
                        <MenuItem>
                            {typeof message === 'string' ? message : <>{message}</> || `${address?.address} ${address?.city}`}
                        </MenuItem>
                    </Popup>
                </Marker>
            ) : (
                <Circle
                    center={position}
                    radius={circleRadius}
                    pathOptions={circleOptions}
                />
            )}
            {notifs &&
                <MarkerList notifsMap={notifs} />}
        </MapContainer>)

    return (
        <>
            <div className='border md3-border relative flex flex-1 min-h-[7.8rem] lg:min-h-[7.7rem] !rounded-[var(--md3-radius-large)] w-full '>
                <MapDiv />

                <ExpandButton />
                <BackDropBlur
                    className='z-[2]'
                    blurKey={address?.address + '_map'}
                    open={open}
                    setOpen={() => { }} >
                    <div className="!py-0 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden min-w-[90vw] bg-clip">
                        <div className='relative flex flex-1 md3-elevation-4  !w-[90vw] !h-[80dvh]'>

                            <MapDiv />
                            <CloseButton />
                        </div>
                    </div>
                </BackDropBlur>



            </div>


        </>
    );
}
export default AddressMapOpen;