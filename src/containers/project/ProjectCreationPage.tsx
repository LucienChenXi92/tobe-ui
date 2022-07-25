import React, { useState } from "react";
import { Box, Grid, TextField, Button, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { Page } from "../../components";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAuthState } from "../../contexts";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { useNavigate } from "react-router-dom";
import { URL } from "../../routes";

export default function ProjectCreationPage() {
  const { t } = useTranslation();
  const [openLoading, setOpenLoading] = useState(false);
  const authState = useAuthState();
  const navigate = useNavigate();
  const { user } = authState;
  const { enqueueSnackbar } = useSnackbar();
  const [fromTime, setFromTime] = React.useState<Date | null>(null);
  const [toTime, setToTime] = React.useState<Date | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!validateForm(data)) {
      return;
    }
    createProject(data);
  };

  function validateForm(data: FormData): boolean {
    if (!data.get("projectName")) {
      warn(t("project-creation-page.msg.warning.name-empty"));
      return false;
    }
    if (!fromTime) {
      warn(t("project-creation-page.msg.warning.target-start-time-empty"));
      return false;
    }
    if (!toTime) {
      warn(t("project-creation-page.msg.warning.target-end-time-empty"));
      return false;
    }
    if (fromTime?.getTime() > toTime?.getTime()) {
      warn(
        t("project-creation-page.msg.warning.target-invalid-start-end-time")
      );
      return false;
    }

    return true;
  }

  function warn(msg: string): void {
    enqueueSnackbar(msg, {
      variant: "warning",
    });
  }

  function createProject(data: FormData): void {
    setOpenLoading(true);
    server
      .post(
        `${ROOT_URL}/${SERVER_URI.CREATE_PROJECT}`,
        {
          id: user.id,
          name: data.get("projectName"),
          description: data.get("description"),
          targetStartTime: fromTime,
          targetEndTime: toTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        enqueueSnackbar(t("project-creation-page.msg.success"), {
          variant: "success",
        });
        navigate(URL.PROJECTS, { replace: true });
      })
      .catch(() => {
        enqueueSnackbar(t("project-creation-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  return (
    <Page
      openLoading={openLoading}
      pageTitle={t("project-creation-page.form-title")}
    >
      <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="projectName"
                    name="projectName"
                    label={t("project-creation-page.fields.name")}
                    fullWidth
                    autoComplete="name"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={6}>
                  <DatePicker
                    disablePast={true}
                    label={t("project-creation-page.fields.target-start-time")}
                    value={fromTime}
                    onChange={(newValue) => setFromTime(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" fullWidth />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    disablePast={true}
                    label={t("project-creation-page.fields.target-end-time")}
                    value={toTime}
                    onChange={(newValue) => setToTime(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" fullWidth />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="description"
                    name="description"
                    label={t("project-creation-page.fields.description")}
                    fullWidth
                    autoComplete="description"
                    variant="standard"
                    multiline
                    maxRows={4}
                    minRows={4}
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          }

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => window.history.back()} sx={{ mt: 3, ml: 1 }}>
              {t("project-creation-page.back-btn")}
            </Button>
            <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
              {t("project-creation-page.submit-btn")}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Page>
  );
}
