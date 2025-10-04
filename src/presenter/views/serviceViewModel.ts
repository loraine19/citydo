import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'
import { ServiceView } from './viewsEntities/serviceViewEntity';
import { Service, ServiceFindParams } from '../../domain/entities/Service';

export const serviceViewModel = () => {
  return (params: ServiceFindParams) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 15,
      retry: true,
      networkMode: 'offlineFirst',
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })
    const getServices = DI.resolve('getServicesUseCase')
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['services', params],
        retry: true,
        staleTime: 1000 * 60 * 15,
        networkMode: 'offlineFirst',
        queryFn: async ({ pageParam = 1 }) => await getServices.execute(pageParam, params) || [],
        initialPageParam: 1,
        getNextPageParam: (lastPage: any, pages: any) => lastPage?.services?.length ? pages.length + 1 : undefined
      });


    const count = isLoading || error ? 0 : (data?.pages[data?.pages.length - 1].count)
    const flat = error || isLoading || !data ? [] : data?.pages.flat().map((page: any) => page.services).flat()
    const services = (userLoading || !flat) ? [] : flat?.map((service: Service) => service && new ServiceView(service, user))


    console.log(services)

    return {
      count,
      services,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    };
  }
}

export const serviceIdViewModel = () => {
  return (id: number) => {
    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 15,
      retry: true,
      networkMode: 'offlineFirst',
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getServiceById = DI.resolve('getServiceByIdUseCase')

    const { data, isLoading, error, refetch } = useQuery({
      queryKey: ['serviceById', id],
      staleTime: 1000 * 60 * 15,
      retry: true,
      queryFn: async () => id && await getServiceById.execute(id),
    })
    const service = userLoading || isLoading ? {} : data ? new ServiceView(data, user) : {} as ServiceView;

    const update = async (): Promise<ServiceView | null> => {
      const { data: freshData, isSuccess } = await refetch();
      if (isSuccess && freshData) {
        const updated = new ServiceView(freshData, user);
        return updated;
      }
      return null;
    };
    return { service, isLoading, error, refetch, update }
  }
}
