import { activities } from "@/lib/data";
import Link from "next/link";

const TopActivities = () => {
  return (
    <div className="max-w-6xl py-4 px-1 flex flex-col gap-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="font-bold text-3xl">Our top activities</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {activities.map((item) => (
          <div
            className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
            key={item.id}
          >
            <img
              className="w-full"
              src="/header-canyoning.jpg"
              alt="Image of a building"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Title goes here</h2>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm mr-2">⭐</span>
                <span className="text-gray-500 text-sm">4.5</span>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <button className="focus:outline-none">
                <svg
                  className="h-6 w-6 text-gray-500 hover:text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5h18M3 12h18M3 19h18"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopActivities;
