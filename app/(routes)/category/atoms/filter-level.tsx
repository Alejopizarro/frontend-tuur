/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetProductField } from "@/api/getExcursionField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExcursionType } from "@/types/excursion";
import { FiltersType } from "@/types/filters";
import { useEffect, useState } from "react";

type FilterLevelProps = {
  setFilterLevel: (level: string) => void;
  excursions: any[];
};

const FilterLevel = (props: FilterLevelProps) => {
  const { setFilterLevel, excursions } = props;
  const { result, loading }: FiltersType = useGetProductField();

  const [levelCounts, setLevelCounts] = useState<{ [key: string]: number }>({});
  useEffect(() => {
    const counts: { [key: string]: number } = {};
    if (Array.isArray(excursions)) {
      excursions.forEach((excursion: ExcursionType) => {
        const level = excursion.level;
        counts[level] = (counts[level] || 0) + 1;
      });
      setLevelCounts(counts);
    }
  }, [excursions]);
  return (
    <div className="my-5">
      <p className="mb-3 font-bold">Level</p>
      {loading && result === null && <p>Loading level...</p>}
      <RadioGroup onValueChange={(value) => setFilterLevel(value)}>
        {result !== null &&
          result.schema.attributes.level.enum.map((level: string) => (
            <div key={level} className="flex items-center space-x-2">
              <RadioGroupItem value={level} id={level} />
              <Label htmlFor={level}>
                {level} ({levelCounts[level] || 0})
              </Label>
            </div>
          ))}
      </RadioGroup>
    </div>
  );
};

export default FilterLevel;
