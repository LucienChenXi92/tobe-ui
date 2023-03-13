import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { Page } from "../../../components";
import { PublicDataService } from "../../../services";
import { SubjectInfo } from "../../../global/types";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

export default function SubjectListPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<SubjectInfo[]>([]);

  useEffect(() => {
    function load(): void {
      setOpenLoading(true);
      PublicDataService.getSubjects(1000, 0)
        .then((response) => {
          setSubjects(response.data.records || []);
        })
        .catch(() => {
          enqueueSnackbar(t("subjects-list-page.msg.error"), {
            variant: "error",
          });
        })
        .finally(() => setOpenLoading(false));
    }
    load();
  }, [t, enqueueSnackbar]);

  return (
    <Page
      openLoading={openLoading}
      pageTitle={t("subjects-list-page.page-main-title")}
    >
      <Grid
        container
        spacing={1}
        sx={{
          pt: 2,
        }}
      >
        {subjects.map((subject: SubjectInfo) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={subject.id}
            sx={{
              cursor: "pointer",
            }}
          >
            <Card
              variant="outlined"
              onClick={() => navigate(`/subjects/${subject.id}`)}
            >
              <CardMedia
                sx={{ height: 140 }}
                image={subject.coverImgUrl}
                title={subject.name}
              />
              <CardContent sx={{ py: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  color="text.secondary"
                  component="div"
                >
                  {subject.name}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  {subject.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
