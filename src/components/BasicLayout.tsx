import { Box, Stack } from "@mui/material";
import AppHeader from "./AppHeader/AppHeader";
import AppFooter from "./AppFooter/AppFooter";

/**
 * BasicLayout, a flex container with the basic header, footer
 *
 * 基础布局， 一个带有网站页头和页脚的流式布局容器
 */
export default function BasicLayout({ children }: { children: any }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <AppHeader />
      <Box>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="column"
          sx={{
            minHeight: "100vh",
            backgroundColor: "#f3f2ef",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { md: "flex" },
          }}
        >
          {children}
        </Stack>
      </Box>
      <AppFooter />
    </Box>
  );
}
