/* eslint-disable @typescript-eslint/no-explicit-any */
export type FiltersType = {
  result: ResultFilterTypes | null;
  loading: boolean;
  error: string;
};

export type ResultFilterTypes = {
  schema: {
    attributes: {
      level: {
        enum: any;
      };
      quantityPeople: number;
    };
  };
};
