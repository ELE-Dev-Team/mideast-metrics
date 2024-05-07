import React, { useState } from "react";
import MetricDropDown from "./MetricDropDown";
import Metric from "./Metric";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function Metrics({
  selectedCountry,
  selectedISOA2,
  selectedISOA3,
  valid_metrics,
}) {
  const [selectedMetric, setSelectedMetric] = useState(
    valid_metrics ? valid_metrics[0] : null
  );
  
  return (
    <div className="w-2/3 h-64 m-20 p-4 bg-stone-900/70 rounded outline outline-green-600 outline-5 text-white">
      <div className="lg:text-4xl flex justify-between space-x-2 text-1xl font-semibold">
        <div className="flex items-baseline space-x-2">
          <p className="tracking-wide">{selectedCountry.toUpperCase()}</p>
          <span class={`fi fi-${selectedISOA2.toLowerCase()}`}></span>
        </div>
        <MetricDropDown
          className = "self-end"
          validMetric={valid_metrics}
          setSelectedMetric={setSelectedMetric}
        />
      </div>
      <hr />
      <div>
        <div className="my-2 space-y-4">
          <Metric selectedMetric={selectedMetric} />
        </div>
      </div>
    </div>
  );
}
