import { useEffect, useState, useCallback } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Page } from "../../../components";
import { URL } from "../../../routes";
import { Operation, SubjectInfo } from "../../../global/types";
import { SubjectService } from "../../../services";

export default function SubjectsPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<SubjectInfo[]>([]);
  const [current] = useState<number>(0);
  const [size] = useState<number>(1000);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorRecordId, setAnchorRecordId] = useState<null | string>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setAnchorRecordId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorRecordId(null);
  };

  function getMenuItem(operationName: string) {
    switch (operationName) {
      case "close": return t("components.standard-button.close");
      case "active": return t("components.standard-button.active");
      case "release": return t("components.standard-button.release");
      case "delete": return t("components.standard-button.delete");
      case "detail": return t("components.standard-button.detail");
    }
  }

  const loadData = useCallback((): void => {
    setOpenLoading(true);
    SubjectService.get(size, current)
      .then((response) => {
        setSubjects(response.data.records || []);
      })
      .catch(() => {
        enqueueSnackbar(t("articles-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }, [current, enqueueSnackbar, size, t]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function releaseById(id: number | string) {
    setOpenLoading(true);
    SubjectService.releaseById(id)
      .then(() => {
        loadData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function deleteById(id: number | string) {
    setOpenLoading(true);
    SubjectService.deleteById(id)
      .then(() => {
        loadData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  const operations: Operation[] = [
    {
      name: "release",
      onClick: (id: number | string) => releaseById(id),
      hide: (data: any) => data.publicToAll,
    },
    {
      name: "delete",
      onClick: (id: number | string) => deleteById(id),
    },
  ];

  return (
    <Page
      openLoading={openLoading}
      pageTitle={t("subjects-page.page-main-title")}
    >
      <Grid
        container
        sx={{ py: 1, minHeight: "54px" }}
        justifyContent="space-between"
        alignItems="center"
      ></Grid>

      <Grid container spacing={1}>
        {subjects.map((subject: SubjectInfo) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={subject.id}>
            <Card variant="outlined">
              <CardMedia
                sx={{ height: 140 }}
                image={subject.coverImgUrl}
                title={subject.name}

              >
                <CardHeader action={<>
                  <IconButton
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(event) => handleClick(event, subject.id)}
                  >
                    <MoreVertIcon sx={{ color: subject?.coverImgUrl?.length > 0 ? 'white' : 'black' }} />
                  </IconButton>
                  <Menu
                    open={open && subject.id === anchorRecordId}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    {operations.map(
                      (operation, index) =>
                        !operation?.hide?.call(null, subject) &&
                        <MenuItem key={subject + "-" + index} onClick={() => operation.onClick(subject.id)}>{getMenuItem(operation.name)}</MenuItem>
                    )}
                  </Menu>
                </>} />
              </CardMedia>

              <CardContent sx={{ py: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  color="text.secondary"
                  component="div"
                >
                  {subject.name}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  {subject.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
