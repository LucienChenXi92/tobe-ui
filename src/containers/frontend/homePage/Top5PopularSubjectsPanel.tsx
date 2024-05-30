import { useState, useEffect } from "react";
import { Grid, Typography, Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SubjectInfo } from "../../../global/types";
import { SidePanel } from "../../../components";
import { PublicDataService } from "../../../services";
import { URL } from "../../../routes";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function Top5PopularSubjectsPanel() {
  const { t } = useTranslation();
  const [subjects, setSubjects] = useState<SubjectInfo[]>([]);
  const navigate = useNavigate();

  const iconColors = ["#ffaf00", "#d5d2d2", "#dd9b40", "#bc4f2a", "#bc4f2a"];

  useEffect(() => {
    function loadSubjects(): void {
      PublicDataService.getTop5PopularSubjects()
        .then((response) => {
          setSubjects(response.data);
        })
        .catch(() => {});
    }
    loadSubjects();
  }, []);

  return subjects.length > 0 ? (
    <SidePanel
      title={t("home-page.top5-popular-subjects")}
      readMoreUrl={URL.SUBJECTS_PAGE}
    >
      {subjects.map((n, i) => (
        <Grid container item key={n.id} sx={{ px: 2 }}>
          <Grid
            container
            item
            xs={12}
            alignItems="center"
            justifyContent="center"
            sx={{
              px: 2,
              cursor: "pointer",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
            }}
            onClick={() =>
              navigate(URL.SUBJECT_READING_PAGE.replace(":id", n.id))
            }
          >
            <Avatar
              alt={i + 1 + ""}
              sx={{
                flexGrow: 0,
                mr: 4,
                my: 0.5,
                backgroundColor: "transparent",
              }}
            >
              <EmojiEventsIcon sx={{ color: iconColors[i] }} />
            </Avatar>
            <Typography
              color="text.secondary"
              sx={{
                flexGrow: 1,
                fontSize: "0.875rem",
                fontWeight: 400,
                lineHeight: 1.43,
              }}
            >
              {n.name}
            </Typography>
          </Grid>
        </Grid>
      ))}
      <Grid container sx={{ pb: 1 }} />
    </SidePanel>
  ) : (
    <></>
  );
}
