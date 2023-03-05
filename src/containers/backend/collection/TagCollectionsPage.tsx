import { useEffect, useState, useCallback } from "react";
import {
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  CreateButton,
  Page,
  getButtonByOperationName,
} from "../../../components";
import { URL } from "../../../routes";
import { Operation, TagOption } from "../../../global/types";
import { CollectionService } from "../../../services";

interface TagCollection {
  id: string;
  name: string;
  description: string;
  coverImgUrl: string;
  ownerId: string;
  likeCount: number;
  viewCount: number;
  publicToAll: boolean;
  publishTime: Date;
  tags: TagOption[];
}

export default function TagCollectionsPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [collections, setCollections] = useState<TagCollection[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [size, setSize] = useState<number>(1000);
  const [totalCount, setTotalCount] = useState<number>(0);
  const navigate = useNavigate();

  const loadCollections = useCallback((): void => {
    setOpenLoading(true);
    CollectionService.get(size, current)
      .then((response) => {
        setCollections(response.data.records || []);
        setTotalCount(response.data.total);
      })
      .catch(() => {
        enqueueSnackbar(t("articles-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }, [current, enqueueSnackbar, size, t]);

  useEffect(() => {
    loadCollections();
  }, [loadCollections]);

  function releaseById(id: number | string) {
    setOpenLoading(true);
    CollectionService.releaseById(id)
      .then(() => {
        loadCollections();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function deleteById(id: number | string) {
    setOpenLoading(true);
    CollectionService.deleteById(id)
      .then(() => {
        loadCollections();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  const operations: Operation[] = [
    {
      name: "detail",
      onClick: (id: number | string) =>
        navigate(URL.COLLECTION_DETAIL.replace(":collectionId", id.toString())),
    },
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
      pageTitle={t("collections-page.page-main-title")}
    >
      <Grid
        container
        sx={{ py: 1, minHeight: "54px" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <CreateButton handleOnClick={() => navigate(URL.CREATE_COLLECTION)} />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        {collections.map((collection: TagCollection) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={collection.id}>
            <Card variant="outlined">
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
              <Divider />
              <CardActions sx={{ px: 0 }}>
                {operations.map(
                  (operation, index) =>
                    !operation?.hide?.call(null, collection) &&
                    getButtonByOperationName(
                      operation.name,
                      () => operation.onClick(collection.id),
                      `${operation.name}_${index}`
                    )
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
