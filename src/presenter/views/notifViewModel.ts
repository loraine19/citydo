import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'
import { Notif } from '../../domain/entities/Notif';
import { NotifView } from './viewsEntities/notifViewEntity';


export const notifViewModel = () => {
  return (filter?: string) => {

    const getNotifs = DI.resolve('getNotifUseCase')
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['notifs', filter],
        retry: true,
        staleTime: 1000 * 60 * 15,
        queryFn: async ({ pageParam = 1 }) => await getNotifs.execute(pageParam, filter) || [],
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage?.notifs?.length ? pages.length + 1 : undefined
      })

    const count = isLoading ? 0 : (data?.pages[data?.pages.length - 1].count)
    const countMsg = isLoading ? 0 : data?.pages[data?.pages.length - 1].countMsg
    const countOther = isLoading ? 0 : data?.pages[data?.pages.length - 1].countOther
    const flat = data?.pages.flat().map(page => page.notifs).flat()
    const notifs = isLoading || !flat ? [] : flat?.map((notif: Notif) => notif && new NotifView(notif))
    const notifsMsg = notifs.filter((notif) => notif.type === 'MESSAGE')
    const notifsOther = notifs.filter((notif) => notif.type !== 'MESSAGE')
    return {
      count,
      countMsg,
      countOther,
      notifs,
      notifsMsg,
      notifsOther,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    }
  }
}

export const notifMapViewModel = () => {
  return () => {
    const map = true;
    const getNotifs = DI.resolve('getNotifUseCase')
    const { data, isLoading, error, refetch }
      = useQuery({
        queryKey: ['notifsMap'],
        refetchOnMount: true,
        refetchOnReconnect: true,
        staleTime: 1000 * 60 * 15,
        retry: true,
        queryFn: async () => await getNotifs.execute(0, '', map) || [],
      })

    const count = isLoading ? 0 : (data?.count)
    const notifsMap = (isLoading || !data || error) ? [] : data?.notifs?.map((notif: Notif) => new NotifView(notif))


    return {
      countMap: count,
      notifsMap,
      refetchMap: refetch,
      isLoadingMap: isLoading,
      errorMap: error
    }
  }
}

