import { activities } from "@/lib/data";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image from "next/image";

const TopActivities = () => {
  return (
    <div className="max-w-6xl py-4 flex flex-col gap-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="font-bold text-3xl">Our top activities</h3>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {activities.map((item) => (
            <CarouselItem
              key={item.id}
              className="md:basis-1/2 lg:basis-1/3 group"
            >
              <Card>
                <CardHeader>
                  <Image src="/header-canyoning.jpg" alt="activite-img" />
                  <div className="flex gap-2">
                    {item.tag.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-gray-200 text-gray-600 font-medium text-sm rounded-lg px-3 py-1"
                      >
                        {tag.title}
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="text-lg font-bold">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4">
                  <div className="w-full flex flex-col gap-1">
                    <Button variant={"outline"}>Más informacion</Button>
                    <Button>Contratar ahora</Button>
                  </div>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TopActivities;
