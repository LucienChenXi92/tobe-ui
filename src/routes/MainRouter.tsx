import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { URL } from "./URL";
import { LOCAL_STORAGE_KEYS } from "../commons";
import { BasicLayout, Loading } from "../components";
import { useAuthDispatch } from "../contexts";
import HomePage from "../containers/frontend/homePage/HomePage";
import SignInPage from "../containers/frontend/signIn/SignInPage";

const AboutPage = React.lazy(
  () => import("../containers/frontend/aboutPage/AboutPage")
);
const SignUpPage = React.lazy(
  () => import("../containers/frontend/signUp/SignUpPage")
);
const ProfileSettingPage = React.lazy(
  () => import("../containers/backend/profileSettingPage/ProfileSettingPage")
);
const ProtectedRoutes = React.lazy(() => import("./ProtectedRoutes"));
const DashboardPage = React.lazy(
  () => import("../containers/backend/dashboard/DashboardPage")
);
const UsersPage = React.lazy(
  () => import("../containers/backend/user/UsersPage")
);
const ProjectsPage = React.lazy(
  () => import("../containers/backend/project/ProjectsPage")
);
const ProjectCreationPage = React.lazy(
  () => import("../containers/backend/project/ProjectCreationPage")
);
const ProjectDetailPage = React.lazy(
  () => import("../containers/backend/project/ProjectDetailPage")
);
const ProjectReadingPage = React.lazy(
  () => import("../containers/frontend/project/ProjectReadingPage")
);
const ArticlesPage = React.lazy(
  () => import("../containers/backend/article/ArticlesPage")
);
const ArticleCreationPage = React.lazy(
  () => import("../containers/backend/article/ArticleCreationPage")
);
const ArticleDetailPage = React.lazy(
  () => import("../containers/backend/article/ArticleDetailPage")
);
const ArticleReadingPage = React.lazy(
  () => import("../containers/frontend/article/ArticleReadingPage")
);

const TagCollectionCreationPage = React.lazy(
  () => import("../containers/backend/collection/TagCollectionCreationPage")
);

function MainRouter() {
  return (
    <Suspense fallback={<Loading open={true} />}>
      <BrowserRouter>
        <Routes>
          <Route path={URL.HOME} element={<HomePage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={URL.PROFILE} element={<ProfileSettingPage />} />
            <Route path={URL.DASHBOARD} element={<DashboardPage />} />
            <Route path={URL.USERS} element={<UsersPage />} />
            <Route path={URL.PROJECTS} element={<ProjectsPage />} />
            <Route
              path={URL.CREATE_PROJECT}
              element={<ProjectCreationPage />}
            />
            <Route path={URL.PROJECT_DETAIL} element={<ProjectDetailPage />} />
            <Route path={URL.ARTICLES} element={<ArticlesPage />} />
            <Route
              path={URL.CREATE_ARTICLE}
              element={<ArticleCreationPage />}
            />
            <Route path={URL.ARTICLE_DETAIL} element={<ArticleDetailPage />} />
            <Route
              path={URL.CREATE_COLLECTION}
              element={<TagCollectionCreationPage />}
            />
          </Route>

          <Route element={<NonProtectedBasicLayoutRoute />}>
            <Route path={URL.SIGN_IN} element={<SignInPage />} />
            <Route path={URL.SIGN_UP} element={<SignUpPage />} />
            <Route path={URL.SIGN_OUT} element={<SignOutRoute />} />
            <Route
              path={URL.NEWS_PROJECT_DETAIL}
              element={<ProjectReadingPage />}
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
    </Suspense>
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
