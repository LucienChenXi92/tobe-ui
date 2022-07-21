import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function MyMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const actions = [
    { icon: <ShareIcon />, name: t("my-menu.actions.share"), url: "/" },
  ];
  return (
    <Box
      sx={{
        height: 320,
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "fixed",
        bottom: 16,
        right: 16,
      }}
    >
      <SpeedDial
        ariaLabel="My menus"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => navigate(action.url || "#", { replace: true })}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
