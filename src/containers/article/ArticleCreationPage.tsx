import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSnackbar } from "notistack";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { RichEditor } from "../../components";
import { URL } from "../../routes";

export default function ArticleCreationPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [htmlValue, setHtmlValue] = useState<string>("");
  const [textValue, setTextValue] = useState<string>("");
  const [expanded, setExpanded] = useState<string | false>(false);
  const [title, setTitle] = useState<String | null>("");
  const [subTitle, setSubTitle] = useState<String | null>("");
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

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
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            variant="outlined"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ textAlign: "end" }}
            >
              <Grid sx={{ flexGrow: 1 }}></Grid>
              <Typography
                color={"text.secondary"}
                variant={"body2"}
                sx={{ textAlign: "end", flexGrow: 0 }}
              >
                {t("article-creation-page.expand-label")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <FieldWrapper
                  label={t("article-creation-page.fields.sub-title")}
                  value={subTitle}
                  setValue={setSubTitle}
                />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} sx={{ my: 1 }}>
          <RichEditor
            htmlValue={htmlValue}
            textValue={textValue}
            setHtmlValue={setHtmlValue}
            setTextValue={setTextValue}
          />
        </Grid>
        <Grid item xs={12} sx={{ my: 1 }}>
          <Button onClick={() => createArticle()}>创建</Button>
        </Grid>
      </Grid>
    </Page>
  );
}

const FieldWrapper = (props: {
  label: string;
  value: any;
  setValue: (v: any) => void;
}) => {
  return (
    <Grid container item xs={12}>
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
          {props.label}
        </Typography>
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        <TextField
          fullWidth
          variant="standard"
          value={props.value}
          onChange={(v) => props.setValue(v.target.value)}
        />
      </Grid>
    </Grid>
  );
};
