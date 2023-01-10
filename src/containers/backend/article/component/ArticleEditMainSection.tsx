import { useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  RichEditor,
  TobeAccordion,
  TobeAccordionDetails,
  TobeAccordionSummary,
  MultipleTagSelecter,
} from "../../../../components";
import { FieldWrapper } from "./FieldWrapper";
import { TagOption } from "../../../../global/types";

export interface ArticleEditMainSectionProps {
  title: string;
  setTitle: (value: string) => void;
  subTitle: string;
  setSubTitle: (value: string) => void;
  tagValues: TagOption[];
  setTagValues: (value: TagOption[]) => void;
  htmlValue: string;
  setHtmlValue: (value: string) => void;
  textValue: string;
  setTextValue: (value: string) => void;
  onClickPrimaryBtn: () => void;
}

export default function ArticleEditMainSection(
  props: ArticleEditMainSectionProps
) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <Grid container sx={{ py: 2 }}>
      <Grid item xs={12}>
        <Paper sx={{ width: "100%", py: 2, px: 2 }} variant="outlined">
          <Grid container item xs={12}>
            <FieldWrapper
              label={t("article-creation-page.fields.title")}
              value={props.title}
              setValue={props.setTitle}
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
                value={props.subTitle}
                setValue={props.setSubTitle}
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
                    {t("article-creation-page.fields.tag")}
                  </Typography>
                </Grid>
                <Grid item sx={{ flexGrow: 1 }}>
                  <MultipleTagSelecter
                    value={props.tagValues}
                    setValue={props.setTagValues}
                  />
                </Grid>
              </Grid>
            </Grid>
          </TobeAccordionDetails>
        </TobeAccordion>
      </Grid>
      <Grid item xs={12} sx={{ my: 1 }}>
        <RichEditor
          htmlValue={props.htmlValue}
          textValue={props.textValue}
          setHtmlValue={props.setHtmlValue}
          setTextValue={props.setTextValue}
        />
      </Grid>
      <Grid container item xs={12} sx={{ my: 1, justifyContent: "flex-end" }}>
        <Button onClick={() => window.history.back()}>
          {t("article-creation-page.back-btn")}
        </Button>
        <Button
          color="primary"
          onClick={props.onClickPrimaryBtn}
          variant="contained"
        >
          {t("article-creation-page.submit-btn")}
        </Button>
      </Grid>
    </Grid>
  );
}
