import { createSwapy } from "swapy";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import TemplateGrid from "./TemplateGrid";

function CreateTemplate() {
  const swapy = useRef(null);
  const container = useRef(null);
  const location = useLocation();
  const [slots, setSlots] = useState([]);
  const [filledSlots, setFilledSlots] = useState({});

  const { filteredNewslettersData } = location.state || {};
  console.log(filteredNewslettersData);

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current);

      swapy.current.onSwap((event) => {
        console.log("swap", event);
        const { newSlotItemMap } = event;
        const newSlots = newSlotItemMap.asArray;
        console.log(newSlots);
        setSlots(newSlots); // Update the slots

        const updatedFilledSlots = {};

        newSlots.forEach(({ slot, item }) => {
          // Ignore purely numeric slot names
          if (isNaN(slot)) {
            updatedFilledSlots[slot] = slot !== item;
          }
        });

        setFilledSlots(updatedFilledSlots);
        console.log(filledSlots);

        // console.log(slotKey);
        // if (slotKey) {
        //   setSlots((prev) => ({
        //     ...prev,
        //     [slotKey]: true,
        //   }));
        // }
      });
    }

    return () => {
      swapy.current?.destroy();
    };
  }, []);

  return (
    <div ref={container}>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 flex">
        <div className="w-fit">
          <h1 className="text-2xl font-bold mb-4 text-center text-orange-900">
            Selected News
          </h1>
          <TemplateGrid TemplateNewsletters={filteredNewslettersData} />
          <div data-swapy-slot="a">
            <div data-swapy-item="a">a</div>
          </div>
        </div>

        <div className="w-1 bg-orange-200 mx-6" />

        <div className="flex-1 ml-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-900">
            Newsletter Template
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-orange-100">
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
                <div
                  data-swapy-item="header"
                  className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-b-lg p-6 min-h-[100px] flex items-center justify-center group hover:border-orange-300 transition-colors duration-200"
                >
                  <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
                    Drag and drop header content here
                  </p>
                </div>
              </div>
            </div>

            {/* Featured Content Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-orange-400 rounded-full mr-3"></span>
                Featured news
              </h3>
              <div data-swapy-slot="featured">
                <div
                  data-swapy-item="featured"
                  className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-lg p-6 min-h-[300px] flex items-center justify-center group hover:border-orange-300 transition-colors duration-200"
                >
                  <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
                    Drag featured news here
                  </p>
                </div>
              </div>
            </div>

            {/* Top Stories Grid */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-orange-400 rounded-full mr-3"></span>
                Top Stories
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div data-swapy-slot="news1">
                  <div
                    data-swapy-item="news1"
                    className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-lg p-6 min-h-[200px] flex items-center justify-center group hover:border-orange-300 transition-colors duration-200"
                  >
                    <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
                      Drag news here
                    </p>
                  </div>
                </div>
                <div data-swapy-slot="news2">
                  <div
                    data-swapy-item="news2"
                    className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-lg p-6 min-h-[200px] flex items-center justify-center group hover:border-orange-300 transition-colors duration-200"
                  >
                    <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
                      Drag news here
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Stories Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-orange-400 rounded-full mr-3"></span>
                Additional stories
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div data-swapy-slot="news3">
                  <div
                    data-swapy-item="news3"
                    className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-lg p-4 min-h-[150px] flex items-center justify-center group hover:border-orange-300 transition-colors duration-200"
                  >
                    <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
                      Drag news here
                    </p>
                  </div>
                </div>
                <div data-swapy-slot="news4">
                  <div
                    data-swapy-item="news4"
                    className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-lg p-4 min-h-[150px] flex items-center justify-center group hover:border-orange-300 transition-colors duration-200"
                  >
                    <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
                      Drag news here
                    </p>
                  </div>
                </div>
                <div data-swapy-slot="news5">
                  <div
                    data-swapy-item="news5"
                    className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-lg p-4 min-h-[150px] flex items-center justify-center group hover:border-orange-300 transition-colors duration-200"
                  >
                    <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
                      Drag news here
                    </p>
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
    </div>
  );
}

export default CreateTemplate;
