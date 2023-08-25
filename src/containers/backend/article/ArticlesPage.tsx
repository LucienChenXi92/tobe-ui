import { useEffect, useState, useCallback } from "react";
import {
  TextField,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  CreateButton,
  Page,
  GeneralCardView,
  GeneralTableView,
} from "../../../components";
import { URL } from "../../../routes";
import { Column, Operation, ArticleDetailDTO } from "../../../global/types";
import { ArticleService } from "../../../services";
import theme from "../../../theme";
import { TimeFormat } from "../../../commons";
import moment from "moment";

export default function ArticlesPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleDetailDTO[]>([]);
  const [cardView, setCardView] = useState<boolean>(true);
  const [recentOnly, setRecentOnly] = useState<boolean>(true);
  const [current, setCurrent] = useState<number>(0);
  const [size, setSize] = useState<number>(1000);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>("");
  const navigate = useNavigate();

  const handleViewChange = (cardView: boolean): void => {
    if (cardView) {
      setSize(1000);
    } else {
      setSize(10);
    }
    setCurrent(0);
    setCardView(cardView);
  };

  const handleRecentOnlyChange = (recentOnly: boolean): void => {
    setCurrent(0);
    setRecentOnly(recentOnly);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const loadData = useCallback((): void => {
    setOpenLoading(true);
    ArticleService.get(
      size,
      current,
      keyword,
      recentOnly
        ? TimeFormat.dateFormat(moment().subtract(30, "days").calendar())
        : ""
    )
      .then((response) => {
        setArticles(response.data.records || []);
        setTotalCount(response.data.total);
      })
      .catch(() => {
        enqueueSnackbar(t("articles-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }, [current, enqueueSnackbar, size, t, keyword, recentOnly]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function releaseArticleById(id: number | string) {
    setOpenLoading(true);
    ArticleService.releaseById(id)
      .then(() => {
        loadData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function deleteArticleById(id: number | string) {
    setOpenLoading(true);
    ArticleService.deleteById(id)
      .then(() => {
        loadData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  const columns: readonly Column[] = [
    {
      id: "title",
      label: t("articles-page.article-table.label.title"),
      align: "center",
    },
    {
      id: "description",
      label: t("articles-page.article-table.label.description"),
      align: "center",
    },
    {
      id: "operation",
      label: t("articles-page.article-table.label.operation"),
      align: "left",
    },
  ];

  const operations: Operation[] = [
    {
      name: "detail",
      onClick: (id: number | string) =>
        navigate(URL.ARTICLE_DETAIL.replace(":id", id.toString())),
    },
    {
      name: "release",
      onClick: (id: number | string) => releaseArticleById(id),
      hide: (data: any) => data.publicToAll,
    },
    {
      name: "delete",
      onClick: (id: number | string) => deleteArticleById(id),
    },
  ];

  return (
    <Page
      openLoading={openLoading}
      pageTitle={t("articles-page.page-main-title")}
    >
      <Grid container sx={{ py: 1 }} alignItems="center">
        <Grid item flex={0}>
          <CreateButton handleOnClick={() => navigate(URL.CREATE_ARTICLE)} />
        </Grid>
        <Grid item flex={1} />
        <Grid item sx={{ mr: 1 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={cardView}
                  onClick={() => handleViewChange(!cardView)}
                  color="secondary"
                />
              }
              label={t("project-table.card-view-btn")}
            />
          </FormGroup>
        </Grid>
        <Grid item sx={{ mr: 1 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={recentOnly}
                  onClick={() => handleRecentOnlyChange(!recentOnly)}
                  color="secondary"
                />
              }
              label={t("articles-page.recent-only")}
            />
          </FormGroup>
        </Grid>
        <Grid
          item
          sx={{
            backgroundColor: theme.palette.common.white,
            width: { xs: "100%", sm: "20%" },
          }}
        >
          <TextField
            placeholder={t("articles-page.search-box-placeholder")}
            type="search"
            size="small"
            onChange={handleKeywordChange}
            fullWidth
          />
        </Grid>
      </Grid>
      {cardView ? (
        <GeneralCardView data={articles} operations={operations} />
      ) : (
        <GeneralTableView
          data={articles}
          operations={operations}
          columns={columns}
          size={size}
          setSize={setSize}
          current={current}
          setCurrent={setCurrent}
          totalCount={totalCount}
        />
      )}
    </Page>
  );
}
