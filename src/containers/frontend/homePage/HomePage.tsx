import { BasicLayout } from "../../../components";
import GreatingSection from "./GreatingSection";
import NavigationSection from "./NavigationSection";
import FunctionSection from "./FunctionSection";

export default function HomePage() {
  return (
    <BasicLayout>
      <GreatingSection />
      <NavigationSection />
      <FunctionSection />
    </BasicLayout>
  );
}
