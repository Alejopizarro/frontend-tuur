import { ExcursionType } from "@/types/excursion";
import FilterLevel from "../atoms/filter-level";

type FilterControlsCategory = {
  setFilterLevel: (level: string) => void;
  //   setFilterPeople: (quantityPeople: number) => void;
  excursions: ExcursionType[];
};

const FilterControlsCategory = (props: FilterControlsCategory) => {
  const { setFilterLevel, excursions } = props;

  return (
    <div className="sm:min-w-[200px] sm:mt-5">
      <FilterLevel setFilterLevel={setFilterLevel} excursions={excursions} />
      {/* <FilterPeople setFilterPeople={setFilterPeople} excursions={excursions} /> */}
    </div>
  );
};

export default FilterControlsCategory;
