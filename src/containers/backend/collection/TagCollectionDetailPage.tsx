import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import {
  SingleTagSelecter,
  Page,
  EditIconButton,
  TreePanel,
} from "../../../components";
import { CollectionService } from "../../../services";
import { Button, Box, Paper, TextField, Grid } from "@mui/material";

import {
  TagRelationship,
  RenderTree,
  TagCollectionGeneralDTO,
  TagCollectionUpdateDTO,
  TagOption,
} from "../../../global/types";

export default function TagCollectionDetailPage() {
  const ROOT = "root";
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { collectionId } = useParams();
  const [editable, setEditable] = useState<boolean>(false);
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [collection, setCollection] = useState<TagCollectionGeneralDTO | null>(
    null
  );
  const [description, setDescription] = useState<string | null>(null);
  const [coverImgUrl, setCoverImgUrl] = useState<string | null>(null);
  useEffect(() => loadCollection(collectionId || ""), []);
  const [treeData, setTreeData] = useState<RenderTree>({
    id: ROOT,
    name: "ROOT",
    children: [],
  });
  const [currentNodeId, setCurrentNodeId] = useState<string>(ROOT);
  const [targetTag, setTargetTag] = useState<TagOption | null>(null);

  const convert = (tagRelationships: TagRelationship[]): RenderTree[] => {
    if (!Array.isArray(tagRelationships) || tagRelationships.length == 0) {
      return [];
    }
    return tagRelationships.map((t) => {
      return {
        id: t.id + "",
        name: t.label,
        children: convert(t.children),
      };
    });
  };

  const handleEditableChange = () => {
    if (!collection) {
      return;
    }
    if (editable) {
      handleUpdate({
        id: collection.id,
        name: collection.name,
        description: description || "",
        coverImgUrl: coverImgUrl || "",
      });
    }
    setEditable(!editable);
  };

  function handleUpdate(target: TagCollectionUpdateDTO): void {
    setOpenLoading(true);
    CollectionService.update(target)
      .then((response) => {
        enqueueSnackbar(t("collection-detail-page.msg.success"), {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar(t("collection-detail-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  function loadCollection(collectionId: string): void {
    setOpenLoading(true);
    CollectionService.getById(collectionId)
      .then((response) => {
        setCollection(response.data);
        setDescription(response.data.description);
        setCoverImgUrl(response.data.coverImgUrl);
        treeData.children = convert(response.data.tagTree);
        setTreeData(treeData);
      })
      .catch(() => {
        enqueueSnackbar(t("collection-detail-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  function handleCreateNewRelationship() {
    setOpenLoading(true);
    const parentId =
      currentNodeId === ROOT ? null : Number.parseInt(currentNodeId);
    if (!targetTag || !collectionId) {
      return;
    }
    const tagId = Number.parseInt(targetTag.value);
    CollectionService.createRelationship({
      parentId,
      tagId,
      collectionId,
    }).then((response) => {
      loadCollection(collectionId);
      setTargetTag(null);
    });
  }

  function handleDeleteRelationship() {
    setOpenLoading(true);
    const targetId =
      currentNodeId === ROOT ? null : Number.parseInt(currentNodeId);
    if (!targetId || !collectionId) {
      return;
    }
    CollectionService.deleteRelationship(targetId).then((response) => {
      loadCollection(collectionId);
      setTargetTag(null);
    });
  }

  return (
    <Page openLoading={openLoading} pageTitle={collection?.name || ""}>
      {collection && (
        <Grid
          container
          sx={{ m: 0, p: { xs: 0.5, md: 1 } }}
          alignItems="center"
        >
          <Grid item flexGrow={1}></Grid>
          <Grid item flexGrow={0}>
            <EditIconButton
              editable={editable}
              handleEditableChange={handleEditableChange}
            />
          </Grid>
        </Grid>
      )}
      <Paper variant="outlined" sx={{ mt: 0, mb: 1, p: { xs: 2, md: 3 } }}>
        <Box justifyContent="center">
          {collection && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="coverImgUrl"
                  name="coverImgUrl"
                  label={t("collection-creation-page.fields.cover-img-url")}
                  fullWidth
                  disabled={!editable}
                  autoComplete="coverImgUrl"
                  variant="standard"
                  value={coverImgUrl}
                  onChange={(event) => setCoverImgUrl(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label={t("collection-creation-page.fields.description")}
                  fullWidth
                  autoComplete="description"
                  variant="standard"
                  multiline
                  maxRows={2}
                  minRows={2}
                  disabled={!editable}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
      <Grid container component={Paper} variant="outlined">
        <Grid item xs={12} sm={12} md={6} sx={{ p: 2 }}>
          <TreePanel
            nodes={treeData}
            onNodeFocus={(event, id) => setCurrentNodeId(id)}
          />
        </Grid>
        <Grid container item xs={12} sm={6} sx={{ p: 2 }}>
          <Grid item xs={12} sm={12} sx={{ alignSelf: "flex-start", p: 1 }}>
            <SingleTagSelecter value={targetTag} setValue={setTargetTag} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ alignSelf: "flex-end", p: 1 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCreateNewRelationship}
            >
              {t("collection-detail-page.btn.add")}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ alignSelf: "flex-end", p: 1 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleDeleteRelationship}
            >
              {t("collection-detail-page.btn.delete")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
