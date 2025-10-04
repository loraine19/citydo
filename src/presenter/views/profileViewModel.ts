import { useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'
import { ProfileView } from './viewsEntities/profileViewEntity';
import { User } from '../../domain/entities/User';


export const meViewModel = () => {
    return () => {
        const get = DI.resolve('getUserMeUseCase');
        const { data, error: error, isLoading } = useQuery({
            queryKey: ['me'],
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 15,
            retry: true,
            queryFn: async () => await get.execute()
        })

        const Profile = !data?.Profile || error || isLoading ? {} as ProfileView : new ProfileView(data.Profile)
        const user = data ?? {} as User
        return { user, Profile, error, isLoading };
    };
}
