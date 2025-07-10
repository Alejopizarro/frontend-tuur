export type CategoryType = {
  id: number;
  name: string;
  categorySlug: string;
  description: [
    {
      type: string;
      children: [
        {
          text: string;
          type: string;
        }
      ];
    }
  ];
  locale: string;
  mainImage: {
    id: number;
    url: string;
  };
};
