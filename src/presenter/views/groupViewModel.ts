import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'
import { GroupView } from './viewsEntities/GroupViewEntity';


export const groupViewModel = () => {
  return (filter?: string, category?: string) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 600000, // 10 minutes,
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getGroups = DI.resolve('getNearestGroupsUseCase')
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['groups', filter, category],
        staleTime: 600000,
        queryFn: async ({ pageParam = 1 }) => await getGroups.execute(pageParam, filter, category) || { groups: [], count: 0 },
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.group?.length ? pages.length + 1 : undefined
      })

    const count = isLoading ? 0 : (data?.pages[data?.pages.length - 1].count)
    const userId = user?.id || 0
    const flat = data?.pages.flat().map(page => page.groups).flat()
    const groups = (userLoading || isLoading || !data) ? [] : flat?.map(group => group && new GroupView(group, userId))

    console.log(data, groups, error)

    return {
      count,
      groups,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    }
  }
}


export const groupIdViewModel = () => {
  return (id: number) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 600000, // 10 minutes,
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),

    })
    const userId = user?.id
    const getGroupById = DI.resolve('getGroupByIdUseCase')

    let { data, isLoading, error, refetch } = useQuery({
      queryKey: ['groupById', id],
      staleTime: 600000,
      refetchOnWindowFocus: false,
      queryFn: async () => await getGroupById.execute(id),
    })


    const group = (!userLoading && !isLoading && !error) ? new GroupView(data, userId) : {} as GroupView
    return { group, isLoading, error, refetch }
  }
}