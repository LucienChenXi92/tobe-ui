import React from "react";
import {
    Typography,
    Tooltip,
    Grid,
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    Menu,
    MenuItem
} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Operation, GeneralCardData } from "../../global/types";
import { dateAndTimeFormat } from "../../commons/TimeFormat";
import { useTranslation } from "react-i18next";
import theme from "../../theme";

export default function SubjectCardView(props: {
    data: GeneralCardData[];
    operations: Operation[];
    onClick?: (id: number | string) => void;
}) {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorRecordId, setAnchorRecordId] = React.useState<null | string>(null);
    const open = Boolean(anchorEl);
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

    function buildTitle(record: GeneralCardData) {
        return <Grid container> {record.publicToAll
            ? <Tooltip title={t("components.general-card-view.title.open")}><CheckCircleOutlineIcon sx={{ color: "green" }} /></Tooltip>
            : <Tooltip title={t("components.general-card-view.title.private")}><LockIcon sx={{ color: theme.palette.warning.main }} /></Tooltip>}  <Typography sx={{
                ml: 1, width: "80%",
                maxWidth: "80%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}>{record.tags.map(t => t.label).join(", ")}</Typography></Grid>
    }
    return (
        <Grid container spacing={1}>
            {props.data.map((record: GeneralCardData) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={record.id}>
                    <Card variant="outlined">
                        <CardHeader
                            action={
                                <>
                                    <IconButton
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={(event) => handleClick(event, record.id)} >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        open={open && record.id === anchorRecordId}
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
                                        {props.operations.map(
                                            (operation, index) =>
                                                !operation?.hide?.call(null, record) &&
                                                <MenuItem key={record + "-" + index} onClick={() => operation.onClick(record.id)}>{getMenuItem(operation.name)}</MenuItem>
                                        )}
                                    </Menu>
                                </>
                            }
                            sx={{ py: 1 }}
                            title={buildTitle(record)}
                            titleTypographyProps={{ fontSize: "1rem" }}
                            subheader={dateAndTimeFormat(record.createTime)}
                            subheaderTypographyProps={{ fontSize: "0.75rem" }}
                        />
                        <Divider />
                        <CardContent sx={{ py: 1, '&:hover': { backgroundColor: "rgba(0, 0, 0, 0.05)", cursor: "pointer" } }} onClick={() => props.onClick && props.onClick(record.id)}>
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                                color="text.secondary"
                                sx={{
                                    width: "100%",
                                    maxWidth: "100%",
                                    display: "block",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {record.title}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    maxWidth: "100%",
                                    height: 60,
                                    display: "block",
                                    whiteSpace: "wrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {record.description}
                            </Typography>
                        </CardContent>
                        <Divider />
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
