import { Profile } from '../../../domain/entities/Profile';

export class ProfileView extends Profile {
    addressString: string = '';
    fullName?: string = '';
    constructor(profile: Profile) {
        super(profile);
        // if (!profile) {
        //     setTimeout(() => {
        //         if (!profile) throw new Error('Impossible de récupérer le profil')
        //     }, 1000);
        // }
        this.addressString = `${this.Address.address} ${this.Address.zipcode} ${this.Address.city}`
        this.fullName = `${this.firstName} ${this.lastName}`;
        //this.image = this.image.toString().split('=')[0];
    }
}