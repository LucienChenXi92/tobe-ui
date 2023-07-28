import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { PublicDataService } from "../../../services";
import {
  SubjectInfoGeneralDTO,
  TagRelationshipGeneralDTO,
  NewsDTO,
} from "../../../global/types";
import { useParams } from "react-router-dom";
import { Paper, Typography, Grid, Link, SxProps } from "@mui/material";
import { AuthorDisplayPanel, TobeBreadcrumbs, Page } from "../../../components";
import { TimeFormat } from "../../../commons";
import { URL } from "../../../routes";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

export default function SubjectReadingPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [subject, setSubject] = useState<SubjectInfoGeneralDTO>();
  const { subjectId } = useParams();

  const Section = (props: { text: string; variant: SectionVariant }) => {
    return (
      <Grid item xs={12}>
        <Typography color={"textSecondary"} sx={props.variant.sx}>
          {props.text}
        </Typography>
      </Grid>
    );
  };

  const ArticleLink = (props: { text: string; href: string }) => {
    return (
      <Grid item xs={12} sx={{ mt: 1 }}>
        <Link href={props.href} underline="hover" color={"info.main"}>
          <ArticleOutlinedIcon sx={{ width: "1rem", height: "1rem" }} />{" "}
          {props.text}
        </Link>
      </Grid>
    );
  };

  const ToBeContinuedTip = () => {
    return (
      <Grid item xs={12}>
        <Typography color={"textSecondary"}>
          {t("subject-reading-page.tip.tba")}
        </Typography>
      </Grid>
    );
  };

  function printSubjectTree(subject: SubjectInfoGeneralDTO | undefined) {
    if (!subject) {
      return (
        <Typography color="textSecondary">
          {t("subject-reading-page.tip.tba")}
        </Typography>
      );
    }
    const result: JSX.Element[] = [];
    const deepth: number = getDepthOfTree(subject.tagTree);
    convertTreeToList(
      subject.tagTree,
      0,
      result,
      sectionVariants.slice(0, deepth).reverse(),
      subject.id,
      subject.name
    );
    return (
      <Grid container flexDirection="row">
        {result}
      </Grid>
    );
  }

  function convertTreeToList(
    treeNodes: TagRelationshipGeneralDTO[],
    depth: number,
    elements: JSX.Element[],
    sectionVariants: SectionVariant[],
    subjectId: string,
    subjectName: string
  ): void {
    if (!treeNodes || treeNodes.length === 0) {
      return;
    } else {
      treeNodes?.forEach((n: TagRelationshipGeneralDTO) => {
        elements.push(
          <Section text={n.label} variant={sectionVariants[depth]} key={n.id} />
        );
        let articles: JSX.Element[] = [];
        n.relatedArticles.forEach((a: NewsDTO) => {
          articles.push(
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <ArticleLink
                key={a.id}
                text={a.title}
                href={
                  URL.NEWS_ARTICLE_DETAIL.replace(":articleId", a.id) +
                  `?subjectId=${subjectId}&subjectName=${subjectName}`
                }
              />
            </Grid>
          );
        });
        if (articles && articles.length > 0) {
          elements.push(<Grid container flexDirection="row">{articles}</Grid>)
        }

        if (n.children.length === 0 && n.relatedArticles.length === 0) {
          elements.push(<ToBeContinuedTip />);
        }
        convertTreeToList(
          n.children,
          depth + 1,
          elements,
          sectionVariants,
          subjectId,
          subjectName
        );
      });
    }
  }

  function getDepthOfTree(treeNodes: TagRelationshipGeneralDTO[]): number {
    if (!treeNodes || treeNodes.length === 0) {
      return 0;
    } else {
      let result = 1;
      treeNodes?.forEach((n: TagRelationshipGeneralDTO) => {
        let temp = 1 + getDepthOfTree(n.children);
        if (temp >= result) {
          result = temp;
        }
      });
      return result;
    }
  }

  useEffect(() => {
    function load(): void {
      setOpenLoading(true);
      PublicDataService.getSubjectById(subjectId || "")
        .then((response) => {
          setSubject(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t("subjects-reading-page.msg.error"), {
            variant: "error",
          });
        })
        .finally(() => setOpenLoading(false));
    }
    load();
  }, [t, enqueueSnackbar]);

  return (
    <Page openLoading={openLoading} pageTitle={subject?.name}>
      <TobeBreadcrumbs
        nodes={[{ label: t("breadcrumbs.subjects"), href: URL.SUBJECTS_PAGE }]}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={9}>
          <Paper sx={{ py: 2, px: 2 }} variant="outlined">
            {subject && (
              <Grid container>
                <Grid item container xs={12} sx={{ my: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flexGrow: 1 }}
                  >
                    {subject.ownerName} ·{" "}
                    {TimeFormat.dateAndTimeFormat(subject.publishTime)} ·{" "}
                    {t("article-reading-page.view")} {subject.viewCount}
                  </Typography>
                </Grid>
                {printSubjectTree(subject)}
              </Grid>
            )}
          </Paper>
        </Grid>

        <Grid item sm={12} md={3}>
          {subject?.ownerId && <AuthorDisplayPanel userId={subject?.ownerId} />}
        </Grid>
      </Grid>
    </Page>
  );
}
interface SectionVariant {
  sx: SxProps;
}

const sectionVariants: SectionVariant[] = [
  {
    sx: {
      mt: 1,
      mb: 1,
      color: "textSecondary",
      fontWeight: 600,
      fontSize: "1rem",
    },
  },
  {
    sx: {
      mt: 2,
      mb: 2,
      color: "primary",
      fontWeight: 600,
      fontSize: "1.25rem",
      borderBottom: "1px solid #e7e7e7",
    },
  },
  {
    sx: {
      mt: 2,
      mb: 3,
      color: "primary",
      fontWeight: 500,
      fontSize: "1.25rem",
      borderBottom: "1px solid #e7e7e7",
    },
  },
  {
    sx: {
      mt: 6,
      mb: 3,
      color: "primary",
      fontWeight: 600,
      fontSize: "1.25rem",
      borderBottom: "1px solid #e7e7e7",
    },
  },
];
