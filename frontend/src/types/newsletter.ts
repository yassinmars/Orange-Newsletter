
export interface Newsletter {
  id: number;
  title: string;
  content?: string;
  description?: string;
  image?: string;
  author?: string;
  source?: string;
  link?: string;
  status: "draft" | "scheduled" | "sent";
  scheduledDate?: string;
  createdAt: string;
}
