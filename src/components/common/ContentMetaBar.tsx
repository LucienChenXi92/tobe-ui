import { Grid, Link, Typography } from "@mui/material";
import { useAuthState } from "../../contexts";
import { useTranslation } from "react-i18next";
import { TimeFormat } from "../../commons";

export default function ContentMetaBar(props: {
  authorName: string;
  authorId: number | string;
  publishTime: string;
  viewCount: number;
  editLinkUrl: string;
}) {
  const { t } = useTranslation();
  const authState = useAuthState();
  return (
    <Grid item container xs={12} sx={{ my: 1 }}>
      <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
        {props.authorName} · {TimeFormat.dateAndTimeFormat(props.publishTime)} ·{" "}
        {t("components.meta-bar.view")} {props.viewCount}
      </Typography>
      {authState?.user.id ===
        (typeof props.authorId === "string"
          ? Number.parseInt(props.authorId)
          : props.authorId) && (
        <Link href={props.editLinkUrl} sx={{ flexGrow: 0 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ flexGrow: 1 }}
          >
            {t("components.meta-bar.edit-btn")}
          </Typography>
        </Link>
      )}
    </Grid>
  );
}
