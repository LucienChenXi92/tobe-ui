import { useState, useEffect } from "react";
import { Grid, Typography, Paper, Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UserBriefProfileDTO } from "../../global/types";
import { server, ROOT_URL, SERVER_URI } from "../../servers";

export default function Top5ActiveUsersPanel() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<UserBriefProfileDTO[]>([]);

  useEffect(() => loadUsers(), []);

  function loadUsers(): void {
    server
      .get(`${ROOT_URL}/${SERVER_URI.GET_NEWS_TOP_5_ACTIVE_USERS}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch(() => {});
  }

  return userData.length > 0 ? (
    <Grid container component={Paper} sx={{ p: 0 }} variant="outlined">
      <Grid
        item
        xs={12}
        sx={{
          px: 2,
          py: 1.5,
          mb: 1,
          borderBottom: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <Typography color="text.secondary" variant="subtitle1">
          {t("home-page.top5-active-users")}
        </Typography>
      </Grid>
      {userData.map((n) => (
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          sx={{ px: 2 }}
          key={n.id}
        >
          <Avatar
            alt={n.firstName}
            src={n.avatarUrl}
            sx={{ flexGrow: 0, mb: 1, mr: 2, width: "30px", height: "30px" }}
          />
          <Typography
            color="text.secondary"
            variant="subtitle1"
            sx={{ flexGrow: 1 }}
          >
            {n.firstName + " " + n.lastName}
          </Typography>
        </Grid>
      ))}
    </Grid>
  ) : (
    <></>
  );
}
