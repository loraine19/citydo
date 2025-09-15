import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { PrivateRoute } from "./presenter/components/shared/utilsPage/PrivateRouter";
import NotFindPage from "./presenter/components/shared/utilsPage/NotFindPage";
import ErrorBoundary from "./presenter/components/shared/utilsPage/ErrorBoundary";
import SignInPage from "./presenter/components/shared/auth/SignInPage";
import ProfileCreatePage from "./presenter/components/shared/auth/ProfileCreatePage";
import SignUpPage from "./presenter/components/shared/auth/SignUpPage";
import DashboardPage from "./presenter/components/shared/dashboard/DashboardPage";
import { LoadingPage } from "./presenter/components/shared/utilsPage/LoadingPage";
import { errorValues } from "./presenter/components/shared/utilsPage/erroValues";
import { AlertModal } from "./presenter/components/common/AlertModal";
import { useAlertStore } from "./application/stores/alert.store";
import { WithTopNavPages } from "./presenter/components/shared/utilsPage/WithTopNavPages";
import { WithBottomPages } from "./presenter/components/shared/utilsPage/WithBottomPages";
import { useUxStore } from "./application/stores/ux.store";
import { AlertNotif } from "./presenter/components/common/AlertNotif";

// Lazy loaded pages
const ServiceCreatePage = lazy(() => import("./presenter/components/shared/service/ServiceCreatePage"));
const ServiceDetailPage = lazy(() => import("./presenter/components/shared/service/ServiceDetailPage"));
const ServiceEditPage = lazy(() => import("./presenter/components/shared/service/ServiceEditPage"));
const ServiceListPage = lazy(() => import("./presenter/components/shared/service/ServiceListPage"));
const IssueCreatePage = lazy(() => import("./presenter/components/shared/service/issue/IssueCreatePage"));
const IssueDetailPage = lazy(() => import("./presenter/components/shared/service/issue/IssueDetailPage"));
const IssueEditPage = lazy(() => import("./presenter/components/shared/service/issue/IssueEditPage"));
const PostCreatePage = lazy(() => import("./presenter/components/shared/post/PostCreatePage"));
const PostDetailPage = lazy(() => import("./presenter/components/shared/post/PostDetailPage"));
const PostEditPage = lazy(() => import("./presenter/components/shared/post/PostEditPage"));
const PostListPage = lazy(() => import("./presenter/components/shared/post/PostListPage"));
const ForgotPasswordPage = lazy(() => import("./presenter/components/shared/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./presenter/components/shared/auth/ResetPasswordPage"));
const DeleteAccountPage = lazy(() => import("./presenter/components/shared/auth/DeleteAccountPage"));
const EventCreatePage = lazy(() => import("./presenter/components/shared/event/EventCreatePage"));
const EventDetailPage = lazy(() => import("./presenter/components/shared/event/EventDetailPage"));
const EventEditPage = lazy(() => import("./presenter/components/shared/event/EventEditPage"));
const EventListPage = lazy(() => import("./presenter/components/shared/event/EventListPage"));
const FlagCreatePage = lazy(() => import("./presenter/components/shared/flag/FlagCreatePage"));
const FlagEditPage = lazy(() => import("./presenter/components/shared/flag/FlagEditPage"));
const FlagPage = lazy(() => import("./presenter/components/shared/flag/FlagPage"));
const VoteCreatePage = lazy(() => import("./presenter/components/shared/vote/VoteCreatePage"));
const SurveyDetailPage = lazy(() => import("./presenter/components/shared/vote/SurveyDetailPage"));
const VoteListPage = lazy(() => import("./presenter/components/shared/vote/VoteListPage"));
const VoteEditPage = lazy(() => import("./presenter/components/shared/vote/VoteEditPage"));
const MyInfosPage = lazy(() => import("./presenter/components/shared/myInfos/MyInfosPage"));
const NotificationPage = lazy(() => import("./presenter/components/shared/myInfos/NotificationPage"));
const PoolDetailPage = lazy(() => import("./presenter/components/shared/vote/PoolDetaiPage"));
const ConciliationListPage = lazy(() => import("./presenter/components/shared/service/issue/ConciationListPage"));
const ChatPage = lazy(() => import("./presenter/components/shared/dashboard/ChatPage"));
const RulesPage = lazy(() => import("./presenter/components/shared/dashboard/RulesPage"));
const GroupPage = lazy(() => import("./presenter/components/shared/dashboard/group/GroupPage"));
const GroupDetailPage = lazy(() => import("./presenter/components/shared/dashboard/group/GroupDetailPage"));
const BaseCreatePage = lazy(() => import("./presenter/components/shared/base/BaseCreatePage"));
const BaseEditPage = lazy(() => import("./presenter/components/shared/base/BaseEditPage"));
const BaseListPage = lazy(() => import("./presenter/components/shared/base/BaseListPage"));
const BaseDetailPage = lazy(() => import("./presenter/components/shared/base/BaseDetailPage"));


function App() {
    const [retryCount, setRetryCount] = useState(0);
    const handleRetry = () => setRetryCount(retryCount + 1);

    const { alertValues } = useAlertStore(state => state);
    const { color, getColor } = useUxStore(state => state);
    useEffect(() => { getColor(window.location.pathname) }, [window.location.pathname]);

    return (

        <ErrorBoundary
            color={color} onRetry={handleRetry} retryCount={retryCount}>
            <AlertNotif />
            <BrowserRouter>
                <div className={`App ${'slate'}BG`}>
                    <Suspense fallback={<LoadingPage />}>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/base" element={<BaseListPage />} />
                            <Route path="/test" element={<LoadingPage />} />
                            <Route path="/signin" element={<SignInPage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/profile/create" element={<ProfileCreatePage />} />
                            <Route path="/motdepasse_oublie" element={<ForgotPasswordPage />} />
                            <Route path="/motdepasse_oublie/reset" element={<ResetPasswordPage />} />
                            <Route path="/delete_account" element={<DeleteAccountPage />} />
                            <Route path="/*" element={<NotFindPage />} />

                            {/* Private routes */}
                            <Route path="/" element={<PrivateRoute />}>
                                <Route path="/myprofile" element={<MyInfosPage />} />


                                {/* Pages with top navigation */}
                                <Route element={<WithTopNavPages />}>
                                    <Route path="/chat" element={<ChatPage />} />
                                    <Route path="/service/create" element={<ServiceCreatePage />} />
                                    <Route path="/service/edit/:id" element={<ServiceEditPage />} />
                                    <Route path="/conciliation/edit/:id" element={<IssueEditPage />} />
                                    <Route path="/conciliation/create/:id" element={<IssueCreatePage />} />
                                    <Route path="/evenement/create" element={<EventCreatePage />} />
                                    <Route path="/evenement/edit/:id" element={<EventEditPage />} />
                                    <Route path="/flag/edit/:target/:id" element={<FlagEditPage />} />
                                    <Route path="/vote/:target/edit/:id" element={<VoteEditPage />} />
                                    <Route path="/vote/create" element={<VoteCreatePage />} />
                                    <Route path="/annonce/create" element={<PostCreatePage />} />
                                    <Route path="/annonce/edit/:id" element={<PostEditPage />} />
                                    <Route path="/vote/:target/edit/:id" element={<VoteEditPage />} />
                                    <Route path="/flag/:target/:id" element={<FlagCreatePage />} />
                                    <Route path="/reglement" element={<RulesPage />} />
                                    <Route path="/msg" element={<DashboardPage />} />
                                    <Route path="/base/create" element={<BaseCreatePage />} />
                                    <Route path="/base/edit/:id" element={<BaseEditPage />} />
                                </Route>

                                <Route element={<WithTopNavPages title />}>
                                    {/* DETAILS PAGES */}

                                    <Route path="/notification" element={<NotificationPage />} />
                                    <Route path="/service/:id" element={<ServiceDetailPage />} />
                                    <Route path="/cagnotte/:id" element={<PoolDetailPage />} />
                                    <Route path="/annonce/:id" element={<PostDetailPage />} />
                                    <Route path="/groupe/:id" element={<GroupDetailPage />} />
                                    <Route path="/evenement/:id" element={<EventDetailPage />} />
                                    <Route path="/conciliation/:id" element={<IssueDetailPage />} />
                                    <Route path="/vote/create" element={<VoteCreatePage />} />
                                    <Route path="/sondage/:id" element={<SurveyDetailPage />} />
                                    <Route path="/base/:id" element={<BaseDetailPage />} />
                                </Route>

                                <Route element={<WithTopNavPages addBtn navIcons />}>

                                    {/* Pages with bottom navigation */}
                                    <Route element={<WithBottomPages addBtn={false} />}>
                                        <Route path="/" element={<DashboardPage />} />
                                    </Route>

                                    {/* Pages with bottom navigation and add button */}
                                    <Route element={<WithBottomPages addBtn />}>
                                        <Route path="/groupe" element={<GroupPage />} />
                                        <Route path="/service" element={<ServiceListPage />} />
                                        <Route path="/evenement" element={<EventListPage />} />
                                        <Route path="/flag" element={<FlagPage />} />
                                        <Route path="/vote" element={<VoteListPage />} />
                                        <Route path="/annonce" element={<PostListPage />} />
                                        <Route path="/conciliation" element={<ConciliationListPage />} />

                                    </Route>
                                </Route>


                            </Route>
                        </Routes>
                    </Suspense>
                    <AlertModal values={alertValues ?? errorValues} />

                    {/* <div className="scale-95 opacity-50">
                        <ReactQueryDevtools />
                    </div> */}
                </div>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
