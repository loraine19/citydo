
export class AddressDTO {
    address: string = '';
    zipcode: string = '';
    city: string = '';
    lat: number | string = 0;
    lng: number | string = 0;
    constructor(init?: Partial<AddressDTO>) {
        Object.assign(this, init);
    }
}