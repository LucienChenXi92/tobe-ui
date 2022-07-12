import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { loginUser, useAuthDispatch } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { URL } from "../../routes";
import { Loading } from "../../components";
import { useSnackbar } from "notistack";

export default function SignInPage() {
  const dispatch = useAuthDispatch();
  const [openLoading, updateOpenLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    updateOpenLoading(true);
    loginUser(dispatch, {
      username: data.get("email"),
      password: data.get("password"),
    })
      .then(() => {
        enqueueSnackbar(t("sign-in.msg.success"), {
          variant: "success",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
        navigate(URL.HOME, { replace: true });
      })
      .catch(() => {
        enqueueSnackbar(t("sign-in.msg.error"), {
          variant: "error",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
      })
      .finally(() => {
        updateOpenLoading(false);
      });
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "95vh",
        marginTop: "5vh",
      }}
    >
      <Loading open={openLoading} />
      <Grid
        item
        xs={false}
        sm={5}
        md={8}
        sx={{
          backgroundImage: "url(/images/login_bg.jpeg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={7} md={4} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 16,
            mx: 5,
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
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
