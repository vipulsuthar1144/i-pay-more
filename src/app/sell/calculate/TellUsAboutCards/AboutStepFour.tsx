import React, { useState } from "react";

export default function AboutStepFour({
  details,
  updateDetails,
  handleContinue,
  handleBack, // Added handleBack prop for navigation
  setStepNum,
}: any) {
  const [selectedIssues, setSelectedIssues] = useState(details.accessories || []);

  const options = [
    {
      key: "Box With Same IMEI",
      label: "Box With Same IMEI",
      image: "/TellUsAbout/boxwithemi.webp",
    },
  ];

  const handleSelection = (key: any) => {
    const updatedIssues = selectedIssues.includes(key)
      ? selectedIssues.filter((issue: any) => issue !== key) // Deselect
      : [...selectedIssues, key]; // Select

    setSelectedIssues(updatedIssues);
    updateDetails("accessories", updatedIssues); // Save updated issues
  };

  const handleGetExactValue = () => {
    setStepNum(4); // Proceed to the next step
  };

  return (
    <div className="rounded-md w-full sm:w-2/3 bg-white shadow-lg p-6 sm:mr-4 sm:min-h-72 flex flex-col">
      <div className="text-center text-xl font-semibold text-gray-800 mb-5">
        Select screen/body defects that are applicable!
      </div>
      <div className="text-center text-gray-600 mb-4 text-sm">Please provide correct details</div>

      {/* Add your step-specific content here */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-5">
        {options.map(({ key, label, image }) => (
          <div
            key={key}
            onClick={() => handleSelection(key)}
            className={`flex flex-col justify-center items-center p-4 border-2 rounded-lg cursor-pointer 
      ${selectedIssues.includes(key) ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"} 
      transition-colors duration-300`}
          >
            <div className="w-24 h-24 flex justify-center items-center mb-3">
              <img src={image} alt={label} className="w-full h-full object-contain" />
            </div>
            <div className="text-center text-gray-700 text-sm">{label}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-5 mt-5">
        <button
          type="button"
          onClick={handleBack} // Navigate to the previous step
          className="py-2 px-6 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-200"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleGetExactValue} // Navigate to the next step
          className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
