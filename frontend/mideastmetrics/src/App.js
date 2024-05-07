import React, { useState, useEffect } from "react";
import Metrics from "./components/MetricDisplay/Metrics";
import Map from "./components/Map/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import MMNavbar from "./components/MMNavbar/MMNavbar";
import MENA from "./assets/MENA_.geojson";
import BackgroundVideoReel from "./components/BackgroundVideoReel";

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedISOA2, setSelectedISOA2] = useState(null);
  const [selectedISOA3, setSelectedISOA3] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    fetch(MENA)
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  const handleCountrySelect = (country) => {
    if (geoJsonData) {
      const countryFeatures = geoJsonData.features.find(
        (feature) => feature.properties.ADMIN === country
      );
      if (countryFeatures) {
        setSelectedCountry(countryFeatures.properties.ADMIN);
        setSelectedISOA2(countryFeatures.properties.ISO_A2);
        setSelectedISOA3(countryFeatures.properties.ISO_A3);
      }
    }
  };

  return (
    <div>
      <BackgroundVideoReel/>
      <MMNavbar/>
      <div>
        <div className="flex justify-center items-center">
          <Map
            onSelectCountry={handleCountrySelect}
            selectedCountry={selectedCountry}
          />
        </div>
        <div className="flex justify-center items-center">
          {selectedCountry && (
            <Metrics
              selectedCountry={selectedCountry}
              selectedISOA2={selectedISOA2}
              selectedISOA3={selectedISOA3}
              valid_metrics={[
                "gdp",
                "gdpPerCap",
                "ppp",
                "infRate",
                "avgIncome",
                "govDebt",
                "export",
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
