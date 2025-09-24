import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc';
import { PostView } from './viewsEntities/postViewEntities';
import { PostFindParams } from '../../domain/entities/Post';

export const postViewModel = () => {
  return (params: PostFindParams) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: false,
      staleTime: 600000, // 10 minutes,
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getPosts = DI.resolve('getPostsUseCase')
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['Posts', params],
        refetchOnWindowFocus: false,
        staleTime: 600000, // 10 minutes,
        queryFn: async ({ pageParam = 1 }) => await getPosts.execute(pageParam, params) || { Posts: [], count: 0 },
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.posts?.length ? pages.length + 1 : undefined
      })

    const count = isLoading || error ? 0 : (data?.pages[data?.pages.length - 1].count)
    const userId = user?.id || 0
    const flat = error || isLoading || userLoading || !data ? [] : data?.pages.flat().map(page => page.posts).flat()
    const posts = flat?.map(post => post && new PostView(post, userId))

    return {
      count,
      posts,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    }
  }
}


export const postIdViewModel = () => {
  return (id: number) => {


    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      staleTime: 600000,
      refetchOnWindowFocus: false,
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })
    const userId = user?.id

    const getPostById = DI.resolve('getPostByIdUseCase')
    let { data, isLoading, error, refetch } = useQuery({
      queryKey: ['PostById', id],
      staleTime: 600000,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      queryFn: async () => await getPostById.execute(id),
    })

    const post = (!data || userLoading || isLoading) ? {} as PostView : new PostView(data, userId)
    return { post, isLoading, error, refetch }
  }


}






