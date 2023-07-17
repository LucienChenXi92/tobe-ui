import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "../../../components";
import { TimeFormat } from "../../../commons";
import {
  Typography,
  TextField,
  Grid,
  Button,
  ButtonGroup
} from "@mui/material";
import ArrowRight from '@mui/icons-material/ArrowRight';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

export default function TimeConverter() {
  const { t } = useTranslation();
  let [timestamp, setTimestamp] = useState<string>('');
  let [timestring, setTimestring] = useState<string>('');
  let [current, setCurrent] = useState<number>(Math.floor(new Date().getTime() / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(Math.floor(new Date().getTime() / 1000))
    }, 1000);
    return () => clearInterval(interval);
  });

  function convertTimestamp2TimeString() {
    setTimestring(TimeFormat.dateAndTimeFormat(Number.parseInt(timestamp) * 1000));
  }

  function convertTimeString2Timestamp() {
    setTimestamp(TimeFormat.timestamp(timestring).toString());
  }

  function handleStringChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTimestamp('');
    setTimestring(event.target.value);
  }

  function handleStampChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTimestring('');
    setTimestamp(event.target.value);
  }

  const ConvertButtonGroup = () => {
    return (<ButtonGroup variant="text">
    <Button><ArrowLeft onClick={convertTimeString2Timestamp} color="secondary" /></Button>
    <Button><ArrowRight onClick={convertTimestamp2TimeString} color="secondary" /></Button>
  </ButtonGroup>);
  }


  return (
    <Page openLoading={false} pageTitle={t("tools-time-converter.page-main-title")}>
        <Grid sx={{mt: 2, p: 1}}>
          <Grid sx={{my: 2}}>
            <Typography variant="subtitle2" color="textSecondary"><b>{t("tools-time-converter.curent-timestamp")}: {current}</b></Typography>
            <Button><ArrowDropDown onClick={() => setTimestamp(current.toString())} color="secondary"/></Button>
          </Grid>
          
          <Grid container sx={{mt: 1}} >
            <Grid item flexGrow={1}>
              <TextField label={t("tools-time-converter.timestamp-label")} variant="outlined" fullWidth inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                value={timestamp} helperText={t("tools-time-converter.timestamp-input-helper") + ", eg: 1672502400"} focused onChange={handleStampChange} color="secondary" />
            </Grid>
            <Grid item flexGrow={1} sx={{ display: {xs: 'none', sm: 'flex'}, justifyContent: 'center' }} >
              <ConvertButtonGroup />
            </Grid>
            <Grid item sx={{ display: {xs: 'flex', sm: 'none'}, justifyContent: 'center', width: {xs: '100%'}, my: 2 }} >
              <ConvertButtonGroup />
            </Grid>
            <Grid item flexGrow={1}>
              <TextField label={t("tools-time-converter.time-label")} variant="outlined" fullWidth
                value={timestring} helperText={t("tools-time-converter.time-input-helper") + ", eg: 2023-01-01 (00:00:00)"} focused onChange={handleStringChange} color="secondary"/>
            </Grid>
          </Grid>
        </Grid>
    </Page>
  );
}