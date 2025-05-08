import { createSwapy } from "swapy";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import TemplateGrid from "./TemplateGrid";
import { FaSave } from "react-icons/fa";
import { Edit } from "lucide-react";
import axios from "axios";

function CreateTemplate() {
  const swapy = useRef(null);
  const container = useRef(null);
  const location = useLocation();
  const [filledSlots, setFilledSlots] = useState({});
  const [headerItem, setHeaderItem] = useState("");
  const [featuredItem, setFeaturedItem] = useState("");
  const [news1Item, setNews1Item] = useState("");
  const [news2Item, setNews2Item] = useState("");
  const [news3Item, setNews3Item] = useState("");
  const [news4Item, setNews4Item] = useState("");
  const [news5Item, setNews5Item] = useState("");

  const { filteredNewslettersData } = location.state || {};
  console.log(filteredNewslettersData);

  const newsIds = filteredNewslettersData.map((item) => item.id);
  console.log(newsIds);

  const Template_Type = "Template_A";

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current, {
        autoScrollOnDrag: true,
      });

      swapy.current.onSwap(({ newSlotItemMap }) => {
        console.log("event", newSlotItemMap);
        const updated = {};
        const slotArray = newSlotItemMap.asArray;
        console.log("Slot Array:", slotArray);


        slotArray.forEach(({ slot, item }) => {
          updated[slot] = slot !== item;
        });

        setFilledSlots(updated);
        setHeaderItem(slotArray[8].item);
        setFeaturedItem(slotArray[9].item);
        setNews1Item(slotArray[10].item);
        setNews2Item(slotArray[11].item);
        setNews3Item(slotArray[12].item);
        setNews4Item(slotArray[13].item);
        setNews5Item(slotArray[14].item);

        console.log("Updated Filled Slots:", updated);
      });
    }



    return () => {
      swapy.current?.destroy();
    };
  }, []);

  useEffect(() => {
    console.log("Updated items:", { headerItem, featuredItem, news1Item, news2Item, news3Item, news4Item, news5Item });
  }, [headerItem, featuredItem, news5Item, news1Item, news2Item, news3Item, news4Item]);

  const handleSave = async () => {
    axios.post('http://localhost:6005/api/postTemplate', Template)
      .then(response => {
        console.log('Newsletter created:', response.data);
      })
      .catch(error => {
        console.error('Error creating newsletter:', error);
      });
  };


  const Template = {
    TemplateType: "Template_A",
    header: headerItem,
    featured: featuredItem,
    news1: news1Item,
    news2: news2Item,
    news3: news3Item,
    news4: news4Item,
    news5: news5Item,
  };


  return (
    <div ref={container}>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 flex">
        <div className="w-fit mr-20">
          <h1 className="text-2xl font-bold mb-4 text-center text-orange-900">
            Selected News
          </h1>
          <TemplateGrid TemplateNewsletters={filteredNewslettersData} />
        </div>

        <div className="w-1 bg-orange-200 mx-6" />

        <div className="flex-1 ml-4 ">
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-900">
            Newsletter Template
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow- xl transition-all duration-300 border border-orange-100 max-h-[100vh] overflow-y-auto">
            {/* Email Header */}
            <div className="mb-8">
              <div className="bg-orange-600 rounded-t-lg p-6 text-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Z9XglXL8OH9WYQbl8NLA9qhiKZmgXcROyw&s"
                  alt="Company Logo"
                  className="h-20 mx-auto mt-3 mb-4"
                />
                <h1 className="text-white text-3xl font-bold">
                  Weekly Newsletter
                </h1>
                <p className="text-orange-100 mt-2">
                  Stay updated with the latest news and updates
                </p>
              </div>
              <div data-swapy-slot="header">
                <div data-swapy-item="header">
                  {!filledSlots.header && (
                    <div className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-b-lg p-6 min-h-[100px] flex items-center justify-center group hover:border-orange-300 transition-colors duration-200">
                      <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
                        Drag and drop header content here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Content Section */}
            <div className="mb-8">
              <div className="flex items-center mb-3">
                <h3 className="text-2xl font-bold text-orange-800 mb-0 flex items-center">
                  <span className="w-3 h-3  bg-orange-400 rounded-full mr-3"></span>
                  Featured news
                  <Edit className="h-5 w-5 text-orange-500 ml-6" />
                </h3>
              </div>

              <div data-swapy-slot="featured">
                <div data-swapy-item="featured">
                  {!filledSlots.featured && (
                    <div className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-lg p-6 min-h-[250px] flex items-center justify-center group hover:border-orange-300 transition-colors duration-200">
                      <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
                        Drag featured news here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Top Stories Grid */}
            <div className="mb-8">
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-orange-800 mb-3 flex items-center">
                  <span className="w-3 h-3 bg-orange-400 rounded-full mr-3"></span>
                  Top Stories
                  <Edit className="h-5 w-5 text-orange-500 ml-6" />
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div data-swapy-slot="news1">
                  <div data-swapy-item="news1">
                    {!filledSlots.news1 && (
                      <div className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-lg p-6 min-h-[200px] flex items-center justify-center group hover:border-orange-300 transition-colors duration-200">
                        <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
                          Drag news here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div data-swapy-slot="news2">
                  <div data-swapy-item="news2">
                    {!filledSlots.news2 && (
                      <div className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-lg p-6 min-h-[200px] flex items-center justify-center group hover:border-orange-300 transition-colors duration-200">
                        <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
                          Drag news here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Stories Section */}
            <div className="mb-8">
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-orange-800 mb-3 flex items-center">
                  <span className="w-3 h-3 bg-orange-400 rounded-full mr-3"></span>
                  Additional stories
                  <Edit className="h-5 w-5 text-orange-500 ml-6" />
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div data-swapy-slot="news3">
                  <div data-swapy-item="news3">
                    {!filledSlots.news3 && (
                      <div className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-lg p-4 min-h-[150px] flex items-center justify-center group hover:border-orange-300 transition-colors duration-200">
                        <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
                          Drag news here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div data-swapy-slot="news4">
                  <div data-swapy-item="news4">
                    {!filledSlots.news4 && (
                      <div className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-lg p-4 min-h-[150px] flex items-center justify-center group hover:border-orange-300 transition-colors duration-200">
                        <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
                          Drag news here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div data-swapy-slot="news5">
                  <div data-swapy-item="news5">
                    {!filledSlots.news5 && (
                      <div className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-lg p-4 min-h-[150px] flex items-center justify-center group hover:border-orange-300 transition-colors duration-200">
                        <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
                          Drag news here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-orange-100 rounded-lg p-6 text-center">
              <p className="text-orange-800 font-medium">Stay Connected</p>
              <div className="flex justify-center gap-4 mt-3">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-orange-700 transition-colors">
                  <span>f</span>
                </div>
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-orange-700 transition-colors">
                  <span>t</span>
                </div>
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-orange-700 transition-colors">
                  <span>in</span>
                </div>
              </div>
              <p className="text-orange-700 mt-4 text-sm">
                © Orange 2025. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-orange-50 rounded-xl p-8 transition-all duration-300 max-h-[100vh] overflow-y-auto flex justify-center">
        <button className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-orange-700 transition duration-300 flex items-center gap-2 mr-10" onClick={handleSave}>
          <FaSave />
          Save Newsletter
        </button>
      </div>
    </div>
  );
}

export default CreateTemplate;
