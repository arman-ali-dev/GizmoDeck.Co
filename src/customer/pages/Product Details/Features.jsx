import React from "react";

const Features = ({ keyFeatures }) => {
  // First 5 features
  const firstColumn = keyFeatures.slice(0, 6);

  // Remaining features
  const secondColumn = keyFeatures.slice(6);

  return (
    <div className="bg-gray-100 mt-5 lg:px-6 px-4 py-4 rounded-2xl">
      <h2 className="font-semibold lg:text-[16px] text-[13px]">Key Features</h2>

      <div className="mt-3 flex gap-20">
        <ul className="lg:text-[15px] text-[12px] list-disc pl-5 space-y-1.5">
          {firstColumn.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {secondColumn.length > 0 && (
          <ul className="lg:text-[15px] text-[12px] list-disc pl-5 space-y-1.5">
            {secondColumn.map((item, index) => (
              <li key={index + 5}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Features;
