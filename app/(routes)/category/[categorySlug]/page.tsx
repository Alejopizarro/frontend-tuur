"use client";
import { useGetCategoryProducts } from "@/api/getCategoryProducts";
import { ExcursionType } from "@/types/excursion";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const { categorySlug } = params;
  const { result, loading }: ResponseType =
    useGetCategoryProducts(categorySlug);

  console.log(result, loading);
  console.log("params: ", categorySlug);
  console.log("excursions: ", excursion);
  return (
    <div className="max-w-6xl p-10 sm:px-24 sm:py-20">
      <h1>Canyons</h1>
      {!loading &&
        result !== null &&
        result.map((excursion: ExcursionType) => (
          <div key={excursion.id}>
            <h2>{excursion.name}</h2>
            <p>{excursion.shortDescription}</p>
          </div>
        ))}
    </div>
  );
}
