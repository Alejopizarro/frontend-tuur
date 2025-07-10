/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetExcursionBySlug } from "@/api/getExcursionBySlug";
import { ExcursionType } from "@/types/excursion";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BicepsFlexed, Users } from "lucide-react";
import CalendarCheckout from "../components/calendar-checkout";

export default function Page() {
  const params = useParams();
  const { slug } = params;
  const { result, loading }: ResponseType = useGetExcursionBySlug(`${slug}`);

  console.log(result);

  return (
    <div className="py-20">
      <div className="bg-teal-500 min-h-[90vh] flex justify-center items-center">
        {loading && result === null && (
          <div className="grid items-center sm:grid-cols-2 sm:space-x-12">
            <Skeleton className="h-64 w-64" />
            <p>Loading Excursion...</p>
          </div>
        )}
        {!loading &&
          result !== null &&
          result.map((excursion: ExcursionType) => (
            <div
              key={excursion.id}
              className="max-w-6xl sm:flex justify-evenly items-center"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${excursion.images[0].url}`}
                alt={excursion.slug}
                className="h-96 w-72 object-cover rounded-lg shadow-lg"
              />
              <div className="flex flex-col sm:max-w-1/2 space-y-8">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                  {excursion.title}
                </h1>
                <p className="text-gray-600 font-light">
                  {excursion.shortDescription}
                </p>
                <span className="font-semibold text-lg">
                  From €{excursion.price} p/ person
                </span>
                <Button className="w-1/3">Reserve now</Button>
              </div>
            </div>
          ))}
      </div>
      {result !== null && (
        <div>
          <div className="w-full bg-emerald-300 p-8 flex items-center justify-evenly">
            <div className="flex space-x-2 items-center">
              <BicepsFlexed size={15} color="gray" />
              <p className="font-mono text-gray-500 text-lg sm:text-xl">
                {" "}
                {result[0].level}
              </p>
            </div>
            <div className="flex space-x-2 items-center">
              <Users size={20} />
              <p className="font-medium text-lg sm:text-xl">
                People {result[0].quantityPeople}
              </p>
            </div>
          </div>
          <div className="  sm:px-24 sm:py-18 grid sm:grid-cols-2 sm:space-x-8">
            <div>
              <BlocksRenderer content={result[0].description} />
            </div>
            <div className="sm:space-y-12">
              <div className="border-2 rounded-lg shadow-lg">
                <h4 className="py-2 text-center text-gray-700 bg-teal-500 rounded-t-lg">
                  More details
                </h4>
                <div className="p-4 space-y-4">
                  <p>People</p>
                  <p>Minimun Age</p>
                  <p>Difficulty</p>
                  <p>Best dates</p>
                </div>
              </div>

              <div className="border-2 rounded-lg shadow-lg">
                <h4 className="py-2 text-center text-gray-700 bg-teal-500 rounded-t-lg">
                  More details
                </h4>
                <div className="p-4 space-y-4">
                  <p>People</p>
                  <p>Minimun Age</p>
                  <p>Difficulty</p>
                  <p>Best dates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {result !== null && (
        <CalendarCheckout
          excursionDocumentId={result[0].documentId}
          maxPeople={result[0].quantityPeople}
        />
      )}
    </div>
  );
}
