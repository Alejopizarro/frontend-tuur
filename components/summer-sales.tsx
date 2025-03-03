import { activities } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { OutlineLocalOffer } from "@/public/offer";
import Image from "next/image";

const SummerSales = () => {
  return (
    <div className="bg-gray-200">
      <div className="max-w-6xl  py-4 flex flex-col gap-4 mx-auto sm:py-16 sm:px-24">
        <h3 className="font-bold text-3xl">Summer offers</h3>
        <div>
          <Carousel>
            <CarouselContent className="-ml-2 md:-ml-4">
              {activities.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="md:basis-1/2 lg:basis-1/3 group cursor-pointer"
                >
                  <Card>
                    <CardHeader>
                      <Image
                        src="/header-canyoning.jpg"
                        alt="offers"
                        className=""
                      />
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-sm">{item.description}</p>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <span className="text-xl line-through">€69,00</span>
                      <span className="text-xl font-semibold">€64,00</span>
                      <OutlineLocalOffer fill="red" />
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default SummerSales;
