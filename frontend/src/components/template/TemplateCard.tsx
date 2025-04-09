import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";

// interface TemplateCardProps {
//   TemplateNewsLetters: Newsletter;
//   isSelected: boolean;
//   onToggleSelect: (id: number) => void;
// }

const TemplateCard = ({ TemplateNewsLetters }) => {
    console.log(TemplateNewsLetters);
  return (
    <Card key={TemplateNewsLetters.id} className="relative">
      <div className="absolute top-4 right-4 z-10">
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{TemplateNewsLetters.Title}</CardTitle>
        <CardDescription>
          Created: {new Date(TemplateNewsLetters.Date).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {TemplateNewsLetters.Image && (
          <div className="h-48 overflow-hidden rounded-md mb-2">
            <img
              src={`http://localhost:6005${TemplateNewsLetters.Image}`}
              alt={TemplateNewsLetters.Title}
              className="h-full w-full object-fill transition-all hover:scale-105"
            />
          </div>
        )}

        {TemplateNewsLetters.Description && (
          <p className="line-clamp-3 text-sm text-gray-600 mb-2">
            {TemplateNewsLetters.Description}
          </p>
        )}
        {TemplateNewsLetters.Links && (
          <p className="text-xs text-gray-500 mb-2">
            Source: {TemplateNewsLetters.Links}
          </p>
        )}

        {TemplateNewsLetters.Video && (
          <p className="text-xs text-gray-500">Video URL: {TemplateNewsLetters.Video}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
              TemplateNewsLetters.Status === "draft"
                ? "bg-orange-50 text-orange-800"
                : TemplateNewsLetters.Status === "scheduled"
                ? "bg-orange-100 text-orange-800"
                : "bg-orange-200 text-orange-800"
            }`}
          >
            {TemplateNewsLetters.Status}
          </span>
        </div>
        {TemplateNewsLetters.Link && (
          <a
            href={TemplateNewsLetters.Link}
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

export default TemplateCard;
