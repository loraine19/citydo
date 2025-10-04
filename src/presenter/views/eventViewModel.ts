import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc';
import { dayMS, shortDateString } from './viewsEntities/utilsService';
import { EventView } from './viewsEntities/eventViewEntities';
import { EventFindParams } from '../../domain/entities/Event';


export const eventViewModel = () => {
  return (params: EventFindParams) => {
    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 15,
      retry: true,
      networkMode: 'offlineFirst',
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getEvents = DI.resolve('getEventsUseCase')
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['events', params],
        staleTime: 1000 * 60 * 15,
        retry: true,
        queryFn: async ({ pageParam = 1 }) => await getEvents.execute(pageParam, params) || { events: [], count: 0 },
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.events?.length ? pages.length + 1 : undefined,
        networkMode: 'offlineFirst'
      })

    const count = isLoading ? 0 : (data?.pages[data?.pages.length - 1].count)
    const userId = user?.id || 0
    const flat = !data || error || isLoading ? [] : data?.pages.flat().map(page => page.events).flat()
    const events = (userLoading || !flat) ? [] : flat?.map(event => event && new EventView(event, userId))


    return {
      count,
      events,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    }
  }
}

export const eventIdViewModel = () => {
  return (id: number) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 15,
      retry: true,
      networkMode: 'offlineFirst',
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),

    })
    const userId = user?.id
    const getEventById = DI.resolve('getEventByIdUseCase')

    let { data, isLoading, error, refetch } = useQuery({
      queryKey: ['eventById', id],
      staleTime: 1000 * 60 * 15,
      retry: true,
      refetchOnWindowFocus: false,
      networkMode: 'offlineFirst',
      queryFn: async () => await getEventById.execute(id),
    })

    const event = (!userLoading && !isLoading && !error) ? new EventView(data, userId) : {} as EventView

    const update = async (): Promise<EventView | null> => {
      const { data: freshData, isSuccess } = await refetch();
      if (isSuccess && freshData) {
        const updatedEvent = new EventView(freshData, userId);
        return updatedEvent;
      }
      return null;
    }

    return { event, isLoading, error, refetch, update }
  }
}


export const eventsWeekViewModel = () => {
  return (startDate: any, numberOfWeeks: number): {
    weeks: { date: Date, events: EventView[], text: string }[][],
    isLoading: boolean,
    error: any,
    refetch: any,
    fetchNextPage: any,
    hasNextPage: any
  } => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 15,
      retry: true,
      networkMode: 'offlineFirst',
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getEvents = DI.resolve('getEventsUseCase')
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['events'],
        refetchOnWindowFocus: true,
        retry: true,
        staleTime: 1000 * 60 * 15,
        networkMode: 'offlineFirst',
        queryFn: async ({ pageParam = 1 }) => await getEvents.execute(pageParam) || { events: [], count: 0 },
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.events?.length ? pages.length + 1 : undefined
      })

    const userId = user?.id || 0

    const flat = data?.pages.flat().map(page => page.events).flat()
    if (flat && new Date(flat[flat.length - 1]?.start).getTime() < new Date(startDate).getTime() + numberOfWeeks * 7 * dayMS) { refetch() }
    const eventList = (userLoading || isLoading || !data) ? [] : flat?.map(event => new EventView(event, userId)) || []

    const weeks: { date: Date, events: EventView[], text: string }[][] = [];
    let date = new Date(startDate)

    if (eventList.length > 0) {
      for (let weekIndex = 0; weekIndex < numberOfWeeks; weekIndex++) {
        const week: { date: Date, events: EventView[], text: string }[] = [];
        const weekDay = date.getDay();
        const monday = date.getTime() - ((weekDay - 1) * dayMS);
        for (let i = 0; i < 7; i++) {
          const nextDay = new Date(monday + (i * dayMS));
          week.push({ date: nextDay, events: [], text: shortDateString(nextDay) });
        }
        for (const event of eventList) {
          if (event.days) {
            for (const day of event.days) {
              const dayString = new Date(day).toLocaleDateString();
              const weekDay = week.find(w => new Date(w.date).toLocaleDateString() === dayString);
              if (weekDay) {
                const isEventInWeek = weekDay.events.some(e => e.id === event.id);
                if (!isEventInWeek) {
                  week.forEach((w: any) => {
                    const isActive = new Date(w.date).toLocaleDateString() === dayString;
                    w.events.push({ ...event, actif: isActive } as EventView);
                  });
                } else {
                  weekDay.events.forEach(e => {
                    if (e?.days?.some((d: any) => new Date(d).toLocaleDateString() === dayString)) {
                      e.actif = true;
                    }
                  });
                }
                weekDay.events.sort((a, b) => a.id - b.id);
              }
            }
          }
        }
        weeks.push(week);
        date = new Date(monday + 7 * dayMS);
      }
      return { weeks, refetch, isLoading, error, fetchNextPage, hasNextPage };
    }
    return { weeks: [], refetch, isLoading: true, error, fetchNextPage, hasNextPage }
  }
}


