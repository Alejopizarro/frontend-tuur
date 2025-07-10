/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetCategories } from "@/api/getCategories";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { ResponseType } from "@/types/response";
import { CategoryType } from "@/types/category";

export const Categories = () => {
  const { result, loading }: ResponseType = useGetCategories();

  console.log("result desde home: ", result);

  return (
    <div>
      <h3 className="max-w-6xl p-8 sm:px-24 sm:py-18">All categories</h3>
      <Separator />
      {!loading &&
        result !== null &&
        result.map((category: CategoryType) => (
          <Link key={category.id} href="/">
            <img src={category.mainImage.url} alt={category.name} />
            <p>{category.name}</p>
          </Link>
        ))}
    </div>
  );
};
