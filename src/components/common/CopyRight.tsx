import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import project from "../../../package.json";

/**
 * Copyright component
 *
 * 著作权组件
 */
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        <strong>{project.name}</strong>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
