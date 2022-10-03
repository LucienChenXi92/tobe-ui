import { TextField, Grid, Typography } from "@mui/material";
export const FieldWrapper = (props: {
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
