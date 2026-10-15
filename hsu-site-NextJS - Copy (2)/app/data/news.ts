export type NewsItem = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: "News" | "Event";
  body: string[];
  eventDate?: string;
  location?: string;
};

// Add approved news and event entries here. Keeping this data separate from the
// page components makes it straightforward to replace with a CMS later.
export const newsItems: NewsItem[] = [];
