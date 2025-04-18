// components/TemplateSlot.js
const TemplateSlot = ({ slotId, placeholder }) => {
  return (
    <div data-swapy-slot={slotId}>
      <div
        data-swapy-item={slotId}
        className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-lg p-6 min-h-[100px] flex items-center justify-center group hover:border-orange-300 transition-all duration-200"
      >
        <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
          {placeholder}
        </p>
      </div>
    </div>
  );
};

export default TemplateSlot;
