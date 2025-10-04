import { useInfiniteQuery } from '@tanstack/react-query';
import DI from '../../di/ioc';
import { User } from '../../domain/entities/User';


export const userViewModel = () => {
  return (groupeId: number) => {
    const getUsers = DI.resolve('getUsersUseCase')
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['users', groupeId],
        staleTime: 1000 * 60 * 15,
        retry: true,
        queryFn: async ({ pageParam = 1 }) => await getUsers.execute(groupeId, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage?.length ? pages.length + 1 : undefined
      })

    const flat = !data || error || isLoading ? [] : data?.pages.flat().map(page => page).flat()
    const users = (isLoading || !data) ? [] : flat?.map((user: User) => user)


    return {
      users,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    }
  }
}