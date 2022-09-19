import { Container, Divider, Typography } from "@mui/material";
import Loading from "./common/Loading";

interface PageProps {
  openLoading?: boolean;
  pageTitle?: string;
  children: any;
  sx?: any;
}

export default function page(props: PageProps) {
  return (
    <Container
      sx={{
        ...{ 
            minHeight: "95vh", 
            pt: {xs: "15vh", sm: "10vh"}
          },
        ...props.sx,
      }}
    >
      <Loading open={props.openLoading} />
      {props.pageTitle && (
        <>
          <Typography variant="h4">{props.pageTitle}</Typography>
          <Divider />
        </>
      )}
      {props.children}
    </Container>
  );
}
