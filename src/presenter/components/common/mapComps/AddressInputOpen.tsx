import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Address } from '../../../../domain/entities/Address';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import DI from '../../../../di/ioc';
import { Icon } from '../IconComp';
import { Input } from '../../shared/base/baseComps/Inputs';
import { Menu, MenuItem } from '../../shared/base/baseComps/Menu';

interface AddressSuggestion { label: string; value: Address }

export const AddressInputOpen = (props: {
    address: AddressDTO | Address,
    setAddress: any,
    error?: any,
}) => {
    const { address, setAddress, error } = props;
    const [inputLoading, setInputLoading] = useState(false)
    const [inputValue, setInputValue] = useState(`${address?.address || ''} ${address?.zipcode || ''} ${address?.city || ''}`.trim());
    const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);

    const groupList = async (): Promise<Address[]> => await DI.resolve('getAddressUseCase').execute()


    // USE EFFECT
    useEffect(() => {
        setInputValue(`${address?.address || ''} ${address?.zipcode || ''} ${address?.city || ''}`.trim());
    }, [address]);

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const q = event.target.value;
        setInputValue(q);
        setInputLoading(true)
        setOpen(true)
        if (q.length > 2) {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                    params: {
                        q: q,
                        format: 'json',
                        limit: 10,
                        countrycodes: 'fr',
                        'accept-language': 'fr',
                        addressdetails: 2,
                    }
                })
                console.log("response", response)
                //  const reponse = (url: string, params: any) => DI.resolve('getAddressOpenUseCase').execute(url, params);
                if (response.data.length > 0) {
                    response.data.sort((a: any, b: any) => b.importance - a.importance)
                    const suggestions: AddressSuggestion[] = response.data.map((result: any) => {
                        const numberQ = q.substring(0, 4).replace(/\D/g, '') || result.address?.house_number;
                        const number = result.address?.house_number || numberQ;
                        const addressParts = [
                            number,
                            result.address?.road,
                            result.address?.postcode,
                            result.address?.city || result.address?.town || result.address?.village
                        ].filter(Boolean).join(' ');

                        return {
                            label: addressParts,
                            value: {
                                address: [
                                    result.address?.house_number || q.substring(0, 4),
                                    result.address?.road
                                ].filter(Boolean).join(' '),
                                lat: result.lat,
                                lng: result.lon,
                                zipcode: result.address?.postcode,
                                city: result.address?.city || result.address?.town || result.address?.village,
                            },
                        };
                    });
                    setSuggestions([...new Set(suggestions)])
                }
                else {
                    const secondResponse = await groupList();
                    const suggestions: AddressSuggestion[] = secondResponse.map((result: Address) => {
                        return {
                            label: `${result.address} ${result.zipcode} ${result.city}`.trim(),
                            value: result as Address
                        }
                    })
                    setSuggestions([...new Set(suggestions)])
                }

            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setInputLoading(true)
                const secondResponse = await groupList();
                const suggestions: AddressSuggestion[] = secondResponse.map((result: Address) => {
                    return {
                        label: `${result.address} ${result.zipcode} ${result.city}`.trim(),
                        value: result as Address
                    }
                })
                setSuggestions([...new Set(suggestions)])
            }
        }
    };

    const handleSuggestionSelect = (suggestion: AddressSuggestion) => {
        setInputValue(suggestion.label)
        setSuggestions([]);

    };
    const [open, setOpen] = useState(true);
    const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
    useEffect(() => {
        setTriggerElement(document.querySelector('[data-mapbox-id]') as HTMLElement);

        if (triggerElement && (suggestions.length === 0) && open) {
            setOpen(true);
            (triggerElement as HTMLElement).click();
        }

    }, [suggestions, inputLoading]);

    return (
        <div className='flex relative flex-col flex-1 w-full'>
            <Input
                className='!min-w-full'
                label={"Adresse"}
                type="text"
                name='address'
                value={inputValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.value.trim() !== '' || event.target.value === '') { handleInputChange(event) }
                }}
                leadingIcon={inputLoading ?
                    <Icon icon='progress_activity' size='lg' /> :
                    <Icon icon='add_location' fill={true} onClick={() => setOpen(true)} size='lg' />}
                trailingIcon={<Icon
                    icon='close'
                    style={'!absolute top-[50%] translate-y-[-50%] right-2'}
                    onClick={() => { setInputValue(''); setOpen(false) }}
                    size='sm'
                    color='gray' />}
                helperText={error ? Object.values(error).join(', ') : ""}
                error={!!error}
            >
            </Input>

            <Menu
                closeIcon={<></>}
                open={open}
                setOpen={setOpen}
                title='Choisir dans la liste'
                trigger={<div className=' max-w-max -mt-8 ' data-mapbox-id >&nbsp;</div>}
                key='address-suggestion'
                placement='bottom-right'
                className='!absolute !top-12 !left-0 max-h-[11rem] overflow-y-scroll '>
                {suggestions.length > 0 ?
                    suggestions.map((suggestion, index) => (
                        suggestion.label !== suggestions[index - 1]?.label &&
                        <MenuItem
                            className="cursor-pointer hover:bg-gray-200 min-h-max text-sm py-1.5 rounded-3xl"
                            title='choisir cette adresse'
                            key={index}
                            onClick={() => {
                                handleSuggestionSelect(suggestion);
                                setInputLoading(false);
                                setAddress({ ...suggestion.value } as Address)
                            }}>
                            {suggestion.label}
                        </MenuItem>

                    )) :
                    <MenuItem>
                        <span> Chargement...</span>
                    </MenuItem>

                }

            </Menu>
        </div >
    );
};



