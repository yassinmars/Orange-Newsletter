
import { Newsletter } from "@/types/newsletter";
import NewsletterCard from "./NewsletterCard";

interface NewsletterGridProps {
  newsletters: Newsletter[];
  selectedNewsletters: number[];
  toggleNewsletter: (id: number) => void;
  isPreviewMode: boolean;
}

const NewsletterGrid = ({
  newsletters,
  selectedNewsletters,
  toggleNewsletter,
  isPreviewMode,
}: NewsletterGridProps) => {
  if (newsletters.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        {isPreviewMode 
          ? "No newsletters selected. Please select newsletters to preview." 
          : "No newsletters available. Create some newsletters first."}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {newsletters.map((newsletter) => (
        <NewsletterCard
          key={newsletter.id}
          newsletter={newsletter}
          isSelected={selectedNewsletters.includes(newsletter.id)}
          onToggleSelect={toggleNewsletter}
          isPreviewMode={isPreviewMode}
        />
      ))}
    </div>
  );
};

export default NewsletterGrid;
