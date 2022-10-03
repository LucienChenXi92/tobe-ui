import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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
            <AccordionSummary expandIcon={<KeyboardArrowRightIcon />}>
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

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<KeyboardArrowRightIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1) + "!important",
  },
}));
