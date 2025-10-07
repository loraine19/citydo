import { asClass, asFunction, createContainer, BuildResolverOptions } from 'awilix';
import { UserRepositoryImpl } from '../infrastructure/repositoriesImpl/UserRespositoryImpl';
import { UserApi } from '../infrastructure/providers/http/userApi';
import { NotifRepositoryImpl } from '../infrastructure/repositoriesImpl/NotifRespositoryImpl';
import { NotifApi } from '../infrastructure/providers/http/notifApi';
import { EventRepositoryImpl } from '../infrastructure/repositoriesImpl/EventRespositoryImpl';
import { EventApi } from '../infrastructure/providers/http/eventApi';
import { ParticipantRepositoryImpl } from '../infrastructure/repositoriesImpl/ParticipantRespositoryImpl';
import { ParticipantApi } from '../infrastructure/providers/http/participantApi';
import { AuthApi } from '../infrastructure/providers/http/authApi';
import { AuthRepositoryImpl } from '../infrastructure/repositoriesImpl/AuthRespositoryImpl';
import { ResetPasswordApi } from '../infrastructure/providers/http/resetPassword.api';
import { ResetPasswordRepositoryImpl } from '../infrastructure/repositoriesImpl/ResetPasswordRespositoryImpl';
import { ProfileRepositoryImpl } from '../infrastructure/repositoriesImpl/ProfileRespositoryImpl';
import { meViewModel } from '../presenter/views/profileViewModel';
import { ProfileApi } from '../infrastructure/providers/http/profileApi';
import { AddressRepositoryImpl } from '../infrastructure/repositoriesImpl/AddressRespositoryImpl';
import { AddressApi } from '../infrastructure/providers/http/addressApi';
import { eventIdViewModel, eventsWeekViewModel, eventViewModel } from '../presenter/views/eventViewModel';
import { AuthService } from '../infrastructure/services/authService';
import { ResetPasswordService } from '../infrastructure/services/resetPasswordService';
import { ServiceApi } from '../infrastructure/providers/http/serviceApi';
import { ServiceRepositoryImpl } from '../infrastructure/repositoriesImpl/ServiceRespositoryImpl';
import { serviceIdViewModel, serviceViewModel } from '../presenter/views/serviceViewModel';
import { GetUserByIdUseCase, GetUserCountUseCase, GetUserMeUseCase, GetUsersModosUseCase, GetUsersUseCase } from '../application/useCases/user.usecase';
import { DeleteEventUseCase, GetEventByIdUseCase, GetEventsUseCase, PostEventUseCase, UpdateEventUseCase } from '../application/useCases/event.usecase';
import { DeleteAccountConfirmUseCase, DeleteAccountUseCase, GoogleAuthUseCase, LogOutUseCase, SignInUseCase, SignInVerifyUseCase, SignUpUseCase } from '../application/useCases/auth.useCase';
import { GetAddressOpenUseCase, GetAddressUseCase, UpdateAddressUseCase } from '../application/useCases/address.useCase';
import { ResetPasswordUpdateUseCase, ResetPasswordUseCase } from '../application/useCases/resetPassword.useCase';
import { GetServicesUseCase, GetServiceByIdUseCase, UpdateServiceUseCase, DeleteServiceUseCase, PostServiceUseCase, CancelRespServiceUseCase, FinishServiceUseCase, ValidRespServiceUseCase, RespServiceUseCase } from '../application/useCases/service.usecase';
import { GetNotifUseCase, ReadAllNotifUseCase, ReadNotifUseCase } from '../application/useCases/notif.usecase';
import { ToogleParticipantUseCase } from '../application/useCases/participants.useCase';
import { PostProfileUseCase, UpdateAllRoleUseCase, UpdateProfileUseCase, UpdateRoleUseCase } from '../application/useCases/profile.useCase';
import { notifMapViewModel, notifViewModel } from '../presenter/views/notifViewModel';
import { cryptedStorage } from '../infrastructure/services/storageService';
import { FlagApi } from '../infrastructure/providers/http/flagApi';
import { GetFlagsUseCase, GetFlagByIdUseCase, PostFlagUseCase, DeleteFlagUseCase } from '../application/useCases/flag.usecase';
import { FlagRepositoryImpl } from '../infrastructure/repositoriesImpl/FlagRespositoryImpl';
import { flagByIdViewModel, flagsViewModel } from '../presenter/views/flagViewModel';
import { IssueRepositoryImpl } from '../infrastructure/repositoriesImpl/IssueRepositoryImpl';
import { IssueApi } from '../infrastructure/providers/http/IssueApi';
import { PostRepositoryImpl } from '../infrastructure/repositoriesImpl/PostRespositoryImpl';
import { PostApi } from '../infrastructure/providers/http/postApi';
import { DeletePostUseCase, GetPostByIdUseCase, GetPostsUseCase, PostPostUseCase, UpdatePostUseCase } from '../application/useCases/post.useCase';
import { postIdViewModel, postViewModel } from '../presenter/views/postViewModel';
import { LikeRepositoryImpl } from '../infrastructure/repositoriesImpl/LikeRespositoryImpl';
import { ToogleLikeUseCase } from '../application/useCases/like.useCase';
import { LikeApi } from '../infrastructure/providers/http/likeApi';
import { PoolSurveyRepositoryImpl } from '../infrastructure/repositoriesImpl/PoolSurveyRespositoryImpl';
import { PoolSurveyApi } from '../infrastructure/providers/http/poolSurveyApi';
import { DeletePoolUseCase, DeleteSurveyUseCase, GetPoolByIdUseCase, GetPoolsSurveysUseCase, GetSurveyByIdUseCase, PostPoolUseCase, PostSurveyUseCase, UpdatePoolUseCase, UpdateSurveyUseCase } from '../application/useCases/poolSurvey.useCase';
import { poolIdViewModel, surveyIdViewModel, voteViewModel } from '../presenter/views/voteViewModel';
import { PostVoteUseCase, UpdateVoteUseCase } from '../application/useCases/vote.useCase';
import { VoteRepositoryImpl } from '../infrastructure/repositoriesImpl/VoteRespositoryImpl';
import { VoteApi } from '../infrastructure/providers/http/voteApi';
import { GetIssuesUseCase, GetIssueByIdUseCase, PostIssueUseCase, UpdateIssueUseCase, DeleteIssueUseCase, FinishIssueUseCase } from '../application/useCases/issue.useCase';
import { issueViewModel, IssueIdViewModel } from '../presenter/views/issueViewModel';
import { RespIssueUseCase } from '../application/useCases/issue.useCase';
import { DeleteMessageUseCase, GetConversationUseCase, GetMessagesUseCase, ReadConversationUseCase, ReadMessageUseCase, RemoveMessageUseCase, SendMessageUseCase, UpdateMessageUseCase } from '../application/useCases/message.usecase';
import { MessageRepositoryImpl } from '../infrastructure/repositoriesImpl/MessageRespositoryImpl';
import { MessageApi } from '../infrastructure/providers/http/messageApi';
import { conversationsViewModel, conversationViewModel } from '../presenter/views/messageViewModel';
import SocketService from '../infrastructure/providers/http/socketService';
import { AlertStoreRepositoryImpl } from '../infrastructure/repositoriesImpl/AlertStoreRespositoryImpl';
import { ErrorService } from '../infrastructure/services/errorService';
import { GroupRepositoryImpl } from '../infrastructure/repositoriesImpl/GroupRespositoryImpl';
import { GroupApi } from '../infrastructure/providers/http/groupApi';
import { DeleteGroupUserUseCase, GetGroupByIdUseCase, GetNearestGroupsUseCase, PostGroupUserUseCase, UpdateGroupUserUseCase } from '../application/useCases/group.usecase';
import { groupIdViewModel, groupViewModel } from '../presenter/views/groupViewModel';
import { UtilsUseCase } from '../application/useCases/utils.useCase';
import { modosViewModel, userViewModel } from '../presenter/views/userViewModel';


// Extend the BuildResolverOptions type to include 'deps'
export interface ExtendedBuildResolverOptions<T> extends BuildResolverOptions<T> {
    deps?: string[];
}

const container = createContainer();
container.register({

    ////AUTH 
    signInUseCase: asClass(SignInUseCase),
    signUpUseCase: asClass(SignUpUseCase),
    signInVerifyUseCase: asClass(SignInVerifyUseCase),
    deleteAccountUseCase: asClass(DeleteAccountUseCase),
    deleteAccountConfirmUseCase: asClass(DeleteAccountConfirmUseCase),
    logOutUseCase: asClass(LogOutUseCase),
    authRepository: asClass(AuthRepositoryImpl),
    authData: asClass(AuthApi),
    authService: asClass(AuthService),
    storage: asClass(cryptedStorage),
    googleAuthUseCase: asClass(GoogleAuthUseCase),

    ////ADDRESS
    updateAddressUseCase: asClass(UpdateAddressUseCase),
    addressRepository: asClass(AddressRepositoryImpl),
    addressData: asClass(AddressApi),
    getAddressUseCase: asClass(GetAddressUseCase),
    getAddressOpenUseCase: asClass(GetAddressOpenUseCase),

    ////RESET PASSWORD
    resetPasswordUseCase: asClass(ResetPasswordUseCase),
    resetPasswordUpdateUseCase: asClass(ResetPasswordUpdateUseCase),
    resetPasswordRepository: asClass(ResetPasswordRepositoryImpl),
    resetPasswordData: asClass(ResetPasswordApi),
    resetPasswordService: asClass(ResetPasswordService),

    ////USER

    meViewModel: asFunction(meViewModel),
    getUserMeUseCase: asClass(GetUserMeUseCase),
    getUserByIdUseCase: asClass(GetUserByIdUseCase),
    getUserCountUseCase: asClass(GetUserCountUseCase),
    getUsersUseCase: asClass(GetUsersUseCase),
    getUsersModosUseCase: asClass(GetUsersModosUseCase),
    userRepository: asClass(UserRepositoryImpl),
    userData: asClass(UserApi),
    userViewModel: asFunction(userViewModel),
    modosViewModel: asFunction(modosViewModel),

    ////PROFILE
    postProfileUseCase: asClass(PostProfileUseCase),
    updateProfileUseCase: asClass(UpdateProfileUseCase),
    profileRepository: asClass(ProfileRepositoryImpl),
    profileData: asClass(ProfileApi),
    updateRoleUseCase: asClass(UpdateRoleUseCase),
    updateAllRoleUseCase: asClass(UpdateAllRoleUseCase),

    ////NOTIFS
    notifViewModel: asFunction(notifViewModel),
    notifMapViewModel: asFunction(notifMapViewModel),
    getNotifUseCase: asClass(GetNotifUseCase),
    readNotifUseCase: asClass(ReadNotifUseCase),
    readAllNotifUseCase: asClass(ReadAllNotifUseCase),
    notifRepository: asClass(NotifRepositoryImpl),
    notifData: asClass(NotifApi),

    ////MESSAGES
    getMessagesUseCase: asClass(GetMessagesUseCase),
    getConversationUseCase: asClass(GetConversationUseCase),
    readMessageUseCase: asClass(ReadMessageUseCase),
    sendMessageUseCase: asClass(SendMessageUseCase),
    deleteMessageUseCase: asClass(DeleteMessageUseCase),
    udateMessageUseCase: asClass(UpdateMessageUseCase),
    messageRepository: asClass(MessageRepositoryImpl),
    messageData: asClass(MessageApi),
    conversationViewModel: asFunction(conversationViewModel),
    conversationsViewModel: asFunction(conversationsViewModel),
    readConversationUseCase: asClass(ReadConversationUseCase),
    removeMessageUseCase: asClass(RemoveMessageUseCase),

    ////EVENTS
    getEventsUseCase: asClass(GetEventsUseCase),
    getEventByIdUseCase: asClass(GetEventByIdUseCase),
    postEventUseCase: asClass(PostEventUseCase),
    updateEventUseCase: asClass(UpdateEventUseCase),
    deleteEventUseCase: asClass(DeleteEventUseCase),
    eventRepository: asClass(EventRepositoryImpl),
    eventViewModel: asFunction(eventViewModel),
    eventIdViewModel: asFunction(eventIdViewModel),
    eventsWeekViewModel: asFunction(eventsWeekViewModel),
    eventData: asClass(EventApi),

    ////PARTICIPANTS
    toogleParticipantUseCase: asClass(ToogleParticipantUseCase),
    participantRepository: asClass(ParticipantRepositoryImpl),
    participantData: asClass(ParticipantApi),

    ////SERVICES
    getServicesUseCase: asClass(GetServicesUseCase),
    getServiceByIdUseCase: asClass(GetServiceByIdUseCase),
    postServiceUseCase: asClass(PostServiceUseCase),
    updateServiceUseCase: asClass(UpdateServiceUseCase),
    respServiceUseCase: asClass(RespServiceUseCase),
    validRespServiceUseCase: asClass(ValidRespServiceUseCase),
    cancelRespServiceUseCase: asClass(CancelRespServiceUseCase),
    finishServiceUseCase: asClass(FinishServiceUseCase),
    deleteServiceUseCase: asClass(DeleteServiceUseCase),
    serviceRepository: asClass(ServiceRepositoryImpl),
    serviceData: asClass(ServiceApi),
    serviceViewModel: asFunction(serviceViewModel),
    serviceIdViewModel: asFunction(serviceIdViewModel),

    ////FLAG 
    flagRepository: asClass(FlagRepositoryImpl),
    flagData: asClass(FlagApi),
    getFlagsUseCase: asClass(GetFlagsUseCase),
    getFlagByIdUseCase: asClass(GetFlagByIdUseCase),
    postFlagUseCase: asClass(PostFlagUseCase),
    deleteFlagUseCase: asClass(DeleteFlagUseCase),
    flagsViewModel: asFunction(flagsViewModel),
    flagByIdViewModel: asFunction(flagByIdViewModel),

    ////ISSUE
    issueRepository: asClass(IssueRepositoryImpl),
    issueData: asClass(IssueApi),
    getIssuesUseCase: asClass(GetIssuesUseCase),
    getIssueByIdUseCase: asClass(GetIssueByIdUseCase),
    postIssueUseCase: asClass(PostIssueUseCase),
    updateIssueUseCase: asClass(UpdateIssueUseCase),
    issueViewModel: asFunction(issueViewModel),
    issueIdViewModel: asFunction(IssueIdViewModel),
    respIssueUseCase: asClass(RespIssueUseCase),
    finishIssueUseCase: asClass(FinishIssueUseCase),
    deleteIssueUseCase: asClass(DeleteIssueUseCase),

    ////POST
    postRepository: asClass(PostRepositoryImpl),
    postData: asClass(PostApi),
    getPostsUseCase: asClass(GetPostsUseCase),
    getPostByIdUseCase: asClass(GetPostByIdUseCase),
    postPostUseCase: asClass(PostPostUseCase),
    updatePostUseCase: asClass(UpdatePostUseCase),
    deletePostUseCase: asClass(DeletePostUseCase),
    postViewModel: asFunction(postViewModel),
    postIdViewModel: asFunction(postIdViewModel),

    ////LIKE
    toogleLikeUseCase: asClass(ToogleLikeUseCase),
    likeRepository: asClass(LikeRepositoryImpl),
    likeData: asClass(LikeApi),

    ////VOTE
    poolSurveyRepository: asClass(PoolSurveyRepositoryImpl),
    poolSurveyData: asClass(PoolSurveyApi),
    getPoolsSurveysUseCase: asClass(GetPoolsSurveysUseCase),
    getPoolByIdUseCase: asClass(GetPoolByIdUseCase),
    getSurveyByIdUseCase: asClass(GetSurveyByIdUseCase),
    postPoolUseCase: asClass(PostPoolUseCase),
    updatePoolUseCase: asClass(UpdatePoolUseCase),
    deletePoolUseCase: asClass(DeletePoolUseCase),
    postSurveyUseCase: asClass(PostSurveyUseCase),
    updateSurveyUseCase: asClass(UpdateSurveyUseCase),
    deleteSurveyUseCase: asClass(DeleteSurveyUseCase),
    voteViewModel: asFunction(voteViewModel),
    poolIdViewModel: asFunction(poolIdViewModel),
    surveyIdViewModel: asFunction(surveyIdViewModel),
    voteRepository: asClass(VoteRepositoryImpl),
    voteData: asClass(VoteApi),
    postVoteUseCase: asClass(PostVoteUseCase),
    updateVoteUseCase: asClass(UpdateVoteUseCase),

    ////GROUPES
    groupRepository: asClass(GroupRepositoryImpl),
    groupData: asClass(GroupApi),
    getNearestGroupsUseCase: asClass(GetNearestGroupsUseCase),
    getGroupByIdUseCase: asClass(GetGroupByIdUseCase),
    groupViewModel: asFunction(groupViewModel),
    groupIdViewModel: asFunction(groupIdViewModel),
    postGroupUserUseCase: asClass(PostGroupUserUseCase),
    updateGroupUserUseCase: asClass(UpdateGroupUserUseCase),
    deleteGroupUserUseCase: asClass(DeleteGroupUserUseCase),


    ////SOCKETS 
    socketService: asClass(SocketService),

    ///STORE 
    errorService: asClass(ErrorService),
    alertStoreRepository: asClass(AlertStoreRepositoryImpl),



    ///UTILS
    utils: asClass(UtilsUseCase),

});

// Log all registered components
console.log('Registered components:', container.registrations);

// TEST RESOLVE 
//console.log('addressUserCase:', container.resolve('addressUseCase').getAddresses());

export default container;