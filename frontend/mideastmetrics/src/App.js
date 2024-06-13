import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import Map from "./components/Map/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import MMNavbar from "./components/MMNavbar/MMNavbar";
import MENA from "./components/Map/mideast.geojson";
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
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [validCountries, setValidCountries] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState(valid_metrics ? valid_metrics[0] : null);
  const [currentTab, setCurrentTab] = useState('View Map');
  const [currentYear, setCurrentYear] = useState(2022);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        setIsSidebarOpen(true);
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
            validCountries={validCountries}
            className="w-full h-full"
          />
        );
      case 'M2Y':
        return (
          <CountryYearDistribution
            selectedMetric={selectedMetric}
            selectedCountry={selectedCountry}
            currentYear={currentYear}
            className="w-full h-full" />
        );
      case 'C2C':
        return (
          <CountryVsCountryDistribution
            selectedCountry={selectedCountry}
            selectedMetric={selectedMetric}
            currentYear={currentYear}
            validCountries={validCountries}
            geoJsonData={geoJsonData}
            className="w-full h-full"
          />
        );
      default:
        break;
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <MMNavbar />
      <div className="flex flex-row flex-grow w-full pt-16 bg-gray-950">
        <motion.div 
          className="fixed md:w-1/3 w-8/12 h-full z-40"
          initial={{ x: '-100%' }}
          animate={{ x: isSidebarOpen ? 0 : '-100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
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
          />
        </motion.div>
        <motion.div 
          className={`flex flex-grow justify-center items-center transition-all duration-300 bg-gray-950 w-full`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-4 flex justify-center items-center w-full mt-6 bg-gray-950">
            {renderTab()}
          </div>
        </motion.div>
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-full shadow-lg transition-transform duration-300 ease-in-out z-50"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
