import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, List, ListItem } from '@material-tailwind/react';
import { Address } from '../../../../domain/entities/Address';
import { Skeleton } from '../Skeleton';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import DI from '../../../../di/ioc';
import { InputError } from '../adaptatersComps/input';

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

    return (
        <div className='relative z-40 '>
            <Input
                className={`items-center flex-1 inputStandart ${error ? 'error' : ''}`}
                placeholder={"Adresse"}
                type="text"
                name='address'
                value={inputValue}
                onChange={(event) => {
                    if (event.target.value.trim() !== '' || event.target.value === '') { handleInputChange(event) }
                }}
                icon={inputValue && (<button onClick={() => { setInputValue('') }}> &#x2715;</button>)}
            />
            <InputError error={error ? Object.values(error).join(', ') : ""} mt />
            {inputValue.length > 1 && inputLoading && (
                <div className='z-50 absolute px-0.5 w-full' ref={(el) => el && el.scrollIntoView({ behavior: 'smooth', block: 'end' })}>
                    <List className='bg-white rounded-xl border border-gray-300 overflow-auto w-full shadow-lg max-h-[7.5rem] '>
                        {suggestions.length > 0 ? (
                            suggestions.map((suggestion, index) => (
                                suggestion.label !== suggestions[index - 1]?.label &&
                                <ListItem
                                    className="cursor-pointer hover:bg-gray-200 min-h-max text-sm py-1.5 rounded-2xl"
                                    title='choisir cette adresse'
                                    key={index}
                                    onClick={() => {
                                        handleSuggestionSelect(suggestion);
                                        setInputLoading(false);
                                        setAddress({ ...suggestion.value } as Address)
                                    }}>
                                    {suggestion.label}
                                </ListItem>
                            ))
                        ) : (
                            <Skeleton className='w-full h-6 my-1 rounded-full' />
                        )}
                    </List>
                </div>
            )}
        </div >
    );
};



