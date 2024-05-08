import React, { useState, useEffect } from "react";
import MetricDropDown from "./MetricDropDown";
import Metric from "./Metric";
import axios from "axios";
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

  const [countryMetric, setCountryMetric] = useState('');

    async function getMetrics(selectedCountry, year) {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/countries?name=${selectedCountry}&year=${year}`);

            console.log(response);

            // if (response.data.success) {
            //     setCountryMetric(response);
            //     console.log(response);
            // } else {
            //     console.log("FAIL");
            // }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMetrics(selectedCountry, "2022").then(r => console.log(r));
    }, []);
  
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
