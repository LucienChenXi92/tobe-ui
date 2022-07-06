import { MyMenu } from "../../components";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
export default function DashboardPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: "90%", md: "60%" },
      }}
    >
      <Outlet />
      <MyMenu />
    </Box>
  );
}
