import { Categories } from "@/components/categories";
import HeroSection from "@/components/hero-section";
import OtherCategories from "@/components/other-categories";
import SummerSales from "@/components/summer-sales";
import TeamBuilding from "@/components/team-building";
import TopActivities from "@/components/top-activities";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Categories />
      <TopActivities />
      <SummerSales />
      <TeamBuilding />
      <OtherCategories />
    </main>
  );
}
