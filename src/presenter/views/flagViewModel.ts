import { useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc';
import { Flag, FlagTarget } from '../../domain/entities/Flag';
import { FlagView } from './viewsEntities/flagViewEntities';


export const flagsViewModel = () => {
  const getFlags = DI.resolve('getFlagsUseCase')
  const { data, isLoading, error, refetch }
    = useQuery({
      queryKey: ['flags'],
      staleTime: 1000 * 60 * 15,
      retry: true,
      queryFn: async () => await getFlags.execute() || [],
    })

  const flags = isLoading ? [] : data?.map((flag: Flag) => new FlagView(flag))

  return {
    flags,
    refetch,
    isLoading,
    error

  }
}

export const flagByIdViewModel = () => {
  return (id: number, target: FlagTarget) => {
    const getFlagById = DI.resolve('getFlagByIdUseCase')
    const { data, isLoading, error, refetch }
      = useQuery({
        queryKey: ['flagById', id, target],
        staleTime: 1000 * 60 * 15,
        retry: true,
        queryFn: async () => await getFlagById.execute(id, target) || [],
      })

    const flag = isLoading ? {} : new FlagView(data)
    return {
      flag,
      refetch,
      isLoading,
      error

    }
  }
}

