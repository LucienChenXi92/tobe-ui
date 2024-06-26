import { useState, useEffect, useCallback } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { OverviewService } from "../../../services";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerifiedIcon from "@mui/icons-material/Verified";
import StorageIcon from "@mui/icons-material/Storage";
import { Page } from "../../../components";
import { URL } from "../../../routes";
import { Domain, BaseInfoOverview } from "../../../global/types";
import { FEATURE_CODE, enabled } from "../../../commons";

export default function StatisticsPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [projectData, setProjectData] = useState<BaseInfoOverview>({
    totalNum: 0,
    publicNum: 0,
    totalViewCount: 0,
  });
  const [articleData, setArticleData] = useState<BaseInfoOverview>({
    totalNum: 0,
    publicNum: 0,
    totalViewCount: 0,
  });
  const [vocabularyData, setVocabularyData] = useState<BaseInfoOverview>({
    totalNum: 0,
    publicNum: 0,
    totalViewCount: 0,
  });
  const loadOverview = useCallback(
    (domain: Domain, setData: (any: any) => void): void => {
      OverviewService.getOverviewData(domain)
        .then((response) => {
          setData(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t("statistics-page.msg.error"), {
            variant: "error",
          });
        });
    },
    [enqueueSnackbar, t]
  );
  const loadData = useCallback((): void => {
    loadOverview(Domain.Project, setProjectData);
    loadOverview(Domain.Article, setArticleData);
    loadOverview(Domain.Vocabulary, setVocabularyData);
  }, [loadOverview]);

  useEffect(() => loadData(), [loadData]);

  return (
    <Page openLoading={false} pageTitle={t("statistics-page.page-main-title")}>
      <Grid container spacing={1}>
        {enabled(FEATURE_CODE.projectModule) && (
          <StatisticsDomainPanel
            domain={Domain.Project}
            data={projectData}
            link={URL.PROJECTS}
          />
        )}
        {enabled(FEATURE_CODE.articleModule) && (
          <StatisticsDomainPanel
            domain={Domain.Article}
            data={articleData}
            link={URL.ARTICLES}
          />
        )}
        {enabled(FEATURE_CODE.vocabularyModule) && (
          <StatisticsDomainPanel
            domain={Domain.Vocabulary}
            data={vocabularyData}
            link={URL.VOCABULARIES}
          />
        )}
      </Grid>
    </Page>
  );
}

const StandardSmallWidget = (props: {
  value: number | string;
  label: string;
  link: string;
  icon: any;
}) => {
  return (
    <Grid item container xs={4} sx={{ px: 3, py: 2 }}>
      <Grid item flexGrow={0} sx={{ mr: 1 }}>
        <Typography variant="subtitle2" flexGrow={1} color="text.secondary">
          {props.icon}
        </Typography>
      </Grid>
      <Grid item flexGrow={1}>
        <Typography variant="subtitle2" flexGrow={1} color="text.secondary">
          {props.label}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" color="text.secondary">
          {props.value}
        </Typography>
      </Grid>
    </Grid>
  );
};

const StatisticsDomainPanel = (props: {
  data: BaseInfoOverview;
  link: string;
  domain: Domain;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Grid container item xs={12} md={6}>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            mb: 0,
            cursor: "pointer",
            ":hover": { fontWeight: 600 },
          }}
          onClick={() => navigate(props.link)}
        >
          {t("statistics-page.domain.title." + props.domain.toLowerCase())}
        </Typography>
      </Grid>
      <Grid
        container
        component={Paper}
        onClick={() => navigate(props.link)}
        variant="outlined"
      >
        <StandardSmallWidget
          value={props.data.publicNum}
          label={t("statistics-page.domain.public")}
          link={props.link}
          icon={<VerifiedIcon color="info" sx={{ fontSize: 20 }} />}
        />
        <StandardSmallWidget
          value={props.data.totalNum}
          label={t("statistics-page.domain.all")}
          link={props.link}
          icon={<StorageIcon color="disabled" sx={{ fontSize: 20 }} />}
        />
        <StandardSmallWidget
          value={(props.data.totalViewCount / 1000).toFixed(1)}
          label={t("statistics-page.domain.view-count")}
          link={props.link}
          icon={<VisibilityIcon color="success" sx={{ fontSize: 20 }} />}
        />
      </Grid>
    </Grid>
  );
};
