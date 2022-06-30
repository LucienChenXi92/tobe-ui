import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "../containers/HomePage/HomePage";
import SignInSide from "../containers/SignInPage/SignInPage";
import SignUpPage from "../containers/SignUpPage/SignUpPage";
import ProfileSettingPage from "../containers/ProfileSettingPage/ProfileSettingPage";
import ProtectedRoutes from "./ProtectedRoutes";
import { URL } from "./URL";
import { LOCAL_STORAGE_KEYS } from "../consts";
import { BasicLayout } from "../components";

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={URL.HOME} element={<HomePage />} />
        <Route path={URL.SIGN_IN} element={<SignInSide />} />
        <Route path={URL.SIGN_UP} element={<SignUpPage />} />
        <Route path={URL.SIGN_OUT} element={<SignOutRoute />} />
        <Route element={<ProtectedRoutes />}>
          <Route path={URL.PROFILE} element={<ProfileSettingPage />} />
          <Route
            path={URL.DASHBOARD}
            element={
              <main style={{ padding: "1rem" }}>
                <p>dashboard page!</p>
              </main>
            }
          />
        </Route>
        <Route>
          <Route element={<NonProtectedBasicLayoutRoute />}>
            <Route
              path={URL.NEWS}
              element={
                <main style={{ padding: "1rem" }}>
                  <p>news page!</p>
                </main>
              }
            />
            <Route
              path={URL.BLOG}
              element={
                <main style={{ padding: "1rem" }}>
                  <p>blog page!</p>
                </main>
              }
            />
            <Route
              path={URL.ABOUT}
              element={
                <main style={{ padding: "1rem" }}>
                  <p>about page!</p>
                </main>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function SignOutRoute() {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
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
