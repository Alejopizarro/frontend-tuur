export enum DifficultyLevel {
  easy = "easy",
  medium = "medium",
  hard = "hard",
}

export type ExcursionType = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  shortDescription: string;
  locale: string;
  images: [
    {
      id: number;
      url: string;
    }
  ];
  price: number;
  level: DifficultyLevel;
  quantityPeople: number;
  isActive: boolean;
  reserve?: [
    {
      id: number;
      documentId: string;
      createdAt: string;
    }
  ];
};
