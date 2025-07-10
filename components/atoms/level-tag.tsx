import { DifficultyLevel } from "@/types/excursion";

export type LevelTagProps = {
  level: DifficultyLevel;
};

const LevelTag = (props: LevelTagProps) => {
  const { level } = props;
  let bgColorClass = "";

  switch (level) {
    case DifficultyLevel.easy:
      bgColorClass = "bg-green-500";
      break;
    case DifficultyLevel.medium:
      bgColorClass = "bg-yellow-500";
      break;
    case DifficultyLevel.hard:
      bgColorClass = "bg-red-500";
      break;
    default:
      bgColorClass = "bg-gray-500";
  }

  return (
    <span
      className={`${bgColorClass} py-1 px-3 text-sm font-semibold rounded-lg`}
    >
      {level}
    </span>
  );
};

export default LevelTag;
