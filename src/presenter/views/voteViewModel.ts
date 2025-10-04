import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'
import { Pool, Survey } from '../../domain/entities/PoolSurvey';
import { PoolSurveyView } from './viewsEntities/poolSurveyViewEntity';
import { PoolSurveysFindParams } from '../../domain/entities/PoolSurvey';

export const voteViewModel = () => {
  return (params: PoolSurveysFindParams) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10,
      retry: true,
      networkMode: 'offlineFirst',
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })


    const getPoolsSurveys = DI.resolve('getPoolsSurveysUseCase')
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['poolsSurveys', params],
        queryFn: async ({ pageParam = 1 }) => await getPoolsSurveys.execute(pageParam, params) || [],
        initialPageParam: 1,
        retry: true,
        staleTime: 1000 * 60 * 15,
        networkMode: 'offlineFirst',
        getNextPageParam: (lastPage, pages) => lastPage?.poolsSurveys?.length ? pages.length + 1 : undefined
      })

    const count = isLoading ? 0 : (data?.pages[data?.pages.length - 1].count)
    const flat = isLoading || !data || error ? [] : data?.pages.flat().map(page => page.poolsSurveys).flat()
    const poolsSurveys = userLoading ? [] : flat?.map((base: Pool | Survey) => base && new PoolSurveyView(base, user))

    return {
      count,
      poolsSurveys,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    };
  }
}

export const poolIdViewModel = () => {
  return (id: number) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 15,
      retry: true,
      networkMode: 'offlineFirst',
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getPoolById = DI.resolve('getPoolByIdUseCase')
    const { data, isLoading, error, refetch } = useQuery({
      queryKey: ['poolById', id],
      staleTime: 1000 * 60 * 15,
      retry: true,
      networkMode: 'offlineFirst',
      queryFn: async () => await getPoolById.execute(id),
    })

    const pool = (!userLoading && data && !isLoading) ? new PoolSurveyView(data, user) : {} as PoolSurveyView;

    const update = async (): Promise<PoolSurveyView | null> => {
      const { data: freshData, isSuccess } = await refetch();
      if (isSuccess && freshData) {
        const updatedEvent = new PoolSurveyView(freshData, user);
        return updatedEvent;
      }
      return null;
    }

    return { pool, isLoading, error, refetch, update }
  }
}

export const surveyIdViewModel = () => {
  return (id: number) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 15,
      retry: true,
      networkMode: 'offlineFirst',
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getSurveyById = DI.resolve('getSurveyByIdUseCase')
    const { data, isLoading, error, refetch } = useQuery({
      queryKey: ['surveyById', id],
      staleTime: 1000 * 60 * 15,
      retry: true,
      networkMode: 'offlineFirst',
      queryFn: async () => await getSurveyById.execute(id),
    })

    const survey = (!userLoading && !error && !isLoading && data) ? new PoolSurveyView(data, user) : {} as PoolSurveyView;

    const update = async (): Promise<PoolSurveyView | null> => {
      const { data: freshData, isSuccess } = await refetch();
      if (isSuccess && freshData) {
        const updatedEvent = new PoolSurveyView(freshData, user);
        return updatedEvent;
      }
      return null;
    }
    return { survey, isLoading, error, refetch, update }
  }
}

