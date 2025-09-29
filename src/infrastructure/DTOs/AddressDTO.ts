
export class AddressDTO {
    address: string = '';
    zipcode: string = '';
    city: string = '';
    lat: number | string = 0;
    lng: number | string = 0;
    constructor(init?: Partial<AddressDTO>) {
        if (init) {
            Object.keys(init).forEach(key => {
                if (Object.prototype.hasOwnProperty.call(this, key)) {
                    (this as any)[key] = init[key as keyof AddressDTO];
                }
            });
        }
    }
}