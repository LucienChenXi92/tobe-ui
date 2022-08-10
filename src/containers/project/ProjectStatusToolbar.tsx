import { Box, Tooltip } from "@mui/material";
import { ProjectInfo } from "../../global/types";
import VerifiedIcon from "@mui/icons-material/Verified";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { PROJECT_STATUS } from "./consts";
import { useTranslation } from "react-i18next";

interface ProjectStatusToolbarProps {
  project: ProjectInfo;
}

export default function ProjectStatusToolbar(props: ProjectStatusToolbarProps) {
  const { t } = useTranslation();
  return (
    <Box sx={{ my: 1 }}>
      {props.project.statusValue === PROJECT_STATUS.FINISHED && (
        <Tooltip title={t("project-table.card.tooltip.closed")}>
          <CheckCircleOutlineIcon color="disabled" />
        </Tooltip>
      )}
      {props.project.statusValue === PROJECT_STATUS.IN_PROCESS && (
        <Tooltip title={t("project-table.card.tooltip.in-process")}>
          <TimelapseIcon color="warning" />
        </Tooltip>
      )}
      {props.project.publicToAll && (
        <Tooltip title={t("project-table.card.tooltip.public-to-all")}>
          <VerifiedIcon color="info" />
        </Tooltip>
      )}
    </Box>
  );
}
