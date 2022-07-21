import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Groups from "@mui/icons-material/Groups";
import PostAdd from "@mui/icons-material/PostAdd";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { URL } from "../routes";

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
  justifyContent: "flex-end",
}));

const pageItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    url: URL.DASHBOARD,
  },
  {
    label: "Users",
    icon: <Groups />,
    url: URL.USERS,
  },
  {
    label: "Projects",
    icon: <PostAdd />,
    url: URL.PROJECTS,
  },
];

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
      <DrawerHeader>
        <IconButton onClick={props.handleChangeNavMenu}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {pageItems.map((pageItem, index) => (
          <ListItem key={pageItem.label} disablePadding>
            <ListItemButton
              onClick={() => navigate(pageItem.url, { replace: true })}
            >
              <ListItemIcon>{pageItem.icon}</ListItemIcon>
              <ListItemText primary={pageItem.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
