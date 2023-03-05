import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "../../../components";
import { Box, Button, Paper, TextField, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../routes";
import { CollectionService } from "../../../services";

export default function TagCollectionCreationPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("collectionName")) {
      enqueueSnackbar(t("project-creation-page.msg.warning.name-empty"), {
        variant: "warning",
      });
      return;
    }
    handleCreation(data);
  };

  function handleCreation(data: FormData): void {
    setOpenLoading(true);
    CollectionService.create({
      name: data.get("collectionName")?.toString() || "",
      description: data.get("description")?.toString() || "",
      coverImgUrl: data.get("coverImgUrl")?.toString() || "",
    })
      .then((response) => {
        enqueueSnackbar(t("collection-creation-page.msg.success"), {
          variant: "success",
        });
        navigate(URL.COLLECTIONS);
      })
      .catch(() => {
        enqueueSnackbar(t("collection-creation-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  return (
    <Page
      openLoading={openLoading}
      pageTitle={t("collection-creation-page.page-main-title")}
    >
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="collectionName"
                name="collectionName"
                label={t("collection-creation-page.fields.name")}
                fullWidth
                autoComplete="name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="coverImgUrl"
                name="coverImgUrl"
                label={t("collection-creation-page.fields.cover-img-url")}
                fullWidth
                autoComplete="coverImgUrl"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                label={t("collection-creation-page.fields.description")}
                fullWidth
                autoComplete="description"
                variant="standard"
                multiline
                maxRows={2}
                minRows={2}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => window.history.back()} sx={{ mt: 3, ml: 1 }}>
              {t("collection-creation-page.back-btn")}
            </Button>
            <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
              {t("collection-creation-page.submit-btn")}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Page>
  );
}
