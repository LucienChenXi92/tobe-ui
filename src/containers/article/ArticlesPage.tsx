import { useEffect, useState } from "react";
import {
  Typography,
  Tooltip,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import {
  CreateButton,
  Page,
  PagedTable,
  getButtonByOperationName,
} from "../../components";
import { URL } from "../../routes";
import { Column, Operation } from "../../global/types";

interface Article {
  id: string;
  title: string;
  subTitle: string;
  content?: string;
  description: string;
  creatorName: string;
  likeCount: number;
  viewCount: number;
  publicToAll: boolean;
  publishTime: Date;
}

export default function ArticlesPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [cardView, setCardView] = useState<boolean>(true);
  const [current, setCurrent] = useState<number>(0);
  const [size, setSize] = useState<number>(1000);
  const [totalCount, setTotalCount] = useState<number>(0);
  const navigate = useNavigate();

  const handleChangeCurrent = (event: unknown, newPage: number): void => {
    setCurrent(newPage);
  };

  const handleChangeSize = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSize(+event.target.value);
    setCurrent(0);
  };

  const handleViewChange = (cardView: boolean): void => {
    if (cardView) {
      setSize(1000);
    } else {
      setSize(10);
    }
    setCurrent(0);
    setCardView(cardView);
  };

  useEffect(() => {
    loadArticles();
  }, [current, size, cardView]);

  function loadArticles(): void {
    setOpenLoading(true);
    server
      .get(
        `${ROOT_URL}/${SERVER_URI.GET_ARTICLES}?size=${size}&current=${
          current + 1
        }`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
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
  }

  function releaseArticleById(id: number | string) {
    setOpenLoading(true);
    server
      .put(
        `${ROOT_URL}/` +
          SERVER_URI.RELEASE_ARTICLE.replace(":articleId", id.toString())
      )
      .then(() => {
        loadArticles();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function deleteArticleById(id: number | string) {
    setOpenLoading(true);
    server
      .delete(`${ROOT_URL}/${SERVER_URI.DELETE_ARTICLE}/${id}`)
      .then(() => {
        loadArticles();
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
      id: "subTitle",
      label: t("articles-page.article-table.label.subTitle"),
      align: "center",
    },
    {
      id: "description",
      label: t("articles-page.article-table.label.description"),
      align: "center",
    },
    {
      id: "creatTime",
      label: t("articles-page.article-table.label.createTime"),
      format: (value) => (value ? new Date(value).toLocaleDateString() : ""),
      align: "center",
    },
    {
      id: "updateTime",
      label: t("articles-page.article-table.label.updateTime"),
      format: (value) => (value ? new Date(value).toLocaleDateString() : ""),
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
        navigate(URL.ARTICLE_DETAIL.replace(":articleId", id.toString())),
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
      <Grid
        container
        sx={{ py: 1 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <CreateButton handleOnClick={() => navigate(URL.CREATE_ARTICLE)} />
        </Grid>
        <Grid item>
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
      </Grid>
      <Grid container spacing={2} sx={{ py: 2 }}>
        {cardView ? (
          articles.map((article: Article) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={article.id}>
              <Card variant="outlined">
                <CardHeader title={article.title} />
                <Divider />
                <CardContent sx={{ py: 1 }}>
                  {article.publicToAll && (
                    <Tooltip
                      title={t("project-table.card.tooltip.public-to-all")}
                    >
                      <VerifiedIcon color="info" />
                    </Tooltip>
                  )}
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    color="text.secondary"
                  >
                    <b>{article.subTitle}</b>
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="text.secondary"
                  >
                    {article.description}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions sx={{ px: 0 }}>
                  {operations.map(
                    (operation, index) =>
                      !operation?.hide?.call(null, article) &&
                      getButtonByOperationName(
                        operation.name,
                        () => operation.onClick(article.id),
                        `${operation.name}_${index}`
                      )
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <PagedTable
            columns={columns}
            rows={articles}
            totalCount={totalCount}
            size={size}
            current={current}
            operations={operations}
            handleChangeCurrent={handleChangeCurrent}
            handleChangeSize={handleChangeSize}
          />
        )}
      </Grid>
    </Page>
  );
}
