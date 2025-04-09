
import { Newsletter } from "@/types/newsletter";
import TemplateCard from "./TemplateCard";

const TemplateGrid = ({
  TemplateNewsletters,
}) => {

    console.log(TemplateNewsletters);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {TemplateNewsletters.map((TemplateNewsletters) => (
        <TemplateCard
          key={TemplateNewsletters.id}
          TemplateNewsLetters={TemplateNewsletters}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
