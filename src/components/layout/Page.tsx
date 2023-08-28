import { Container, Divider, Typography } from "@mui/material";
import { useEffect } from "react";
import Loading from "../common/Loading";
import project from "../../../package.json";

interface PageProps {
  openLoading?: boolean;
  pageTitle?: string;
  children: any;
  sx?: any;
}

export default function Page(props: PageProps) {
  useEffect(() => {
    window.document.title = `${project.name.toUpperCase()} ${
      props.pageTitle ? " | " + props.pageTitle : ""
    }`;
    return function restoreTitle() {
      window.document.title = `${project.name.toUpperCase()}`;
    };
  });

  return (
    <Container
      sx={{
        ...{
          minHeight: "95vh",
          pt: "11vh",
          pb: 2,
        },
        ...props.sx,
      }}
    >
      <Loading open={props.openLoading} />
      {props.pageTitle && (
        <>
          <Typography variant="h5">{props.pageTitle}</Typography>
          <Divider />
        </>
      )}
      {props.children}
    </Container>
  );
}
