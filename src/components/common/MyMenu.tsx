import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import PostAdd from "@mui/icons-material/PostAdd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageItem } from "../../global/types";
import { URL } from "../../routes";
import { AUTHORITY } from "../../commons";

const pageItems: PageItem[] = [
  {
    icon: <PostAdd />,
    label: "my-menu.actions.create-project",
    url: URL.CREATE_PROJECT,
    requiredRoles: [AUTHORITY.ROLE_BASIC, AUTHORITY.ROLE_ADMIN],
  },
  {
    icon: <ShareIcon />,
    label: "my-menu.actions.share",
    url: "/",
    requiredRoles: [AUTHORITY.ROLE_BASIC, AUTHORITY.ROLE_ADMIN],
  },
];

export default function MyMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        {pageItems.map((pageItem: PageItem) => (
          <SpeedDialAction
            key={pageItem.label}
            icon={pageItem.icon}
            tooltipTitle={t(pageItem.label)}
            onClick={() => navigate(pageItem.url || "#", { replace: true })}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
