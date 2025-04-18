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
import { useEffect, useState } from "react";
import axios from "axios";

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
        <CardTitle className="line-clamp-2">{newsletter.Title}</CardTitle>
        <CardDescription>
          Created: {new Date(newsletter.Date).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {newsletter.Image && (
          <div className="h-48 overflow-hidden rounded-md mb-2">
            <img
              src={`http://localhost:6005${newsletter.Image}`}
              alt={newsletter.Title}
              className="h-full w-full object-contain transition-all hover:scale-105"
            />
          </div>
        )}

        {newsletter.Description && (
          <p className="line-clamp-3 text-sm text-gray-600 mb-2">
            {newsletter.Description}
          </p>
        )}
        {newsletter.Links && (
          <p className="text-xs text-gray-500 mb-2">
            Source: {newsletter.Links}
          </p>
        )}

        {newsletter.Video && (
          <p className="text-xs text-gray-500">Video URL: {newsletter.Video}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
              newsletter.Status === "draft"
                ? "bg-orange-50 text-orange-800"
                : newsletter.Status === "scheduled"
                ? "bg-orange-100 text-orange-800"
                : "bg-orange-200 text-orange-800"
            }`}
          >
            {newsletter.Status}
          </span>
        </div>
        {newsletter.Link && (
          <a
            href={newsletter.Link}
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
