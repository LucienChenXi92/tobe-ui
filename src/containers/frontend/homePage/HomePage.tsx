import { FrontendLayout } from "../../../components";
import GreatingSection from "./GreatingSection";
import NavigationSection from "./NavigationSection";
import FunctionSection from "./FunctionSection";
import Top5ActiveUsersPanel from "./Top5ActiveUsersPanel";
import Top5PopularSubjectsPanel from "./Top5PopularSubjectsPanel";
import { Domain } from "../../../global/types";

export default function HomePage() {
  return (
    <FrontendLayout>
      <GreatingSection />
      <NavigationSection />
      <FunctionSection
        extraPanels={[<Top5ActiveUsersPanel />, <Top5PopularSubjectsPanel />]}
        ownerId={""}
        availableDomains={[Domain.Article, Domain.Project, Domain.Vocabulary]}
      />
    </FrontendLayout>
  );
}
