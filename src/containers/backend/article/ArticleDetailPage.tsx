import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { Page } from "../../../components";
import { URL } from "../../../routes";
import { TagOption } from "../../../global/types";
import ArticleEditMainSection from "./component/ArticleEditMainSection";
import { ArticleService } from "../../../services";

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
  const loadData = useCallback((): void => {
    if (!articleId) {
      return window.history.back();
    }
    setOpenLoading(true);
    ArticleService.getById(articleId)
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
  }, [articleId, enqueueSnackbar, t]);

  useEffect(() => loadData(), [loadData]);

  function saveArticle(): void {
    if (!articleId) {
      return;
    }

    setOpenLoading(true);
    ArticleService.update({
      id: articleId,
      title,
      subTitle,
      content: htmlValue,
      description:
        textValue.trim().length >= 100
          ? textValue.trim().substring(0, 97) + "..."
          : textValue.trim(),
      tags: tagValues,
    })
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
