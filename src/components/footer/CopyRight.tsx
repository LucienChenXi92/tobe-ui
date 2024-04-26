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
        <strong>{project.name.toUpperCase()}</strong>
      </Link>{" "}
      {new Date().getFullYear()}
      {" · "}
      <Link color="inherit" href="https://beian.miit.gov.cn">
        粤ICP备19161005号-1
      </Link>
    </Typography>
  );
}

export default Copyright;
