import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import DI from '../../di/ioc'
import { MessageView } from './viewsEntities/messageViewEntity';
import { Message } from '../../domain/entities/Message';


export const conversationViewModel = () => {
  return (id: number) => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 15,
      retry: true,
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getConversation = DI.resolve('getConversationUseCase')
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['conversation', id],
        staleTime: 1000 * 60 * 15,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        retry: true,
        networkMode: 'offlineFirst',
        queryFn: async ({ pageParam = 1 }) => await getConversation.execute(id, pageParam) || [],
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage?.messages?.length ? pages.length + 1 : undefined
      })

    const count = isLoading ? 0 : (data?.pages[data?.pages.length - 1].count)
    const flat = data?.pages.flat().map(page => page.messages).flat()
    const messages = isLoading || userLoading ? [] : flat?.map((message: Message) => message && new MessageView(message, user?.id || 0))


    return {
      count,
      messages,
      refetch,
      fetchNextPage,
      hasNextPage,
      isLoading,
      error
    }
  }

}

export const conversationsViewModel = () => {
  return () => {

    const { data: user, isLoading: userLoading } = useQuery({
      queryKey: ['user'],
      queryFn: async () => await DI.resolve('getUserMeUseCase').execute(),
    })

    const getMessages = DI.resolve('getMessagesUseCase')
    const { data, isLoading, error, fetchNextPage, hasNextPage, refetch }
      = useInfiniteQuery({
        queryKey: ['conversations'],
        queryFn: async ({ pageParam = 1 }) => await getMessages.execute(pageParam) || [],
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage?.conversations?.length ? pages.length + 1 : undefined,
        refetchOnMount: true,
        staleTime: 1000 * 60 * 15,
        retry: true,
        networkMode: 'offlineFirst',
        refetchOnWindowFocus: true,
      })

    const count = isLoading ? 0 : (data?.pages[data?.pages.length - 1].count)
    const flat = data?.pages.flat().map(page => page.conversations).flat()
    const conversations = isLoading || userLoading ? [] : flat?.map((message: Message) => new MessageView(message, user?.id || 0))


    return {
      countConv: count,
      conversations,
      refetchConv: refetch,
      fetchNextPageConv: fetchNextPage,
      hasNextPageConv: hasNextPage,
      isLoadingConv: isLoading,
      errorConv: error
    }
  }

}

