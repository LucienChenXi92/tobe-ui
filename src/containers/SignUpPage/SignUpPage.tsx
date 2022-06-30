import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  TextField,
  Link,
} from "@mui/material";
import { Copyright, Loading } from "../../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { URL } from "../../routes";
import { createUser } from "../../contexts";
import { useSnackbar } from "notistack";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [openLoading, updateOpenLoading] = useState(false);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // start loading
    updateOpenLoading(true);
    createUser({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    })
      .then(() => {
        enqueueSnackbar(t("sign-up.msg.success"), {
          variant: "success",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
        navigate(URL.SIGN_IN, { replace: true });
      })
      .catch(() => {
        enqueueSnackbar(t("sign-up.msg.error"), {
          variant: "error",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
      })
      .finally(() => {
        updateOpenLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Loading open={openLoading} />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {t("sign-up.title")}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label={t("sign-up.fields.first-name")}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label={t("sign-up.fields.last-name")}
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label={t("sign-up.fields.email")}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label={t("sign-up.fields.password")}
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t("sign-up.sign-up-btn")}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={URL.SIGN_IN} variant="body2">
                {t("sign-up.sign-in-btn")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
