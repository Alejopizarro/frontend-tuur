"use client";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

export const dataCarouselHero = [
  {
    id: 1,
    title: "Your adventure",
    description: "Begins here!",
    image: "/header-canyoning.jpg",
  },
  {
    id: 2,
    title: "Your adventure",
    description: "Begins here!",
    image: "/header-canyoning-ii.jpg",
  },
];

const HeroSection = () => {
  return (
    <div>
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent>
          {dataCarouselHero.map((item) => (
            <CarouselItem
              key={item.id}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
              }}
              className="flex flex-col justify-center items-center text-white opacity-70"
            >
              <h1 className="text-4xl sm:text-5xl drop-shadow-xl text-black font-semibold">
                {item.title}
              </h1>
              <p className="text-7xl sm:text-8xl font-extralight drop-shadow-xl text-black text-ellipsis italic">
                {item.description}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HeroSection;
