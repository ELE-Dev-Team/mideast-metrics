import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon, MenuIcon, XIcon, MapIcon, ChartBarIcon, GlobeIcon } from '@heroicons/react/solid';
import 'flag-icons/css/flag-icons.min.css';

function Sidebar({ handleSideBarClick, currentYear, updateYear, validMetric, setSelectedMetric, isSidebarOpen, setIsSidebarOpen, selectedMetric, selectedCountry, selectedISOA2, currentTab }) {
    const [isMetricsOpen, setIsMetricsOpen] = useState(false);

    return (
        <div className="bg-gray-900 h-full p-6 text-white flex flex-col shadow-lg relative">
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-full shadow-lg transition-transform duration-300 ease-in-out"
            >
                {isSidebarOpen ? <XIcon className="h-5 w-5"/> : <MenuIcon className="h-5 w-5"/>}
            </button>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="mb-2">
                <h2 className="text-xl font-semibold mb-2">View Options</h2>
                <ul className="space-y-2">
                    <li
                        className={`py-2 px-4 rounded transition duration-200 flex items-center ${currentTab === 'View Map' ? 'bg-gray-700' : 'hover:bg-gray-700 cursor-pointer'}`}
                        onClick={() => handleSideBarClick('View Map')}
                    >
                        <MapIcon className="h-5 w-5 mr-2"/>
                        View Map
                    </li>
                </ul>
                <p className="mt-4 text-lg font-bold flex items-center">
                    Selected Country: {selectedCountry ? (
                    <>
                        {selectedCountry}
                        <span className={`fi fi-${selectedISOA2.toLowerCase()} ml-2`}/>
                    </>
                ) : "None"}
                </p>
            </div>
            <hr className="border-gray-700 mb-4"/>
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Charts</h2>
                <ul className="space-y-2">
                    <li
                        className={`py-2 px-4 rounded transition duration-200 flex items-center ${selectedCountry ? (currentTab === 'M2Y' ? 'bg-gray-700' : 'hover:bg-gray-700 cursor-pointer') : 'bg-gray-700 cursor-not-allowed opacity-50'}`}
                        onClick={() => selectedCountry && handleSideBarClick('M2Y')}
                    >
                        <ChartBarIcon className="h-5 w-5 mr-2"/>
                        Metric to Year
                    </li>
                    <li
                        className={`py-2 px-4 rounded transition duration-200 flex items-center ${currentTab === 'C2C' ? 'bg-gray-700' : 'hover:bg-gray-700 cursor-pointer'}`}
                        onClick={() => handleSideBarClick('C2C')}
                    >
                        <GlobeIcon className="h-5 w-5 mr-2"/>
                        Country to Country
                    </li>
                </ul>
            </div>
            <hr className="border-gray-700 mb-4"/>
            <div className="flex items-center justify-between mt-4">
                <p className="text-lg font-bold leading-none">Year: {currentYear}</p>
                <div className="flex flex-col items-center space-y-2">
                    <button
                        onClick={updateYear(true)} disabled={currentYear === 2022}
                        className="flex items-center justify-center border border-gray-500 rounded h-8 w-8 leading-none hover:bg-gray-600 disabled:opacity-50 transition duration-200"
                    >
                        <ChevronUpIcon className="h-5 w-5 text-white"/>
                    </button>
                    <button
                        onClick={updateYear(false)} disabled={currentYear === 1981}
                        className="flex items-center justify-center border border-gray-500 rounded h-8 w-8 leading-none hover:bg-gray-600 disabled:opacity-50 transition duration-200"
                    >
                        <ChevronDownIcon className="h-5 w-5 text-white"/>
                    </button>
                </div>
            </div>
            <hr className="border-gray-700 mb-4"/>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Metrics</h2>
                <button
                    onClick={() => setIsMetricsOpen(!isMetricsOpen)}
                    className="py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded transition duration-200 w-full text-left"
                >
                    {selectedMetric ? selectedMetric.toUpperCase() : "Select Metric"}
                </button>
                {isMetricsOpen && (
                    <div className="mt-2 bg-gray-800 rounded shadow-lg max-h-40 overflow-y-auto">
                        <ul className="space-y-1">
                            {validMetric.map((metric) => (
                                <li
                                    key={metric}
                                    className="py-2 px-4 hover:bg-gray-700 cursor-pointer rounded transition duration-200"
                                    onClick={() => {
                                        setSelectedMetric(metric);
                                        setIsMetricsOpen(false);
                                    }}
                                >
                                    {metric.toUpperCase()}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
