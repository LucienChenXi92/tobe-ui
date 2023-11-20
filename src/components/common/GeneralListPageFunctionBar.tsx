import {
  TextField,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import theme from "../../theme";

export default function GeneralListPageFunctionBar(props: {
  createNewAction: () => void;
  cardView: boolean;
  recentOnly: boolean;
  setSize: Function;
  setCurrent: Function;
  setCardView: Function;
  setRecentOnly: Function;
  setKeyword: Function;
}) {
  const { t } = useTranslation();
  const handleViewChange = (cardView: boolean): void => {
    if (cardView) {
      props.setSize(1000);
    } else {
      props.setSize(10);
    }
    props.setCurrent(0);
    props.setCardView(cardView);
  };

  const handleRecentOnlyChange = (recentOnly: boolean): void => {
    props.setCurrent(0);
    props.setRecentOnly(recentOnly);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setKeyword(event.target.value);
  };

  return (
    <Grid container sx={{ py: 1 }} alignItems="center">
      <Grid item container sx={{ maxWidth: 320 }} flexGrow={0}>
        <Grid item sx={{ mr: 1 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={props.cardView}
                  onClick={() => handleViewChange(!props.cardView)}
                  color="secondary"
                />
              }
              label={t("components.function-bar.card-view-btn")}
            />
          </FormGroup>
        </Grid>
        <Grid item sx={{ mr: 1 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={props.recentOnly}
                  onClick={() => handleRecentOnlyChange(!props.recentOnly)}
                  color="secondary"
                />
              }
              label={t("components.function-bar.recent-only")}
            />
          </FormGroup>
        </Grid>
      </Grid>
      <Grid item flexGrow={1}></Grid>
      <Grid
        item
        sx={{
          backgroundColor: theme.palette.common.white,
          width: { xs: "100%", sm: "20%" },
        }}
      >
        <TextField
          placeholder={t("components.function-bar.search-box-placeholder")}
          type="search"
          size="small"
          onChange={handleKeywordChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
