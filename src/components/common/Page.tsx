import { Container, Divider, Typography } from "@mui/material";
import { useEffect } from "react";
import project from "../../../package.json";
import Loading from "./Loading";

interface PageProps {
  openLoading?: boolean;
  pageTitle?: string;
  children: any;
  sx?: any;
}

export default function Page(props: PageProps) {
  useEffect(() => {
    window.document.title = `${project.name.toUpperCase()} | ${
      props.pageTitle
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
          pt: "9.5vh",
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
