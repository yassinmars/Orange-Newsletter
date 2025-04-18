import { Newsletter } from "@/types/newsletter";
import TemplateCard from "./TemplateCard";
import { useEffect, useRef, useState, useMemo} from "react";
import { createSwapy, utils } from "swapy";
import Template from "./SelectTemplate";

const TemplateGrid = ({ TemplateNewsletters }) => {
  const swapy = useRef(null);
  const container = useRef(null);

  const [slotItemMap, setSlotItemMap] = useState(
    utils.initSlotItemMap(TemplateNewsletters, "TemplateId")
  );

  const slottedItems = useMemo(() => utils.toSlottedItems(TemplateNewsletters, 'TemplateId', slotItemMap), [TemplateNewsletters, slotItemMap]) 


  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current, { manualSwap: true });
    }

    swapy.current.onSwap((event) => {
      setSlotItemMap(event.newSlotItemMap.asArray);
      console.log("event", event);
    });

    return () => {
      swapy.current?.destroy();
    };
  }, []);

  useEffect(() => {
    utils.dynamicSwapy(swapy.current, TemplateNewsletters, 'TemplateId', slotItemMap, setSlotItemMap);
  }, [TemplateNewsletters]);


  return (
    <div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 flex-wrap"
      ref={container}
    >
      {TemplateNewsletters.map((TemplateNewsletters, slotId) => (
        <div className="slot" key={slotId} data-swapy-slot={slotId}>
          <div data-swapy-item={TemplateNewsletters.id}>
            <TemplateCard
              key={TemplateNewsletters.id}
              TemplateNewsLetters={TemplateNewsletters}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateGrid;
