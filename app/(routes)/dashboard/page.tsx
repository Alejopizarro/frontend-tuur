import ExcursionPanel from "./components/excursion-panel";
import ReservePanel from "./components/reserve-panel";

const Page = () => {
  return (
    <div className="p-8 sm:py-16 sm:px-24">
      <h1 className="text-4xl font-bold my-10">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <ExcursionPanel />
        <ReservePanel />
      </div>
    </div>
  );
};

export default Page;
