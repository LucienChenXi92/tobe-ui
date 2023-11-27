import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { URL } from "./URL";
import { LOCAL_STORAGE_KEYS } from "../commons";
import { FrontendLayout, Loading } from "../components";
import { useAuthDispatch } from "../contexts";

const SignInPage = React.lazy(
  () => import("../containers/frontend/signIn/SignInPage")
);

const HomePage = React.lazy(
  () => import("../containers/frontend/homePage/HomePage")
);

const ToolsPage = React.lazy(
  () => import("../containers/frontend/tool/ToolsPage")
);

const Pomodoro = React.lazy(
  () => import("../containers/frontend/tool/Pomodoro")
);

const TimeConverter = React.lazy(
  () => import("../containers/frontend/tool/TimeConverter")
);

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
const StatisticsPage = React.lazy(
  () => import("../containers/backend/statistics/StatisticsPage")
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
const VocabularyReadingPage = React.lazy(
  () => import("../containers/frontend/vocabulary/VocabularyReadingPage")
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

const SubjectCreationPage = React.lazy(
  () => import("../containers/backend/subject/SubjectCreationPage")
);
const SubjectDetailPage = React.lazy(
  () => import("../containers/backend/subject/SubjectDetailPage")
);
const SubjectsPage = React.lazy(
  () => import("../containers/backend/subject/SubjectsPage")
);

const SubjectListPage = React.lazy(
  () => import("../containers/frontend/subject/SubjectListPage")
);

const SubjectReadingPage = React.lazy(
  () => import("../containers/frontend/subject/SubjectReadingPage")
);

const VocabulariesPage = React.lazy(
  () => import("../containers/backend/vocabulary/VocabulariesPage")
);

const VocabularyCreationPage = React.lazy(
  () => import("../containers/backend/vocabulary/VocabularyCreationPage")
);

const VocabularyDetailPage = React.lazy(
  () => import("../containers/backend/vocabulary/VocabularyDetailPage")
);

function MainRouter() {
  return (
    <Suspense fallback={<Loading open={true} />}>
      <BrowserRouter>
        <Routes>
          <Route path={URL.HOME} element={<HomePage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={URL.PROFILE} element={<ProfileSettingPage />} />
            <Route path={URL.STATISTICS} element={<StatisticsPage />} />
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
              path={URL.CREATE_SUBJECT}
              element={<SubjectCreationPage />}
            />
            <Route path={URL.SUBJECTS} element={<SubjectsPage />} />
            <Route path={URL.SUBJECT_DETAIL} element={<SubjectDetailPage />} />
            <Route
              path={URL.CREATE_VOCABULARY}
              element={<VocabularyCreationPage />}
            />
            <Route path={URL.VOCABULARIES} element={<VocabulariesPage />} />
            <Route
              path={URL.VOCABULARY_DETAIL}
              element={<VocabularyDetailPage />}
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
              path={URL.NEWS_VOCABULARY_DETAIL}
              element={<VocabularyReadingPage />}
            />
            <Route path={URL.SUBJECTS_PAGE} element={<SubjectListPage />} />
            <Route
              path={URL.SUBJECT_READING_PAGE}
              element={<SubjectReadingPage />}
            />
            <Route path={URL.TOOLS_PAGE} element={<ToolsPage />} />
            <Route path={URL.TOOL_POMODORO} element={<Pomodoro />} />
            <Route path={URL.TOOL_TIME_CONVERTER} element={<TimeConverter />} />
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
    <FrontendLayout>
      <Outlet />
    </FrontendLayout>
  );
}

export default MainRouter;
