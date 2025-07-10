"use client";
import { useGetCategories } from "@/api/getCategories";
import { useGetExcursion } from "@/api/getExcursion";
import CategoryCard from "@/components/category-card";
import ExcursionCard from "@/components/excursion-card";
import SkeletonSchema from "@/components/skeleton-schema";
import { Separator } from "@/components/ui/separator";
import { CategoryType } from "@/types/category";
import { ExcursionType } from "@/types/excursion";
import { ResponseType } from "@/types/response";
import { useState } from "react";
import FilterControlsCategory from "./components/filters-controls";
export default function Page() {
  const { result: category, loading }: ResponseType = useGetCategories();
  const { result: excursion, loading: excursionLoading }: ResponseType =
    useGetExcursion();
  const [filterLevel, setFilterLevel] = useState("");
  // const [filterPeople, setFilterPeople] = useState<number | "">("");
  const filteredExcursions =
    excursion !== null &&
    !loading &&
    excursion.filter(
      (item: ExcursionType) => filterLevel === "" || item.level === filterLevel // (filterPeople === "" || item.quantityPeople <= filterPeople)
    );

  return (
    <div className="p-8 max-w-6xl sm:p-24">
      <div className="space-y-4">
        <h1 className="text-xl sm:text-3xl font-semibold">Categories</h1>
        <Separator />
        {loading && (
          <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
            <SkeletonSchema grid={3} />
          </div>
        )}
        <div className="grid gap-5 sm:grid-cols-4">
          {!loading &&
            category !== null &&
            category.map((category: CategoryType) => (
              <CategoryCard key={category.id} category={category} />
            ))}
        </div>
      </div>
      <div className="py-4 space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold">All excursions</h2>
        <Separator />
        <div className="sm:flex">
          <FilterControlsCategory
            setFilterLevel={setFilterLevel}
            // setFilterPeople={setFilterPeople}
            excursions={excursion}
          />
          <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
            {loading && <SkeletonSchema grid={3} />}
            {!excursionLoading &&
              filteredExcursions !== null &&
              filteredExcursions.map((excursion: ExcursionType) => (
                <ExcursionCard key={excursion.id} excursion={excursion} />
              ))}
            {!filteredExcursions !== null &&
              !loading &&
              filteredExcursions.length === 0 && (
                <p className="text-gray-400 p-6">No excursions found</p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
