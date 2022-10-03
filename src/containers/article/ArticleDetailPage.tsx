import { useEffect, useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import {
  RichEditor,
  TobeAccordion,
  TobeAccordionDetails,
  TobeAccordionSummary,
} from "../../components";
import { FieldWrapper } from "./component/FieldWrapper";
import { URL } from "../../routes";

interface ArticleDetailPageProp {
  viewOnly: boolean;
}

export default function ArticleDetailPage(props: ArticleDetailPageProp) {
  const { t } = useTranslation();
  const { articleId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [htmlValue, setHtmlValue] = useState<string>("");
  const [textValue, setTextValue] = useState<string>("");
  const [expanded, setExpanded] = useState<boolean>(true);
  const [title, setTitle] = useState<String | null>("");
  const [subTitle, setSubTitle] = useState<String | null>("");

  useEffect(() => loadArticle(), []);

  function loadArticle(): void {
    setOpenLoading(true);
    server
      .get(`${ROOT_URL}/${SERVER_URI.GET_ARTICLES}/${articleId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setHtmlValue(response.data.content);
        setTitle(response.data.title);
        setSubTitle(response.data.subTitle);
      })
      .catch(() => {
        enqueueSnackbar(t("article-creation-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  function saveArticle(): void {
    setOpenLoading(true);
    server
      .put(
        `${ROOT_URL}/${SERVER_URI.UPDATE_ARTICLE}/${articleId}`,
        {
          id: articleId,
          title,
          subTitle,
          content: htmlValue,
          description: textValue.trim().substring(0, 100),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        enqueueSnackbar(t("article-creation-page.msg.success"), {
          variant: "success",
        });
        navigate(URL.ARTICLES);
      })
      .catch(() => {
        enqueueSnackbar(t("article-creation-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  return (
    <Page
      openLoading={openLoading}
      pageTitle={t("article-creation-page.page-main-title")}
    >
      <Grid container sx={{ py: 2 }}>
        <Grid item xs={12}>
          <Paper sx={{ width: "100%", py: 2, px: 2 }} variant="outlined">
            <Grid container item xs={12}>
              <FieldWrapper
                label={t("article-creation-page.fields.title")}
                value={title}
                setValue={setTitle}
              />
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{ my: 1 }}>
          <TobeAccordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            variant="outlined"
          >
            <TobeAccordionSummary>
              <Typography
                color={"text.secondary"}
                variant={"body2"}
                sx={{ textAlign: "end", flexGrow: 0 }}
              >
                {t("article-creation-page.expand-label")}
              </Typography>
            </TobeAccordionSummary>
            <TobeAccordionDetails>
              <Grid container>
                <FieldWrapper
                  label={t("article-creation-page.fields.sub-title")}
                  value={subTitle}
                  setValue={setSubTitle}
                />
              </Grid>
            </TobeAccordionDetails>
          </TobeAccordion>
        </Grid>
        <Grid item xs={12} sx={{ my: 1 }}>
          <RichEditor
            htmlValue={htmlValue}
            textValue={textValue}
            setHtmlValue={setHtmlValue}
            setTextValue={setTextValue}
          />
        </Grid>
        <Grid container item xs={12} sx={{ my: 1, justifyContent: "flex-end" }}>
          <Button onClick={() => window.history.back()}>
            {t("article-creation-page.back-btn")}
          </Button>
          <Button
            color="primary"
            onClick={() => saveArticle()}
            variant="contained"
          >
            {t("article-creation-page.submit-btn")}
          </Button>
        </Grid>
      </Grid>
    </Page>
  );
}
