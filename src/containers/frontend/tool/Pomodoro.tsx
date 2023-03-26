import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "../../../components";
import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
  CircularProgressProps,
} from "@mui/material";

export default function Pomodoro() {
  const { t } = useTranslation();
  const workDuration = 15;
  const restDuration = 5;
  const [durationInMin, setDurationInMin] = useState<number>(workDuration);
  const [workState, setWorkState] = useState<boolean>(true);
  const [secLeft, setSecLeft] = useState<number>(0);
  const [btnText, setBtnText] = useState<string>(t("tools-pomodoro.btn.start"));
  const [pause, setPause] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (secLeft > 0 && !pause) {
        if (secLeft - 1 <= 0) {
          handleWorkRestChange();
        } else {
          setSecLeft(secLeft - 1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  function handleWorkRestChange() {
    if (workState) {
      // previous state is work state, then rest
      setDurationInMin(restDuration);
      setSecLeft(restDuration * 60);
    } else {
      // previous state is rest state, then work
      setDurationInMin(workDuration);
      setSecLeft(workDuration * 60);
    }
    setWorkState(!workState);
  }

  function handleStartPauseBtnClick() {
    if (secLeft <= 0) {
      setSecLeft(durationInMin * 60);
      setBtnText(t("tools-pomodoro.btn.pause"));
    } else if (secLeft > 0 && !pause) {
      setPause(true);
      setBtnText(t("tools-pomodoro.btn.start"));
    } else if (secLeft > 0 && pause) {
      setPause(false);
      setBtnText(t("tools-pomodoro.btn.pause"));
    }
  }

  function handleResetBtnClick() {
    setWorkState(true);
    setPause(false);
    setDurationInMin(workDuration);
    setSecLeft(0);
    setBtnText(t("tools-pomodoro.btn.start"));
  }

  function printMin(secLeft: number): string {
    let minNum = Math.floor(secLeft / 60);
    return minNum >= 10 ? minNum.toString() : "0" + minNum.toString();
  }

  function printSec(secLeft: number): string {
    let secNum = secLeft % 60;
    return secNum >= 10 ? secNum.toString() : "0" + secNum.toString();
  }
  return (
    <Page openLoading={false} pageTitle={t("tools-pomodoro.page-main-title")}>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        flexDirection="column"
      >
        <Grid
          item
          justifyContent="center"
          alignItems="center"
          sx={{
            mt: 5,
            display: "flex",
            height: "50vh",
            width: "50vh",
          }}
        >
          {secLeft > 0 ? (
            <CircularProgressWithLabel
              variant="determinate"
              workState={workState}
              value={Math.ceil((secLeft / (durationInMin * 60)) * 100)}
              minText={printMin(secLeft)}
              secText={printSec(secLeft)}
            />
          ) : (
            <Typography color="textSecondary" variant="h5">
              {t("tools-pomodoro.tip.start")}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid
        item
        justifyContent="space-evenly"
        alignContent="center"
        sx={{ mt: 2, display: "flex" }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleStartPauseBtnClick}
        >
          {btnText}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleResetBtnClick}
        >
          {t("tools-pomodoro.btn.reset")}
        </Button>
      </Grid>
    </Page>
  );
}

function CircularProgressWithLabel(
  props: CircularProgressProps & {
    value: number;
    minText: string;
    secText: string;
    workState: boolean;
  }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        {...props}
        size="50vh"
        color={props.workState ? "secondary" : "success"}
        thickness={5}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2" component="div" color="primary">
          {props.minText}:{props.secText}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
