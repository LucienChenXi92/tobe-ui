import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { Loading } from "../../components";
import { useAuthState, useAuthDispatch } from "../../contexts";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { LOCAL_STORAGE_KEYS } from "../../commons";

export default function ProfileSettingPage() {
  const { t } = useTranslation();
  const [openLoading, setOpenLoading] = useState(false);
  const authState = useAuthState();
  const { user } = authState;
  const dispatch = useAuthDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    updateUser(data);
  };

  function updateUser(data: FormData): void {
    setOpenLoading(true);
    server
      .put(
        `${ROOT_URL}/${SERVER_URI.UPDATE_USER}/${user.id}`,
        {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: data.get("firstName")?.toString(),
          lastName: data.get("lastName")?.toString(),
          phoneNum: data.get("phoneNum")?.toString(),
          address: data.get("address")?.toString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        dispatch({ type: "REQUEST_SUCCESS", payload: response.data });
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.CURRENT_USER,
          JSON.stringify(response.data)
        );
        enqueueSnackbar(t("profile-setting.msg.success"), {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar(t("profile-setting.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Loading open={openLoading} />
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          {t("profile-setting.form-title")}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label={t("profile-setting.fields.first-name")}
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    defaultValue={user.firstName || ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label={t("profile-setting.fields.last-name")}
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    defaultValue={user.lastName || ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled
                    InputLabelProps={{ shrink: true }}
                    id="email"
                    name="email"
                    label={t("profile-setting.fields.email")}
                    fullWidth
                    type="email"
                    autoComplete="email"
                    variant="standard"
                    defaultValue={user.email || ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="phoneNum"
                    name="phoneNum"
                    label={t("profile-setting.fields.phone-number")}
                    fullWidth
                    autoComplete="phone number"
                    variant="standard"
                    defaultValue={user.phoneNum || ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address"
                    name="address"
                    label={t("profile-setting.fields.address")}
                    fullWidth
                    autoComplete="address"
                    variant="standard"
                    defaultValue={user.address || ""}
                    multiline
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          }

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => window.history.back()} sx={{ mt: 3, ml: 1 }}>
              {t("profile-setting.back-btn")}
            </Button>
            <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
              {t("profile-setting.submit-btn")}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
