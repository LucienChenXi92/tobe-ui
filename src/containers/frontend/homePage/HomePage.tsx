import { FrontendLayout } from "../../../components";
import GreatingSection from "./GreatingSection";
import NavigationSection from "./NavigationSection";
import FunctionSection from "./FunctionSection";
import Top5ActiveUsersPanel from "./Top5ActiveUsersPanel";

export default function HomePage() {
  return (
    <FrontendLayout>
      <GreatingSection />
      <NavigationSection />
      <FunctionSection extraPanels={[<Top5ActiveUsersPanel />]} ownerId={""} />
    </FrontendLayout>
  );
}
