import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SidebarToggleButton from './SidebarToggleButton';
import ViewOptions from './ViewOptions';
import CountryInfo from './CountryInfo';
import ChartsOptions from './ChartsOptions';
import YearSelector from './YearSelector';
import MetricsSelector from './MetricsSelector';
import 'flag-icons/css/flag-icons.min.css';

export default function Sidebar({ handleSideBarClick, currentYear, updateYear, validMetric, setSelectedMetric, isSidebarOpen, setIsSidebarOpen, selectedMetric, selectedCountry, selectedISOA2, currentTab }) {
    const [isMetricsOpen, setIsMetricsOpen] = useState(false);

    const handleButtonClick = (callback) => {
        callback();
        setIsSidebarOpen(false);
    };

    return (
        <motion.div
            className="bg-gray-900 h-screen p-6 text-white flex flex-col shadow-lg fixed top-12 left-0 z-40 overflow-y-auto"
            initial={{ x: '-100%' }}
            animate={{ x: isSidebarOpen ? 0 : '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
        >
            <SidebarToggleButton isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <ViewOptions handleSideBarClick={(component) => handleButtonClick(() => handleSideBarClick(component))} currentTab={currentTab} />
            <CountryInfo selectedCountry={selectedCountry} selectedISOA2={selectedISOA2} />
            <hr className="border-gray-700 mb-4" />
            <ChartsOptions handleSideBarClick={(component) => handleButtonClick(() => handleSideBarClick(component))} selectedCountry={selectedCountry} currentTab={currentTab} />
            <hr className="border-gray-700 mb-4" />
            <YearSelector currentYear={currentYear} updateYear={updateYear} />
            <hr className="border-gray-700 mb-4" />
            <MetricsSelector 
                validMetric={validMetric} 
                selectedMetric={selectedMetric} 
                setSelectedMetric={setSelectedMetric} 
                isMetricsOpen={isMetricsOpen} 
                setIsMetricsOpen={setIsMetricsOpen} 
            />
        </motion.div>
    );
}