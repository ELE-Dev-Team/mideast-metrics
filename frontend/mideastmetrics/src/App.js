import React, { useState, useEffect } from "react";
import Metrics from "./components/MetricDisplay/Metrics";
import Map from "./components/Map/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import MMNavbar from "./components/MMNavbar/MMNavbar";
import MENA from "./assets/MENA_.geojson";
import BackgroundVideoReel from "./components/BackgroundVideoReel";
import MetricsButton from "./components/MetricDisplay/MetricsButton";
import CountryYearDistribution from "./components/MetricDisplay/CountyYearDistribution";
import CountryVsCountryDistribution from "./components/MetricDisplay/CountryVsCountryDistribution";

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedISOA2, setSelectedISOA2] = useState(null);
  const [selectedISOA3, setSelectedISOA3] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [validCountries, setValidCountries] = useState(null);

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

  const valid_metrics = [
    "gdpValue",
    "gdpGrowth",
    "gdpPerCapita",
    "pppValue",
    "lifeExpectancyM",
    "lifeExpectancyF",
    "lifeExpectancyT",
    "mortalityRateM",
    "mortalityRateF",
    "mortalityRateT",
    "crudeBirthRateT",
    "taxes",
    "netMigration",
    "importsOfGoodsAndServices",
    "malePop",
    "femalePop",
    "totalPop",
    "unemploymentRateT",
    "unemploymentRateF",
    "unemploymentRateM"
  ];

  const [selectedMetric, setSelectedMetric] = useState(
      valid_metrics ? valid_metrics[0] : null
  );

  const [currentYear, setCurrentYear] = useState(2022);

  const updateYear = (increment) => () => {
    setCurrentYear(currentYear + (increment ? 1 : -1));
  };


  return (
    <div>
      <BackgroundVideoReel />
      <MMNavbar validMetric={valid_metrics} setSelectedMetric={setSelectedMetric} currentYear={currentYear} updateYear={updateYear}/>
      <div className="-z-10" style={{ paddingTop: '60px' }}>
        <div className="flex justify-center items-center">
          <Map
            onSelectCountry={handleCountrySelect}
            selectedCountry={selectedCountry}
            setValidCountries={setValidCountries}
          />
        </div>
        <div className="flex justify-center items-center ">
          {selectedCountry && <div>
            <CountryYearDistribution selectedMetric={selectedMetric} selectedCountry={selectedCountry} currentYear={currentYear}/>
            <CountryVsCountryDistribution selectedMetric={selectedMetric} selectedCountry={selectedCountry} currentYear={currentYear} validCountries={validCountries}/>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default App;
