import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Page } from "../../../../components";
import { Operation, GeneralCardData } from "../../../../global/types";
import { Grid, Typography } from "@mui/material";
import GeneralDomainListPageFunctionBar from "./GeneralDomainListPageFunctionBar";
import GeneralCardView from "./GeneralCardView";
import DomainService from "../../../../services/DomainService";

export default function GeneralDomainListPage(props: {
  domainService: DomainService;
  pageTitle: string;
  detailPageURL: string;
  createPageURL: string;
  dataConverter?: (d: any[]) => GeneralCardData[];
}) {
  const DEFAULT_PAGE_SIZE: number = 16;
  let GLOBAL_DATA: GeneralCardData[] = [];
  let current: number = 0;
  let totalPage: number = 1;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [data, setData] = useState<GeneralCardData[]>(GLOBAL_DATA);
  const [keyword, setKeyword] = useState<string>("");

  const handleScroll = () => {
    if (
      document.documentElement.scrollHeight <=
      document.documentElement.clientHeight + document.documentElement.scrollTop
    ) {
      loadData(current, keyword);
    }
  };

  const loadData = useCallback(
    (_current: number, _keyword: string): void => {
      setOpenLoading(true);
      props.domainService
        .get(DEFAULT_PAGE_SIZE, _current, _keyword)
        .then((response) => {
          GLOBAL_DATA = GLOBAL_DATA.concat(response.data.records);
          current = response.data.current;
          totalPage = response.data.pages;
          setData(GLOBAL_DATA);
        })
        .catch(() => {
          enqueueSnackbar(t("domain-page.msg.error"), {
            variant: "error",
          });
        })
        .finally(() => setOpenLoading(false));
    },
    [enqueueSnackbar, t, props.domainService]
  );

  useEffect(() => {
    loadData(0, "");
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadData]);

  function releaseById(id: number | string) {
    setOpenLoading(true);
    props.domainService
      .releaseById(id)
      .then((response) => {
        setData(
          data.map((d) => {
            if (d.id === id) {
              d.publicToAll = response.data.publicToAll;
            }
            return d;
          })
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function deleteById(id: number | string) {
    setOpenLoading(true);
    props.domainService
      .deleteById(id)
      .then(() => {
        setData(data.filter((d) => d.id !== id));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

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
    <Page openLoading={openLoading} pageTitle={props.pageTitle}>
      <GeneralDomainListPageFunctionBar
        createNewAction={() => navigate(props.createPageURL)}
        setKeyword={setKeyword}
      />
      <GeneralCardView
        data={props.dataConverter ? props.dataConverter.call(null, data) : data}
        operations={operations}
        onClick={(id: number | string) =>
          navigate(props.detailPageURL.replace(":id", id.toString()))
        }
      />
      <Grid sx={{ mt: 1 }} container justifyContent="center">
        {current + 1 === totalPage && (
          <Typography variant="body2" color="textSecondary">
            {t("domain-page.msg.info-no-more")}
          </Typography>
        )}
      </Grid>
    </Page>
  );
}
