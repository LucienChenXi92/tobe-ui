import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { loginUser, useAuthDispatch, useAuthState } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { URL } from "../../routes";
import { Copyright, Loading } from "../../components";

export default function SignInPage() {
  const dispatch = useAuthDispatch();
  const authState = useAuthState();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let result = await loginUser(dispatch, {
      username: data.get("email"),
      password: data.get("password"),
    });
    if (result) {
      navigate("/", { replace: true });
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Loading open={authState.loading} />
      <Grid
        item
        xs={false}
        sm={5}
        md={8}
        sx={{
          backgroundImage: "url(/images/login_bg.jpeg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={7} md={4} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {t("sign-in.title")}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("sign-in.description.email")}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("sign-in.description.password")}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("sign-in.sign-in-btn")}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {t("sign-in.forget-pw-btn")}
                </Link>
              </Grid>
              <Grid item>
                <Link href={URL.SIGN_UP} variant="body2">
                  {t("sign-in.sign-up-btn")}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
