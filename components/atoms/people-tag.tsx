import { Users } from "lucide-react";

export type PeopleTagProps = {
  quantityPeople: number;
};

const PeopleTag = (props: PeopleTagProps) => {
  const { quantityPeople } = props;

  return (
    <span className="flex items-center gap-x-2 px-3 py-1 bg-gray-300 rounded-lg text-sm font-semibold">
      <Users width={15} />
      {quantityPeople}
    </span>
  );
};

export default PeopleTag;
