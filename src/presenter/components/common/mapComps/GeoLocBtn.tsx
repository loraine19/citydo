import { useEffect, useState } from 'react';
import { Address } from '../../../../domain/entities/Address';
import { Icon, IconName, IconProps } from '../IconComp';
import { InputError } from '../adaptatersComps/input';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';

type GeoLocProps = {
    address?: Address | AddressDTO
    setAddress: (address: Address) => void
    setPosition?: (position: { lat: number; lng: number }) => void,
    auto?: boolean,
    iconProps?: IconProps
}

const GeoLocBtn = ({ setAddress, setPosition, auto, iconProps, address }: GeoLocProps) => {
    const [error, setError] = useState<string | null>(null);
    const [searching, setSearching] = useState(false);
    const [displayAddress, setDisplayAddress] = useState<string | null>('ce géolocaliser');
    const [geolocated, setGeolocated] = useState(false);

    const handleGetLocation = () => {
        setSearching(true);
        if (!navigator.geolocation) {
            setError('La géolocalisation n\'est pas supportée par votre navigateur.');
            return;
        }
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    };

    // Cette fonction est exécutée lorsque la position est obtenue avec succès.
    const handleSuccess = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setError(null);
        setPosition?.({ lat: latitude, lng: longitude });
        setAddress(new Address({ lat: latitude, lng: longitude }));
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then((data: any) => {
                const osmAddress = data.display_name || 'votre position';
                const formatedAddress = {
                    address: [
                        data?.address?.house_number || '',
                        data?.address?.road || ''
                    ].filter(Boolean).join(' '),
                    lat: data?.lat,
                    lng: data?.lon,
                    zipcode: data?.address?.postcode,
                    city: data?.address?.city || data?.address?.town || data?.address?.village,
                }
                setDisplayAddress(formatedAddress.address + `, ${formatedAddress.zipcode || ''} ${formatedAddress.city || ''}` || address?.address || osmAddress);
                setAddress(new Address(formatedAddress));
                setSearching(false);
                setGeolocated(true);
            })
            .catch(() => {
                setDisplayAddress('une erreur est survenue, veuillez reafficher la page');
                setSearching(false);
            });
    };


    const handleError = (error: GeolocationPositionError) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setError("Géolocalisation désactivée, nous utilisons l'adresse saisie");
                setSearching(false);
                setGeolocated(false);
                break;
            case error.POSITION_UNAVAILABLE:
                setError("Les informations de localisation ne sont pas disponibles.");
                setSearching(false);
                setGeolocated(false);
                break;
            case error.TIMEOUT:
                setError("La demande de localisation de l'utilisateur a expiré.");
                setSearching(false);
                setGeolocated(false);
                break;
            default:
                setError("Une erreur inconnue s'est produite.");
                setSearching(false);
                setGeolocated(false);
                break;
        }
    };

    useEffect(() => {
        if (auto) {
            handleGetLocation();
        }
    }, [auto]);

    return (
        <div className='flex w-full h-full items-center gap-1 '>
            <div>
                <Icon
                    {...iconProps}
                    style={`cursor-pointer ${iconProps?.style ?? ''}`}
                    color={iconProps?.color || 'slate'}
                    bg={iconProps?.bg ?? true}
                    fill={iconProps?.fill ?? true}
                    onClick={handleGetLocation}
                    icon={geolocated ? searching ? 'progress_activity' : iconProps?.icon as IconName ?? "my_location" : 'home'}
                    size="md"
                    title="Obtenir votre position"
                />
            </div>

            <InputError

                style='md3-card-subhead opacity-70 !py-1 !px-1 h-full  !flex flex-col justify-center !items-center w-max whitespace-break'
                tips={error ?? displayAddress ?? 'vous localisez'} />
        </div>
    );
};

export default GeoLocBtn;