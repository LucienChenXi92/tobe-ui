import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "../containers/homePage/HomePage";
import SignInSide from "../containers/signIn/SignInPage";
import SignUpPage from "../containers/signUp/SignUpPage";
import ProfileSettingPage from "../containers/ProfileSettingPage/ProfileSettingPage";
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
        </Route>

        <Route element={<NonProtectedBasicLayoutRoute />}>
          <Route path={URL.SIGN_IN} element={<SignInSide />} />
          <Route path={URL.SIGN_UP} element={<SignUpPage />} />
          <Route path={URL.SIGN_OUT} element={<SignOutRoute />} />
          <Route path={URL.NEWS} element={<NewsPage />} />
          <Route
            path={URL.NEWS_DETAIL}
            element={<ProjectDetailPage viewOnly={true} />}
          />
          <Route
            path={URL.BLOG}
            element={
              <main style={{ padding: "1rem" }}>
                <p>Coming soon!</p>
              </main>
            }
          />
          <Route
            path={URL.ABOUT}
            element={
              <main style={{ padding: "1rem" }}>
                <p>Coming soon!</p>
              </main>
            }
          />
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
  return <SignInSide />;
}

function NonProtectedBasicLayoutRoute() {
  return (
    <BasicLayout>
      <Outlet />
    </BasicLayout>
  );
}

export default MainRouter;
