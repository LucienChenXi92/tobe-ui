import { FrontendLayout } from "../../../components";
import GreatingSection from "./GreatingSection";
import NavigationSection from "./NavigationSection";
import FunctionSection from "./FunctionSection";

export default function HomePage() {
  return (
    <FrontendLayout>
      <GreatingSection />
      <NavigationSection />
      <FunctionSection />
    </FrontendLayout>
  );
}
