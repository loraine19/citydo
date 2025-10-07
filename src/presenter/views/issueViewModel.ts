import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'
import { Issue } from '../../domain/entities/Issue';
import { IssueView } from './viewsEntities/issueViewEntity';

export const issueViewModel = () => {
  return (filter?: string) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      staleTime: 1000 * 60 * 15,
      retry: true,
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getIssues = DI.resolve('getIssuesUseCase')
    const userId = user?.id || 0
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['issues', filter],
        staleTime: 1000 * 60 * 15,
        retry: true,
        networkMode: 'offlineFirst',
        queryFn: async ({ pageParam = 1 }) => await getIssues.execute(pageParam, filter) || { issues: [], count: 0 },
        initialPageParam: 1,

        getNextPageParam: (lastPage, pages) => lastPage?.issues?.length ? pages.length + 1 : undefined
      });

    const count = isLoading ? 0 : (data?.pages[data?.pages.length - 1].count)
    const flat = (isLoading) ? [] : data?.pages.flat().map(page => page.issues).flat()
    const issues = (userLoading || !flat) ? [] : flat?.map((issue: Issue) => new IssueView(issue, userId))

    console.log("issues", issues, data, filter)

    return {
      count,
      issues,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    }
  }
}

export const IssueIdViewModel = () => {
  return (id: number) => {
    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 15,
      retry: true,
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })
    const userId = user?.id || 0
    const getIssueById = DI.resolve('getIssueByIdUseCase')

    const { data, isLoading, error, refetch } = useQuery({
      queryKey: ['IssueById', id],
      staleTime: 1000 * 60 * 15,
      retry: true,
      queryFn: async () => await getIssueById.execute(id),
    })
    const issue = userLoading ? {} : data ? new IssueView(data, userId) : {} as IssueView;
    return { issue, isLoading, error, refetch }
  }
}
