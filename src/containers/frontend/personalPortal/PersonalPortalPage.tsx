import { useEffect, useCallback, useState } from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { PublicDataService } from "../../../services";
import { enqueueSnackbar } from "notistack";
import { UserFullProfileDTO } from "../../../global/types";
import { useTranslation } from "react-i18next";
import { FrontendLayout, Loading } from "../../../components";
import FunctionSection from "../homePage/FunctionSection";
import IntroducationSection from "./IntroducationSection";

export default function PersonalPortalPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  let [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserFullProfileDTO | null>(null);
  const loadProfile = useCallback((): void => {
    setLoading(true);
    PublicDataService.getFullProfileByUserId(id || "")
      .then((response) => {
        setProfile(response.data);
      })
      .catch(() => {
        enqueueSnackbar(t("article-reading-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setLoading(false));
  }, [t, id]);
  useEffect(() => loadProfile(), [loadProfile]);
  return (
    <FrontendLayout>
      <Loading open={loading} />
      {profile ? (
        <>
          <IntroducationSection profile={profile} />
          <FunctionSection extraPanels={[]} ownerId={profile.id} />
        </>
      ) : (
        <Grid
          container
          sx={{ minHeight: "100vh" }}
          alignContent="center"
          justifyContent="center"
        ></Grid>
      )}
    </FrontendLayout>
  );
}
