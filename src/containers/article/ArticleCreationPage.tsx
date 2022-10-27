import { useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
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
  MultipleTagSelecter,
} from "../../components";
import { FieldWrapper } from "./component/FieldWrapper";
import { URL } from "../../routes";
import { TagOption } from "../../global/types";

export default function ArticleCreationPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [htmlValue, setHtmlValue] = useState<string>("");
  const [textValue, setTextValue] = useState<string>("");
  const [expanded, setExpanded] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [tagValues, setTagValues] = useState<TagOption[]>([]);

  function createArticle(): void {
    setOpenLoading(true);
    server
      .post(
        `${ROOT_URL}/${SERVER_URI.CREATE_ARTICLE}`,
        {
          title: title,
          subTitle: subTitle,
          content: htmlValue,
          description: textValue.trim().substring(0, 100),
          tags: tagValues,
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
                maxLength={32}
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
                  maxLength={100}
                />
                <Grid container item xs={12} sx={{ mt: 1 }}>
                  <Grid
                    item
                    sx={{
                      flexGrow: 0,
                      alignSelf: "end",
                      textAlign: "end",
                      pr: 1,
                    }}
                    xs={3}
                    sm={2}
                    md={1}
                  >
                    <Typography variant="subtitle1" color="text.secondary">
                      {"标签"}
                    </Typography>
                  </Grid>
                  <Grid item sx={{ flexGrow: 1 }}>
                    <MultipleTagSelecter
                      value={tagValues}
                      setValue={setTagValues}
                    />
                  </Grid>
                </Grid>
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
            onClick={() => createArticle()}
            variant="contained"
          >
            {t("article-creation-page.submit-btn")}
          </Button>
        </Grid>
      </Grid>
    </Page>
  );
}
