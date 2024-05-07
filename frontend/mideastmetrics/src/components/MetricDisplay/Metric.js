import React, { useState } from 'react';

export default function Metric({ selectedMetric }) {
  const [currentYear, setCurrentYear] = useState(2022);

  const updateYear = (increment) => () => {
    setCurrentYear(currentYear + (increment ? 1 : -1));
  };

  return (
    <div className="space-y-4">
        <div className="inline-flex space-x-4 bg-green-800 p-1 rounded">
        <button onClick={updateYear(false)} disabled={currentYear == 1981} className="bg-green-700 p-1 rounded text-white">{"←"}</button>
          <p className="mb-2"><span className="font-extrabold text-white">{ currentYear }</span></p>
          <button onClick={updateYear(true)} disabled={currentYear == 2022} className="bg-green-700 p-1 rounded text-white">{"→"}</button>
        </div>
        <p className="mb-2">Selected Metric: <span className="font-extrabold">{ selectedMetric.toUpperCase() }</span></p>
        <div>
          Chart
        </div>
      </div>
  )
}
