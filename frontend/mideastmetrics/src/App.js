import React, { useState, useEffect } from "react";
import Map from "./components/Map/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import MMNavbar from "./components/MMNavbar/MMNavbar";
import MENA from "./assets/MENA_.geojson";
import Sidebar from "./components/Sidebar/Sidebar";
import CountryYearDistribution from "./components/MetricDisplay/CountyYearDistribution";
import CountryVsCountryDistribution from "./components/MetricDisplay/CountryVsCountryDistribution";
import { MenuIcon } from '@heroicons/react/solid';

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

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedISOA2, setSelectedISOA2] = useState(null);
  const [selectedISOA3, setSelectedISOA3] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [validCountries, setValidCountries] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(valid_metrics ? valid_metrics[0] : null);
  const [currentTab, setCurrentTab] = useState('View Map');
  const [currentYear, setCurrentYear] = useState(2022);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const updateYear = (increment) => () => {
    setCurrentYear(currentYear + (increment ? 1 : -1));
  };

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

  function handleSideBarClick(selectedComponent) {
    setCurrentTab(selectedComponent);
  }

  function renderTab() {
    switch (currentTab) {
      case 'View Map':
        return (
          <Map
            onSelectCountry={handleCountrySelect}
            selectedCountry={selectedCountry}
            setValidCountries={setValidCountries}
          />
        );
      case 'M2Y':
        return (
          <CountryYearDistribution
            selectedMetric={selectedMetric}
            selectedCountry={selectedCountry}
            currentYear={currentYear} />
        );
      case 'C2C':
        return (
          <CountryVsCountryDistribution
            selectedCountry={selectedCountry}
            selectedMetric={selectedMetric}
            currentYear={currentYear}
            validCountries={validCountries}
          />
        );
      default:
        break;
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <MMNavbar />
      <div className="flex flex-row flex-grow relative w-full">
        {isSidebarOpen && (
          <Sidebar
            handleSideBarClick={handleSideBarClick}
            currentYear={currentYear}
            updateYear={updateYear}
            validMetric={valid_metrics}
            setSelectedMetric={setSelectedMetric}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            selectedMetric={selectedMetric}
            selectedCountry={selectedCountry}
            selectedISOA2={selectedISOA2}
            className="w-full md:w-1/5 h-full"
          />
        )}
        <div className="flex flex-grow justify-center items-center bg-gray-950">
          <div className={`w-full h-full max-w-4xl p-4 flex justify-center items-center`}>
            {renderTab()}
          </div>
        </div>
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed mt-3 left-4 p-2 bg-gray-800 text-white rounded-full shadow-lg transition-transform duration-300 ease-in-out z-50"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
