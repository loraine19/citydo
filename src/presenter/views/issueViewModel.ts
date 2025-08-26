import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'
import { Issue } from '../../domain/entities/Issue';
import { IssueView } from './viewsEntities/issueViewEntity';

export const issueViewModel = () => {
  return (filter?: string) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      staleTime: 600000, // 10 minutes,
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getIssues = DI.resolve('getIssuesUseCase')
    const userId = user?.id || 0

    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['issues', filter],
        //  staleTime: 600000,
        queryFn: async ({ pageParam = 1 }) => await getIssues.execute(pageParam, filter) || [],
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage?.issues?.length ? pages.length + 1 : undefined
      });

    const count = isLoading ? 0 : (data?.pages[data?.pages.length - 1].count)
    const flat = (isLoading || !data) ? [] : data?.pages.flat().map(page => page.issues).flat()
    const issues = userLoading || isLoading ? [] : flat?.map((issue: Issue) => new IssueView(issue, userId))

    console.log(issues)

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
      staleTime: 600000,
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })
    const userId = user?.id || 0
    const getIssueById = DI.resolve('getIssueByIdUseCase')

    const { data, isLoading, error, refetch } = useQuery({
      queryKey: ['IssueById', id],
      staleTime: 600000,
      queryFn: async () => await getIssueById.execute(id),
    })
    const issue = userLoading ? {} : data ? new IssueView(data, userId) : {} as IssueView;
    return { issue, isLoading, error, refetch }
  }
}
