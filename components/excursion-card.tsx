/* eslint-disable @next/next/no-img-element */
"use client";
import { ExcursionType } from "@/types/excursion";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import LevelTag from "./atoms/level-tag";
import PeopleTag from "./atoms/people-tag";
import { useRouter } from "next/navigation";

type ExcursionCardProps = {
  excursion: ExcursionType;
};

const ExcursionCard = (props: ExcursionCardProps) => {
  const router = useRouter();
  const { excursion } = props;

  return (
    <Card>
      <CardHeader>
        <img
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${excursion.images[0].url}`}
          alt={excursion.slug}
        />
        <div className="flex justify-start gap-x-2">
          <LevelTag level={excursion.level} />
          <PeopleTag quantityPeople={excursion.quantityPeople} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <h4 className="font-bold sm:text-xl">{excursion.title}</h4>
        <p className="text-gray-600 text-sm">{excursion.shortDescription}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2">
        <span className="font-semibold text-sm">
          From €{excursion.price} p/person
        </span>
        <Button
          onClick={() => router.push(`/excursion/${excursion.slug}`)}
          className="w-full"
        >
          Book now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExcursionCard;
