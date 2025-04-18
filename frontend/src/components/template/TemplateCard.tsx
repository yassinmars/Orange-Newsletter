import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TemplateCard = ({ TemplateNewsLetters }) => {
  return (
    <Card
      key={TemplateNewsLetters.id}
      className="w-60 flex-shrink-0 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center text-center"
    >
      <div className="absolute top-2 right-2 z-10"></div>
      <CardHeader className="p-2 text-center">
        <CardTitle className="line-clamp-1 text-sm">
          {TemplateNewsLetters.Title}
        </CardTitle>
        <CardDescription className="text-xs">
          Created: {new Date(TemplateNewsLetters.Date).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        {TemplateNewsLetters.Image && (
          <div className="h-24 overflow-hidden rounded-md mb-1">
            <img
              src={`http://localhost:6005${TemplateNewsLetters.Image}`}
              alt={TemplateNewsLetters.Title}
              className="h-full w-full object-contain transition-all hover:scale-105"
            />
          </div>
        )}

        {TemplateNewsLetters.Description && (
          <p className="line-clamp-2 text-xs text-gray-600 mb-1">
            {TemplateNewsLetters.Description}
          </p>
        )}
        {TemplateNewsLetters.Links && (
          <p className="text-xs text-gray-500 mb-1">
            Source: {TemplateNewsLetters.Links}
          </p>
        )}

        {TemplateNewsLetters.Video && (
          <p className="text-xs text-gray-500">
            Video URL: {TemplateNewsLetters.Video}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-2 pt-0">
        <div className="flex items-center">
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] ${
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
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
