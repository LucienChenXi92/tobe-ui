import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  Page,
  GeneralCardView,
  GeneralTableView,
  GeneralListPageFunctionBar,
} from "../../../components";
import { URL } from "../../../routes";
import { Column, Operation, VocabularyDetailDTO } from "../../../global/types";
import { VocabularyService } from "../../../services";
import { TimeFormat } from "../../../commons";
import moment from "moment";

export default function VocabulariesPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [vocabularies, setVocabularies] = useState<VocabularyDetailDTO[]>([]);
  const [cardView, setCardView] = useState<boolean>(true);
  const [recentOnly, setRecentOnly] = useState<boolean>(true);
  const [current, setCurrent] = useState<number>(0);
  const [size, setSize] = useState<number>(1000);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>("");
  const navigate = useNavigate();

  const loadData = useCallback((): void => {
    setOpenLoading(true);
    VocabularyService.get(
      size,
      current,
      keyword,
      recentOnly
        ? TimeFormat.dateFormat(moment().subtract(30, "days").calendar())
        : ""
    )
      .then((response) => {
        setVocabularies(response.data.records || []);
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

  function releaseById(id: number | string) {
    setOpenLoading(true);
    VocabularyService.releaseById(id)
      .then(() => {
        loadData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function deleteById(id: number | string) {
    setOpenLoading(true);
    VocabularyService.deleteById(id)
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
      label: t("vocabularies-page.vocabulary-table.label.title"),
      align: "center",
    },
    {
      id: "description",
      label: t("vocabularies-page.vocabulary-table.label.description"),
      align: "center",
    },
    {
      id: "operation",
      label: t("vocabularies-page.vocabulary-table.label.operation"),
      align: "left",
    },
  ];

  const operations: Operation[] = [
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
      pageTitle={t("vocabularies-page.page-main-title")}
    >
      <GeneralListPageFunctionBar
        createNewAction={() => navigate(URL.CREATE_VOCABULARY)}
        cardView={cardView}
        recentOnly={recentOnly}
        setSize={setSize}
        setCurrent={setCurrent}
        setCardView={setCardView}
        setRecentOnly={setRecentOnly}
        setKeyword={setKeyword}
      />
      {cardView ? (
        <GeneralCardView data={vocabularies} operations={operations} onClick={(id: number | string) =>
          navigate(URL.VOCABULARY_DETAIL.replace(":id", id.toString()))} />
      ) : (
        <GeneralTableView
          data={vocabularies}
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
