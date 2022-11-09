import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { URL } from "../../routes";
import { TagOption } from "../../global/types";
import ArticleEditMainSection from "./component/ArticleEditMainSection";

export default function ArticleDetailPage() {
  const { t } = useTranslation();
  const { articleId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [htmlValue, setHtmlValue] = useState<string>("");
  const [textValue, setTextValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [tagValues, setTagValues] = useState<TagOption[]>([]);

  useEffect(() => loadArticle(), []);

  function loadArticle(): void {
    setOpenLoading(true);
    server
      .get(`${ROOT_URL}/${SERVER_URI.GET_ARTICLES}/${articleId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setHtmlValue(response.data.content);
        setTitle(response.data.title);
        setSubTitle(response.data.subTitle);
        setTagValues(response.data.tags);
      })
      .catch(() => {
        enqueueSnackbar(t("article-creation-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  function saveArticle(): void {
    setOpenLoading(true);
    server
      .put(
        `${ROOT_URL}/${SERVER_URI.UPDATE_ARTICLE}/${articleId}`,
        {
          id: articleId,
          title,
          subTitle,
          content: htmlValue,
          description: textValue.trim().substring(0, 100),
          tags: tagValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        enqueueSnackbar(t("article-creation-page.msg.success"), {
          variant: "success",
        });
        navigate(URL.ARTICLES);
      })
      .catch(() => {
        enqueueSnackbar(t("article-creation-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  return (
    <Page
      openLoading={openLoading}
      pageTitle={t("article-detail-page.page-main-title")}
    >
      <ArticleEditMainSection
        title={title}
        setTitle={setTitle}
        subTitle={subTitle}
        setSubTitle={setSubTitle}
        tagValues={tagValues}
        setTagValues={setTagValues}
        htmlValue={htmlValue}
        setHtmlValue={setHtmlValue}
        textValue={textValue}
        setTextValue={setTextValue}
        onClickPrimaryBtn={saveArticle}
      />
    </Page>
  );
}
