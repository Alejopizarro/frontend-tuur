import { Slider } from "@/components/ui/slider";
import { ExcursionType } from "@/types/excursion";

export type FilterPeopleProps = {
  setFilterPeople: (quantityPeople: number) => void;
  excursions: ExcursionType[];
};
const FilterPeople = (props: FilterPeopleProps) => {
  const { setFilterPeople } = props;
  const handleSliderChange = (value: number[]) => {
    setFilterPeople(value[0]);
  };

  return (
    <div>
      <p>Number of people</p>
      <Slider
        step={1}
        min={1}
        max={10}
        defaultValue={[10]}
        onValueChange={handleSliderChange}
      />
    </div>
  );
};

export default FilterPeople;
