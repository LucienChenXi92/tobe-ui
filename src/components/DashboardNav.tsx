import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Groups from "@mui/icons-material/Groups";
import PostAdd from "@mui/icons-material/PostAdd";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { URL } from "../routes";
import { authed, AUTHORITY } from "../commons";
import { useTranslation } from "react-i18next";
import theme from "../theme";
import { PageItem } from "../global/types";
import project from "../../package.json";

interface DashboardNavProps {
  handleChangeNavMenu: () => void;
  openDrawer: boolean;
  drawerWidth: number;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const basicPageItems: PageItem[] = [
  {
    label: "dashboard-nav.pages.dashboard",
    icon: <DashboardIcon />,
    url: URL.DASHBOARD,
    requiredRoles: [AUTHORITY.ROLE_BASIC, AUTHORITY.ROLE_ADMIN],
  },
  {
    label: "dashboard-nav.pages.projects",
    icon: <PostAdd />,
    url: URL.PROJECTS,
    requiredRoles: [AUTHORITY.ROLE_BASIC, AUTHORITY.ROLE_ADMIN],
  },
];

const adminPageItems: PageItem[] = [
  {
    label: "dashboard-nav.pages.users",
    icon: <Groups />,
    url: URL.USERS,
    requiredRoles: [AUTHORITY.ROLE_ADMIN],
  },
];

const NavItem = styled(ListItem)(({ theme }) => ({
  "& .MuiListItemButton-root.Mui-selected": {
    borderRight: "5px solid",
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main + " !important",
    "& .MuiListItemIcon-root": {
      color: theme.palette.secondary.main + " !important",
    },
  },
}));

const NavItems = (props: { pageItems: PageItem[] }) => {
  let location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const authedPages = props.pageItems.filter((pageItem) =>
    authed(pageItem.requiredRoles)
  );
  return (
    <>
      <List>
        {authedPages.map((pageItem) => (
          <NavItem key={pageItem.label} disablePadding>
            <ListItemButton
              onClick={() => navigate(pageItem.url, { replace: true })}
              selected={pageItem.url === location.pathname}
            >
              <ListItemIcon>{pageItem.icon}</ListItemIcon>
              <ListItemText primary={t(pageItem.label)} />
            </ListItemButton>
          </NavItem>
        ))}
      </List>
      {authedPages.length > 0 && <Divider />}
    </>
  );
};

export default function DashboardNav(props: DashboardNavProps) {
  const navigate = useNavigate();
  return (
    <Drawer
      sx={{
        width: props.drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: props.drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={props.openDrawer}
    >
      <DrawerHeader sx={{ backgroundColor: theme.palette.primary.main }}>
        <IconButton onClick={props.handleChangeNavMenu}>
          <MenuOpenIcon
            sx={{
              color: "#fff",
              border: "1.5px solid #fff",
              borderRadius: 2,
              fontSize: "2rem",
              p: "3px",
              "&:hover": {
                background: "grey",
              },
            }}
          />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="a"
          onClick={() => navigate("/", { replace: true })}
          sx={{
            ml: 2,
            display: { xs: "flex" },
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "white",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          {project.name}
        </Typography>
      </DrawerHeader>
      <NavItems pageItems={basicPageItems} />
      <NavItems pageItems={adminPageItems} />
    </Drawer>
  );
}
