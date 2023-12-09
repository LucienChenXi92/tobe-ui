import {
  Button,
  TextField,
  Grid,
  styled,
  alpha,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import theme from "../../../../theme";
import Add from "@mui/icons-material/Add";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

export default function GeneralDomainListPageFunctionBar(props: {
  createNewAction: () => void;
  setCurrent: Function;
  setKeyword: Function;
}) {
  const { t } = useTranslation();

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setKeyword(event.target.value);
    props.setCurrent(0);
  };

  return (
    <Grid container sx={{ py: 1 }} alignItems="center" justifyContent="space-between">
      <Grid item>
        <Button
          onClick={props.createNewAction}
          variant="outlined"
          sx={{ border: "1px solid rgba(0,0,0,0.23)", color: "rgba(0,0,0,0.4)", backgroundColor: theme.palette.common.white }}
        >
          <Add />
        </Button>
      </Grid>
      {/* <Grid
        item
        sx={{
          backgroundColor: theme.palette.common.white,
          width: { xs: "80%", sm: "49.5%", md: "24.5%" },
          p: 0,
          height: "40px"
        }}
      >
        <TextField
          placeholder={t("components.function-bar.search-box-placeholder")}
          type="search"
          size="small"
          onChange={handleKeywordChange}
          fullWidth
        />
      </Grid> */}
    </Grid>
  );
}
