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
import WorldMap from "react-svg-worldmap";
import moment from "moment-timezone";

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
          <WorldMapPanel timestamp={timestamp} />
        </Paper>
      </Grid>
    </Page>
  );
}

const WorldMapPanel = (props: { timestamp: string }) => {
  const data = [
    {
      country: "cn",
      value: 8,
    }, // china
    { country: "in", value: 5.5 }, // india
    { country: "us", value: -4 }, // united states
    { country: "id", value: 7 }, // indonesia
    { country: "pk", value: 5 }, // pakistan
    { country: "br", value: -3 }, // brazil
    { country: "bd", value: 6 }, // bangladesh
    { country: "ru", value: 3 }, // russia
    { country: "mx", value: -6 }, // mexico
    { country: "fr", value: 2 }, // france
    { country: "uk", value: 1 }, // british
    { country: "jp", value: 9 }, // japan
    { country: "au", value: 10 }, //austrilia
    { country: "eg", value: 3 }, //austrilia
  ];

  return (
    <WorldMap
      color="#e65100"
      size="responsive"
      data={data}
      tooltipTextFunction={(cc) =>
        cc.countryName +
        ": " +
        moment(Number.parseInt(props.timestamp) * 1000)
          .tz(moment.tz.zonesForCountry(cc.countryCode)[0])
          .format("yyyy-MM-DD hh:mm a(z)")
      }
    />
  );
};

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
          <ArrowLeft onClick={convertTimeString2Timestamp} color="secondary" />
        </Button>
        <Button>
          <ArrowRight onClick={convertTimestamp2TimeString} color="secondary" />
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
          label={t("tools-time-converter.timestamp-label")}
          variant="outlined"
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={props.timestamp}
          helperText={
            t("tools-time-converter.timestamp-input-helper") +
            ", eg: 1672502400"
          }
          focused
          onChange={handleStampChange}
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
          label={t("tools-time-converter.time-label")}
          variant="outlined"
          fullWidth
          value={props.timestring}
          helperText={
            t("tools-time-converter.time-input-helper") +
            ", eg: 2023-01-01 (00:00:00)"
          }
          focused
          onChange={handleStringChange}
          color="secondary"
        />
      </Grid>
    </Grid>
  );
};
