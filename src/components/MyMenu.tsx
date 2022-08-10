import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import Groups from "@mui/icons-material/Groups";
import PostAdd from "@mui/icons-material/PostAdd";
import ShareIcon from "@mui/icons-material/Share";
import { AUTHORITY, LOCAL_STORAGE_KEYS } from "../consts";
import { URL } from "../routes";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: <Groups />,
    name: "Users",
    requiredRole: [AUTHORITY.ROLE_ADMIN],
    url: URL.USERS,
  },
  {
    icon: <PostAdd />,
    name: "Projects",
    requiredRole: [AUTHORITY.ROLE_ADMIN, AUTHORITY.ROLE_BASIC],
    url: URL.PROJECTS,
  },
  { icon: <ShareIcon />, name: "Share", url: "/" },
];

function authed(requiredRole?: string[]): boolean {
  let userAuthorities = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEYS.AUTHORITIES) || ""
  );
  // if no role required, then return true directly
  if (requiredRole) {
    let isValid: boolean = false;
    // iteritor all user's authority to see if any could match
    userAuthorities.forEach((a: { authority: string }) => {
      if (requiredRole.indexOf(a.authority) > -1) {
        isValid = true;
        return;
      }
    });
    return isValid;
  }
  return true;
}

export default function MyMenu() {
  let navigate = useNavigate();
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
        {actions.map(
          (action) =>
            authed(action.requiredRole) && (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => navigate(action.url || "#", { replace: true })}
              />
            )
        )}
      </SpeedDial>
    </Box>
  );
}
