
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Newsletter } from "@/types/newsletter";

interface NewsletterCardProps {
  newsletter: Newsletter;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  isPreviewMode: boolean;
}

const NewsletterCard = ({
  newsletter,
  isSelected,
  onToggleSelect,
  isPreviewMode,
}: NewsletterCardProps) => {
  return (
    <Card key={newsletter.id} className="relative">
      {!isPreviewMode && (
        <div className="absolute top-4 right-4 z-10">
          <Checkbox
            id={`newsletter-${newsletter.id}`}
            checked={isSelected}
            onCheckedChange={() => onToggleSelect(newsletter.id)}
            className="h-5 w-5 border-orange-500 data-[state=checked]:bg-orange-500"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">{newsletter.title}</CardTitle>
        <CardDescription>
          Created: {new Date(newsletter.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {newsletter.description && (
          <p className="line-clamp-3 text-sm text-gray-600 mb-2">
            {newsletter.description}
          </p>
        )}
        {newsletter.image && (
          <div className="aspect-video overflow-hidden rounded-md mb-2">
            <img 
              src={newsletter.image} 
              alt={newsletter.title} 
              className="h-full w-full object-cover transition-all hover:scale-105"
            />
          </div>
        )}
        {newsletter.author && (
          <p className="text-xs text-gray-500">Author: {newsletter.author}</p>
        )}
        {newsletter.source && (
          <p className="text-xs text-gray-500">Source: {newsletter.source}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
            newsletter.status === 'draft' 
              ? 'bg-orange-50 text-orange-800'
              : newsletter.status === 'scheduled'
              ? 'bg-orange-100 text-orange-800'
              : 'bg-orange-200 text-orange-800'
          }`}>
            {newsletter.status}
          </span>
        </div>
        {newsletter.link && (
          <a
            href={newsletter.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-orange-500 hover:underline"
          >
            Read more
          </a>
        )}
      </CardFooter>
    </Card>
  );
};

export default NewsletterCard;
