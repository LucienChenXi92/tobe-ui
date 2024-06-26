import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Page } from "../../../../components";
import { URL } from "../../../../routes";
import { TagOption } from "../../../../global/types";
import ArticleEditMainSection from "./components/ArticleEditMainSection";
import { ArticleService } from "../../../../services";

export default function ArticleCreationPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [htmlValue, setHtmlValue] = useState<string>("");
  const [textValue, setTextValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [tagValues, setTagValues] = useState<TagOption[]>([]);
  const [contentProtected, setContentProtected] = useState<boolean>(false);

  function saveArticle(): void {
    setOpenLoading(true);
    ArticleService.create({
      title: title,
      subTitle: subTitle,
      content: htmlValue,
      description:
        textValue.trim().length >= 500
          ? textValue.trim().substring(0, 497) + "..."
          : textValue.trim(),
      tags: tagValues,
      contentProtected: contentProtected,
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
      pageTitle={t("article-creation-page.page-main-title")}
    >
      <ArticleEditMainSection
        title={title}
        setTitle={setTitle}
        subTitle={subTitle}
        setSubTitle={setSubTitle}
        tagValues={tagValues}
        setTagValues={setTagValues}
        contentProtected={contentProtected}
        setContentProtected={setContentProtected}
        htmlValue={htmlValue}
        setHtmlValue={setHtmlValue}
        textValue={textValue}
        setTextValue={setTextValue}
        onClickPrimaryBtn={saveArticle}
      />
    </Page>
  );
}
