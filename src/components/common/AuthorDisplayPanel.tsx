import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { Avatar, Grid, Link, Paper, Typography } from "@mui/material";
import { server, ROOT_URL, SERVER_URI } from "../../servers";

interface UserBriefProfileDTO {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  blog: string;
  introduction: string;
}

export default function AuthorDisplayPanel(props: { userId: string }) {
  const { t } = useTranslation();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [profile, setProfile] = useState<UserBriefProfileDTO | null>(null);

  useEffect(() => loadProfile(), []);

  function loadProfile(): void {
    setOpenLoading(true);
    server
      .get(`${ROOT_URL}/${SERVER_URI.GET_USER_BRIEF_PROFILE}/${props.userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setProfile(response.data);
      })
      .catch(() => {
        enqueueSnackbar(t("article-reading-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }
  return (
    <Paper sx={{ p: 0 }} variant="outlined">
      <Grid container>
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignContent="center"
          direction="column"
          sx={{ background: "secondary" }}
        >
          <Avatar
            alt={profile?.firstName}
            src={profile?.avatarUrl}
            sx={{ width: 60, height: 60, margin: "0 auto" }}
          ></Avatar>
          <Typography variant="h6" color="text.secondary">
            {profile?.firstName + " " + profile?.lastName}
          </Typography>
        </Grid>
        {profile?.blog && (
          <Grid item xs={12} sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Blog:{" "}
              <Link href={profile?.blog} target="_blank" color="text.secondary">
                {profile?.blog}
              </Link>
            </Typography>
          </Grid>
        )}
        {profile?.blog && (
          <Grid item xs={12} sx={{ px: 2, py: 1 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ whiteSpace: "pre-wrap" }}
            >
              {profile?.introduction}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
