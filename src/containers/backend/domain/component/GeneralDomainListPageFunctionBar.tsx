import { Button, Grid } from "@mui/material";
import theme from "../../../../theme";
import Add from "@mui/icons-material/Add";

export default function GeneralDomainListPageFunctionBar(props: {
  createNewAction: () => void;
  setCurrent: Function;
  setKeyword: Function;
}) {
  return (
    <Grid
      container
      sx={{ py: 1 }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item>
        <Button
          onClick={props.createNewAction}
          variant="outlined"
          sx={{
            border: "1px solid rgba(0,0,0,0.23)",
            color: "rgba(0,0,0,0.4)",
            backgroundColor: theme.palette.common.white,
          }}
        >
          <Add />
        </Button>
      </Grid>
    </Grid>
  );
}
