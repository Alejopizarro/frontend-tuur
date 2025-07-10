import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="flex flex-col min-h-[90vh] lg:flex-row justify-end lg:justify-between items-center bg-teal-500">
      <div className="p-4 lg:px-12 lg:mt-18">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
          Turning Adventures to Experiences
        </h1>
        <p className="max-w-2xl mb-6 font-light text-gray-700 lg:mb-8 md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          dignissimos distinctio expedita. Itaque blanditiis delectus quo labore
          fugit recusandae quibusdam magnam a laboriosam, sequi incidunt facilis
          deleniti quia, deserunt soluta?
        </p>
        <div className="space-x-4">
          <Button>Find the adventures</Button>
          <Button variant="outline">Contact us</Button>
        </div>
      </div>
      <div
        className="lg:mt-18 lg:max-w-1/2 hidden sm:flex inset-shadow-teal-900"
        style={{
          clipPath:
            "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%, 5% 16%, 0% 32%, 7% 47%, 0% 64%, 10% 78%)",
        }}
      >
        <img
          src="/header-canyoning.jpg"
          alt="tuur-canyoning-hero"
          className="w-full h-auto lg:w-auto lg:h-full object-cover"
        />
      </div>
      <div
        className="lg:mt-18 lg:max-w-1/2 sm:hidden relative bg-gradient-to-r from-transparent to-white"
        style={{
          clipPath:
            "polygon(0% 23%, 0% 100%, 100% 100%, 100% 18%, 87% 16%, 73% 19%, 64% 16%, 50% 19%, 39% 16%, 30% 16%, 22% 20%, 11% 18%)",
        }}
      >
        <img
          src="/header-canyoning-ii.jpg"
          alt="tuur-canyoning-hero"
          className="w-auto h-auto min-h-[40vh] lg:w-auto lg:h-full object-cover"
          style={{
            clipPath:
              "polygon(0% 23%, 0% 100%, 100% 100%, 100% 18%, 87% 16%, 73% 19%, 64% 16%, 50% 19%, 39% 16%, 30% 16%, 22% 20%, 11% 18%)",
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
