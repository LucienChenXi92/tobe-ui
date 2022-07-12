import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Grid,
  Button,
  Typography,
  TextField,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";
import { Loading } from "../../components";
import { URL } from "../../routes";
import { server, ROOT_URL, SERVER_URI } from "../../servers";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [openLoading, updateOpenLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!validateForm(data)) {
      return;
    }
    createUser(data);
  };

  function createUser(data: FormData): void {
    updateOpenLoading(true);
    server
      .post(
        `${ROOT_URL}${SERVER_URI.CREATE_USER}`,
        {
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          password: data.get("password"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        enqueueSnackbar(t("sign-up.msg.success"), {
          variant: "success",
        });
        navigate(URL.SIGN_IN, { replace: true });
      })
      .catch(() => {
        enqueueSnackbar(t("sign-up.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => {
        updateOpenLoading(false);
      });
  }

  function validateForm(data: FormData): boolean {
    // validate email template
    const emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (!emailReg.test(data.get("email")?.toString() || "")) {
      warn("sign-up.msg.warning.invalid-email-format");
      return false;
    }
    // validate the two password
    if (
      data.get("password")?.toString() !==
      data.get("password-confirm")?.toString()
    ) {
      warn("sign-up.msg.warning.two-password-dismatch");
      return false;
    }
    // validate password length
    let passwordLength = data.get("password")?.toString().length || 0;
    if (passwordLength < 6 || passwordLength > 64) {
      warn("sign-up.msg.warning.invalid-password-length");
      return false;
    }
    return true;
  }

  function warn(warningMsg: string): void {
    enqueueSnackbar(t(warningMsg), {
      variant: "warning",
    });
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Loading open={openLoading} />
      <Paper
        variant="outlined"
        sx={{
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          {t("sign-up.title")}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label={t("sign-up.fields.first-name")}
                autoFocus
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label={t("sign-up.fields.last-name")}
                name="lastName"
                autoComplete="family-name"
                variant="standard"
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
                variant="standard"
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
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password-confirm"
                label={t("sign-up.fields.password-confirm")}
                type="password"
                id="password-confirm"
                autoComplete="new-password"
                variant="standard"
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
      </Paper>
    </Container>
  );
}
