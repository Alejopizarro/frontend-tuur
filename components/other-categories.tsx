import Image from "next/image";
import Link from "next/link";

export const categories = [
  { id: 1, name: "Jet Ski", image: "/jetski.jpg" },
  { id: 2, name: "Via ferrata", image: "/via-ferrata.jpg" },
  { id: 3, name: "Kayaking", image: "/kayaking.jpg" },
  { id: 4, name: "Buggy riding", image: "/buggy.jpg" },
  { id: 5, name: "Climbing", image: "/header-canyoning.jpg" },
];

const OtherCategories = () => {
  return (
    <div className="bg-gray-200">
      <div className="max-w-6xl  py-4 flex flex-col gap-4 mx-auto sm:py-16 sm:px-24">
        <h3 className="font-bold text-3xl">Other categories</h3>
        <div className="grid gap-5 sm:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href="/"
              className="relative h-64 max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
            >
              <Image
                src={category.image}
                alt={category.name}
                className="max-w-[270px] h-full object-cover w-full transition duration-300 ease-in-out rounded-lg hover:scale-110"
              />
              <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherCategories;
