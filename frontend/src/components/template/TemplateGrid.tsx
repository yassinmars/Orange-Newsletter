import { Newsletter } from "@/types/newsletter";
import TemplateCard from "./TemplateCard";
import { useEffect, useRef, useState, useMemo } from "react";
import { createSwapy, utils } from "swapy";
import Template from "./SelectTemplate";

const TemplateGrid = ({ TemplateNewsletters }) => {
  return (
    <div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 flex-wrap"
    >
      {TemplateNewsletters.map((TemplateNewsletters, slotId) => {
        return (
          <div className="slot" key={slotId} data-swapy-slot={slotId}>
            <div data-swapy-item={TemplateNewsletters.id}>
              <TemplateCard
                key={TemplateNewsletters.id}  
                TemplateNewsLetters={TemplateNewsletters}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TemplateGrid;
