import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import DI from '../../di/ioc';
import { User } from '../../domain/entities/User';
import { Profile } from '../../domain/entities/Profile';
import { cryptedCookie } from '../../infrastructure/services/cookiService';
import { ProfileView } from '../../presenter/views/viewsEntities/profileViewEntity';

// ERROR TRACE 
//user.store.ts: 51 Cannot update a component(`AlertNotif`) while rendering a different component(`PrivateRoute`).To locate the bad setState() call inside`PrivateRoute`, follow the stack trace as described in https://react.dev/link/setstate-in-render
// setIsLoggedIn	@	user.store.ts:51
// PrivateRoute	@	PrivateRouter.tsx:10
// <PrivateRoute>		
// App	@	App.tsx:91
// <App>		
// (anonymous)	@	main.tsx:14

interface UserStore {
    user: User;
    profile: Profile;
    setUser: (user: User) => void;
    removeUser: () => void;
    setUserProfile: (profile: Profile) => void;
    fetchUser: () => Promise<void>;
    setIsLoggedIn: (value: boolean) => void;
    isLoggedIn: boolean;
    connected: boolean;
    setConnected: (value: boolean) => void;
    userGroups: { id: string; name: string }[];
    setUserGroups: (value: { id: string; name: string }[]) => void;
}

export const useUserStore = create<UserStore, [['zustand/persist', UserStore]]>(
    persist((set) => {
        const fetchUser = async () => {
            let userUpdated: User = {} as User;
            let loggedIn = true
            if (!window.location.pathname.includes('/sign')) {
                try {
                    userUpdated = await DI.resolve('getUserMeUseCase').execute() as User;
                    loggedIn = userUpdated ? true : false;
                }
                catch (error) {
                    console.error('Error fetching user:', error);
                    throw new Error(error as string ?? 'Failed to fetch user');
                }
                //  if (!userUpdated?.Profile) { window.location.replace('/profile/create') };
                set({ user: userUpdated });
                set({ profile: new ProfileView(userUpdated?.Profile) });
                set({ isLoggedIn: loggedIn });
                set({ userGroups: userUpdated?.GroupUser?.map((g: any) => ({ id: g?.groupId?.toString(), name: g?.Group?.name })) || [] });
            }
        }

        return {
            user: {} as User,
            profile: {} as Profile,
            setUser: (user: User) => set({ user: new User(user) }),
            setUserProfile: (profile: Profile) => set((state) => ({ user: { ...state.user, Profile: new ProfileView(profile) } })),
            removeUser: () => set(() => ({ user: {} as User })),
            fetchUser,
            isLoggedIn: false,
            setIsLoggedIn: (value: boolean) => set(() => ({ isLoggedIn: value })),
            connected: false,
            setConnected: (value: boolean) => set(() => ({ connected: value })),
            userGroups: [],
            setUserGroups: (value: { id: string; name: string }[]) => set(() => ({ userGroups: value })),
        }
    },
        {
            name: 'user',
            storage: createJSONStorage(() => new cryptedCookie()),
        }
    )
);
