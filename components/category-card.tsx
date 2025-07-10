/* eslint-disable @next/next/no-img-element */
import { CategoryType } from "@/types/category";
import Link from "next/link";

export type CategoryCardProps = {
  category: CategoryType;
};

const CategoryCard = (props: CategoryCardProps) => {
  const { category } = props;

  return (
    <Link
      key={category.id}
      href="/"
      className="w-64 relative h-64 sm:w-auto sm:max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
    >
      <img
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.mainImage.url}`}
        alt={category.name}
        className="max-w-[270px] h-full object-cover w-full transition duration-300 ease-in-out rounded-lg hover:scale-110"
      />
      <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
        {category.name}
      </p>
    </Link>
  );
};

export default CategoryCard;
