import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Avatar,
  ClickAwayListener,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { Page } from "../../components";
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
  const [showAvatars, setShowAvatars] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

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
          avatarUrl: avatarUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
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

  const avatars = [
    { alt: "1", src: "/images/avatars/avatar1.png" },
    { alt: "2", src: "/images/avatars/avatar2.png" },
    { alt: "3", src: "/images/avatars/avatar3.png" },
    { alt: "4", src: "/images/avatars/avatar4.png" },
    { alt: "5", src: "/images/avatars/avatar5.png" },
    { alt: "6", src: "/images/avatars/avatar6.png" },
    { alt: "7", src: "/images/avatars/avatar7.png" },
    { alt: "8", src: "/images/avatars/avatar8.png" },
    { alt: "9", src: "/images/avatars/avatar9.png" },
    { alt: "10", src: "/images/avatars/avatar10.png" },
  ];

  function handleShowAvatarsChange() {
    setShowAvatars(!showAvatars);
  }

  function handleAvatarChange(newAvatarUrl: string) {
    setAvatarUrl(newAvatarUrl);
    setShowAvatars(false);
  }

  return (
    <Page openLoading={openLoading} pageTitle={t("profile-setting.form-title")}>
      <Paper sx={{ my: { xs: 8 }, p: { xs: 2, md: 3 } }}>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          {
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ mt: -7 }}>
                  <Box
                    sx={{
                      p: 0,
                      border: "1px solid gray",
                      borderRadius: 4,
                      width: "100px",
                      height: "107px",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        width="100%"
                        onClick={handleShowAvatarsChange}
                      ></img>
                    ) : (
                      <AccountBoxIcon
                        sx={{ width: "100%" }}
                        onClick={handleShowAvatarsChange}
                      />
                    )}

                    {showAvatars && (
                      <ClickAwayListener onClickAway={handleShowAvatarsChange}>
                        <Paper
                          sx={{
                            position: "absolute",
                            display: "inline-block",
                            ml: 1,
                            py: 2,
                          }}
                        >
                          <Grid container spacing={0.5}>
                            {avatars.slice(0, 5).map((i) => (
                              <Grid item key={"avatars-r1-" + i.alt}>
                                <Avatar
                                  alt={i.alt}
                                  src={i.src}
                                  onClick={() => handleAvatarChange(i.src)}
                                />
                              </Grid>
                            ))}
                          </Grid>
                          <Grid container spacing={0.5}>
                            {avatars.slice(5, 10).map((i) => (
                              <Grid item key={"avatars-r2-" + i.alt}>
                                <Avatar
                                  alt={i.alt}
                                  src={i.src}
                                  onClick={() => handleAvatarChange(i.src)}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </Paper>
                      </ClickAwayListener>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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

                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
    </Page>
  );
}
