import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "../../../components";
import { TimeFormat } from "../../../commons";
import {
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
  ButtonGroup,
} from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import SearchIcon from "@mui/icons-material/Search";
// import moment from "moment-timezone";

export default function TimeConverter() {
  const { t } = useTranslation();
  let [timestamp, setTimestamp] = useState<string>("");
  let [timestring, setTimestring] = useState<string>("");
  let [current, setCurrent] = useState<number>(
    Math.floor(new Date().getTime() / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(Math.floor(new Date().getTime() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Page
      openLoading={false}
      pageTitle={t("tools-time-converter.page-main-title")}
    >
      <Grid sx={{ mt: 1, p: 1 }}>
        <Grid container sx={{ my: 1 }}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ alignSelf: "center", mr: 1 }}
          >
            <b>
              {t("tools-time-converter.curent-timestamp")}: {current}{" "}
              {t("tools-time-converter.tip")}
            </b>
          </Typography>
          <Button
            onClick={() => {
              setTimestamp(current.toString());
              setTimestring(TimeFormat.dateAndTimeFormat(current * 1000));
            }}
          >
            <SearchIcon color="secondary" />
          </Button>
        </Grid>
        <Paper variant="outlined" sx={{ my: 1, p: 2 }}>
          <ConvertPanel
            timestamp={timestamp}
            setTimestamp={setTimestamp}
            timestring={timestring}
            setTimestring={setTimestring}
          />
        </Paper>
      </Grid>
    </Page>
  );
}

const ConvertPanel = (props: {
  timestamp: string;
  setTimestamp: Function;
  timestring: string;
  setTimestring: Function;
}) => {
  const { t } = useTranslation();
  const ConvertButtonGroup = () => {
    return (
      <ButtonGroup variant="text">
        <Button>
          <ArrowLeft onClick={convertTimestamp2TimeString} color="secondary" />
        </Button>
        <Button>
          <ArrowRight onClick={convertTimeString2Timestamp} color="secondary" />
        </Button>
      </ButtonGroup>
    );
  };

  function convertTimestamp2TimeString() {
    props.setTimestring(
      TimeFormat.dateAndTimeFormat(Number.parseInt(props.timestamp) * 1000)
    );
  }

  function convertTimeString2Timestamp() {
    props.setTimestamp(TimeFormat.timestamp(props.timestring).toString());
  }

  function handleStringChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.setTimestamp("");
    props.setTimestring(event.target.value);
  }

  function handleStampChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.setTimestring("");
    props.setTimestamp(event.target.value);
  }

  return (
    <Grid container>
      <Grid item flexGrow={1}>
        <TextField
          label={t("tools-time-converter.time-label")}
          variant="outlined"
          fullWidth
          value={props.timestring}
          helperText={
            t("tools-time-converter.time-input-helper") +
            ", eg: 2023-01-01 (00:00:00)"
          }
          onChange={handleStringChange}
          color="secondary"
        />
      </Grid>
      <Grid
        item
        flexGrow={1}
        sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "center" }}
      >
        <ConvertButtonGroup />
      </Grid>
      <Grid
        item
        sx={{
          display: { xs: "flex", sm: "none" },
          justifyContent: "center",
          width: { xs: "100%" },
          my: 2,
        }}
      >
        <ConvertButtonGroup />
      </Grid>
      <Grid item flexGrow={1}>
        <TextField
          label={t("tools-time-converter.timestamp-label")}
          variant="outlined"
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={props.timestamp}
          helperText={
            t("tools-time-converter.timestamp-input-helper") +
            ", eg: 1672502400"
          }
          onChange={handleStampChange}
          color="secondary"
        />
      </Grid>
    </Grid>
  );
};
