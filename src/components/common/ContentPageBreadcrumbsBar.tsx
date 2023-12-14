import { TobeBreadcrumbs } from "..";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BreadcrumbsNode } from "../../global/types";
import { URL } from "../../routes";

export default function ContentPageBreadcrumbsBar() {
  const { t } = useTranslation();
  let [searchParams] = useSearchParams();
  const breadcrumbs: BreadcrumbsNode[] = [];
  if (searchParams.has("subjectId") && searchParams.has("subjectName")) {
    breadcrumbs.push({
      label: t("breadcrumbs.subjects"),
      href: URL.SUBJECTS_PAGE,
    });
    breadcrumbs.push({
      label: searchParams.get("subjectName") || "",
      href: URL.SUBJECT_READING_PAGE.replace(
        ":id",
        searchParams.get("subjectId") || ""
      ),
    });
  }
  return <TobeBreadcrumbs nodes={breadcrumbs} />;
}
