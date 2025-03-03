"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const carouselimage = [
  {
    id: 1,
    image: "/header-canyoning-ii.jpg",
  },
  {
    id: 2,
    image: "/header-canyoning.jpg",
  },
  {
    id: 3,
    image: "/header-canyoning-ii.jpg",
  },
  {
    id: 4,
    image: "/header-canyoning.jpg",
  },
  {
    id: 5,
    image: "/header-canyoning-ii.jpg",
  },
];

const TeamBuilding = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="max-w-6xl  py-4 gap-4 mx-auto sm:py-16 sm:px-24 grid sm:grid-cols-2 md:grid-cols-2">
      <div className="max-w-2xs flex flex-col gap-y-4 sm:gap-y-16">
        <h3 className="font-bold text-3xl">Team Building</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nostrum
          facere necessitatibus minima id veniam error rerum est dolorem hic
          obcaecati laudantium, in repudiandae quos nulla quaerat earum
          temporibus sunt?
        </p>
        <div className="w-full flex gap-2">
          <Button variant={"outline"}>Más informacion</Button>
          <Button>Contratar ahora</Button>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Carousel>
          <CarouselContent>
            <CarouselItem key={carouselimage[selectedImage].image}>
              <img
                src={`${carouselimage[selectedImage].image}`}
                alt="team-building"
                className="rounded-lg w-full h-64 object-cover"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {carouselimage.map((image, index) => (
              <CarouselItem key={image.id} className="pl-2 basis-1/5">
                <img
                  src={image.image}
                  alt="Teambuilding thumbnail"
                  className={`rounded-lg h-24 w-full object-cover cursor-pointer ${
                    selectedImage === index ? "border-2 border-black" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default TeamBuilding;
