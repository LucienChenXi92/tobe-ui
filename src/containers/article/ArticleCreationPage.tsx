import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { URL } from "../../routes";
import { TagOption } from "../../global/types";
import ArticleEditMainSection from "./component/ArticleEditMainSection";

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

  function createArticle(): void {
    setOpenLoading(true);
    server
      .post(
        `${ROOT_URL}/${SERVER_URI.CREATE_ARTICLE}`,
        {
          title: title,
          subTitle: subTitle,
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
      pageTitle={t("article-creation-page.page-main-title")}
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
        onClickPrimaryBtn={createArticle}
      />
    </Page>
  );
}
