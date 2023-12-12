import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
    Page,
} from "../../../../components";
import { Operation, GeneralCardData } from "../../../../global/types";
import { Grid, Button } from "@mui/material";
import GeneralDomainListPageFunctionBar from "./GeneralDomainListPageFunctionBar";
import GeneralCardView from "./GeneralCardView";
import DomainService from "../../../../services/DomainService";

export default function GeneralDomainListPage(props: {
    domainService: DomainService,
    pageTitle: string,
    detailPageURL: string,
    createPageURL: string,
    dataConverter?: (d: any[]) => GeneralCardData[]
}) {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [openLoading, setOpenLoading] = useState<boolean>(false);
    const [data, setData] = useState<GeneralCardData[]>([]);
    const [current, setCurrent] = useState<number>(0);
    const [size] = useState<number>(16);
    const [keyword, setKeyword] = useState<string>("");
    const [totalPage, setTotalPage] = useState<number>(1);
    const navigate = useNavigate();

    const loadData = useCallback((
        _data: GeneralCardData[],
        _size: number,
        _current: number,
        _keyword: string): void => {
        setOpenLoading(true);
        props.domainService.get(
            _size,
            _current,
            _keyword
        )
            .then((response) => {
                setData(_data.concat(response.data.records));
                setTotalPage(response.data.pages);
                setCurrent(_current);
            })
            .catch(() => {
                enqueueSnackbar(t("domain-page.msg.error"), {
                    variant: "error",
                });
            })
            .finally(() => setOpenLoading(false));
    }, [enqueueSnackbar, t, props.domainService]);

    useEffect(() => {
        loadData(data, 12, 0, "");
    }, [loadData]);

    function releaseById(id: number | string) {
        setOpenLoading(true);
        props.domainService.releaseById(id)
            .then((response) => {
                setData(data.map(d => {
                    if (d.id === id) {
                        d.publicToAll = response.data.publicToAll;
                    }
                    return d;
                }));
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setOpenLoading(false);
            });
    }

    function deleteById(id: number | string) {
        setOpenLoading(true);
        props.domainService.deleteById(id)
            .then(() => {
                setData(data.filter(d => d.id !== id))
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
        <Page
            openLoading={openLoading}
            pageTitle={props.pageTitle}
        >
            <GeneralDomainListPageFunctionBar
                createNewAction={() => navigate(props.createPageURL)}
                setCurrent={setCurrent}
                setKeyword={setKeyword}
            />
            <GeneralCardView
                data={props.dataConverter ? props.dataConverter.call(null, data) : data}
                operations={operations}
                onClick={(id: number | string) =>
                    navigate(props.detailPageURL.replace(":id", id.toString()))}
            />
            <Grid sx={{ mt: 1 }} container justifyContent="center">
                {(current + 1 < totalPage) &&
                    <Button onClick={() => loadData(data, size, current + 1, keyword)}>
                        {t("domain-page.load-more")}
                    </Button>}
            </Grid>
        </Page>
    );
}
