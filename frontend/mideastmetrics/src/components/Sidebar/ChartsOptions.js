import React from 'react';
import { ChartBarIcon, GlobeIcon } from '@heroicons/react/solid';

export default function ChartsOptions({ handleSideBarClick, selectedCountry, currentTab }) {
    return (
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
    );
};
