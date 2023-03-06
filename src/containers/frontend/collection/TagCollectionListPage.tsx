import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { Page } from "../../../components";
import { PublicDataService } from "../../../services";
import { TagCollection } from "../../../global/types";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

export default function TagCollectionListPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [collections, setCollections] = useState<TagCollection[]>([]);

  useEffect(() => {
    function load(): void {
      setOpenLoading(true);
      PublicDataService.getCollections(1000, 0)
        .then((response) => {
          setCollections(response.data.records || []);
        })
        .catch(() => {
          enqueueSnackbar(t("collections-list-page.msg.error"), {
            variant: "error",
          });
        })
        .finally(() => setOpenLoading(false));
    }
    load();
  }, [t, enqueueSnackbar]);

  return (
    <Page
      openLoading={openLoading}
      pageTitle={t("collections-list-page.page-main-title")}
    >
      <Grid
        container
        spacing={1}
        sx={{
          pt: 2,
        }}
      >
        {collections.map((collection: TagCollection) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={collection.id}
            sx={{
              cursor: "pointer",
            }}
          >
            <Card
              variant="outlined"
              onClick={() => navigate(`/collections/${collection.id}`)}
            >
              <CardMedia
                sx={{ height: 140 }}
                image={collection.coverImgUrl}
                title={collection.name}
              />
              <CardContent sx={{ py: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  color="text.secondary"
                  component="div"
                >
                  {collection.name}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  {collection.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
