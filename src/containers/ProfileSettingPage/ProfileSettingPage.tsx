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
import { Loading } from "../../components";
import { useTranslation } from "react-i18next";
import { useAuthState, useAuthDispatch, updateProfile } from "../../contexts";
import { useSnackbar } from "notistack";

export default function ProfileSettingPage() {
  const { t } = useTranslation();
  const [openLoading, setOpenLoading] = useState(false);
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = authState;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setOpenLoading(true);
    updateProfile(authDispatch, {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: data.get("firstName")?.toString(),
      lastName: data.get("lastName")?.toString(),
      phoneNum: data.get("phoneNum")?.toString(),
      address: data.get("address")?.toString(),
    })
      .then(() =>
        enqueueSnackbar(t("profile-setting.msg.success"), {
          variant: "success",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        })
      )
      .catch(() => {
        enqueueSnackbar(t("profile-setting.msg.error"), {
          variant: "error",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
      })
      .finally(() => setOpenLoading(false));
  };

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
