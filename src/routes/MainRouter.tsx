import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "../containers/homePage/HomePage";
import SignInPage from "../containers/signIn/SignInPage";
import SignUpPage from "../containers/signUp/SignUpPage";
import ProfileSettingPage from "../containers/profileSettingPage/ProfileSettingPage";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardPage from "../containers/myZone/DashboardPage";
import { URL } from "./URL";
import { LOCAL_STORAGE_KEYS } from "../commons";
import { BasicLayout } from "../components";
import UsersPage from "../containers/myZone/UsersPage";
import ProjectsPage from "../containers/project/ProjectsPage";
import ProjectCreationPage from "../containers/project/ProjectCreationPage";
import ProjectDetailPage from "../containers/project/ProjectDetailPage";
import NewsPage from "../containers/news/NewsPage";
import AboutPage from "../containers/aboutPage/AboutPage";
import ArticlesPage from "../containers/article/ArticlesPage";
import { useAuthDispatch } from "../contexts";
import ArticleCreationPage from "../containers/article/ArticleCreationPage";
import ArticleDetailPage from "../containers/article/ArticleDetailPage";
import ArticleReadingPage from "../containers/article/ArticleReadingPage";

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={URL.HOME} element={<HomePage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path={URL.PROFILE} element={<ProfileSettingPage />} />
          <Route path={URL.DASHBOARD} element={<DashboardPage />} />
          <Route path={URL.USERS} element={<UsersPage />} />
          <Route path={URL.PROJECTS} element={<ProjectsPage />} />
          <Route path={URL.CREATE_PROJECT} element={<ProjectCreationPage />} />
          <Route
            path={URL.PROJECT_DETAIL}
            element={<ProjectDetailPage viewOnly={false} />}
          />
          <Route path={URL.ARTICLES} element={<ArticlesPage />} />
          <Route path={URL.CREATE_ARTICLE} element={<ArticleCreationPage />} />
          <Route
            path={URL.ARTICLE_DETAIL}
            element={<ArticleDetailPage viewOnly={false} />}
          />
        </Route>

        <Route element={<NonProtectedBasicLayoutRoute />}>
          <Route path={URL.SIGN_IN} element={<SignInPage />} />
          <Route path={URL.SIGN_UP} element={<SignUpPage />} />
          <Route path={URL.SIGN_OUT} element={<SignOutRoute />} />
          <Route path={URL.NEWS} element={<NewsPage />} />
          <Route
            path={URL.NEWS_PROJECT_DETAIL}
            element={<ProjectDetailPage viewOnly={true} />}
          />
          <Route
            path={URL.NEWS_ARTICLE_DETAIL}
            element={<ArticleReadingPage />}
          />
          <Route
            path={URL.ARTICLE}
            element={
              <main style={{ padding: "1rem" }}>
                <p>Coming soon!</p>
              </main>
            }
          />
          <Route path={URL.ABOUT} element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function SignOutRoute() {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTHORITIES);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);

  const dispatch = useAuthDispatch();
  dispatch({ type: "LOGOUT", payload: null });
  return <SignInPage />;
}

function NonProtectedBasicLayoutRoute() {
  return (
    <BasicLayout>
      <Outlet />
    </BasicLayout>
  );
}

export default MainRouter;
