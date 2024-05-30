import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { Page } from "../../../components";
import { PublicDataService } from "../../../services";
import { SubjectInfo } from "../../../global/types";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Link,
} from "@mui/material";
import { URL } from "../../../routes";
import { TimeFormat } from "../../../commons";

export default function SubjectListPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<SubjectInfo[]>([]);

  useEffect(() => {
    function load(): void {
      PublicDataService.getSubjects(1000, 0)
        .then((response) => {
          setSubjects(response.data.records || []);
        })
        .catch(() => {
          enqueueSnackbar(t("subjects-list-page.msg.error"), {
            variant: "error",
          });
        });
    }
    load();
  }, [t, enqueueSnackbar]);

  return (
    <Page
      openLoading={false}
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
              <CardActionArea>
                <CardMedia
                  sx={{
                    height: 140,
                    alignContent: "center",
                  }}
                  image={subject.coverImgUrl}
                  title={subject.name}
                >
                  <Typography
                    gutterBottom
                    variant="h4"
                    color={subject.coverImgUrl.length > 0 ? "white" : "primary"}
                    sx={{
                      width: "100%",
                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "center",
                    }}
                  >
                    {subject.name}
                  </Typography>
                </CardMedia>
                <CardContent sx={{ py: 1 }}>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      width: "100%",
                      height: "20px",
                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {subject.description}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      width: "100%",
                      height: "20px",
                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Link
                      href={URL.PERSONAL_PORTAL.replace(":id", subject.ownerId)}
                      underline="none"
                      target="blank"
                      color="text.secondary"
                    >
                      {subject.ownerName}
                    </Link>{" "}
                    · {TimeFormat.briefDateFormat(subject.publishTime)} ·{" "}
                    {t("home-page.view-count")} {subject.viewCount}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
