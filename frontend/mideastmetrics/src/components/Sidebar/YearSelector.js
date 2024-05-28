import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';

export default function YearSelector({ currentYear, updateYear }) {
    return (
        <div className="flex items-center justify-between mt-4">
            <p className="text-lg font-bold leading-none">Year: {currentYear}</p>
            <div className="flex flex-col items-center space-y-2">
                <button
                    onClick={updateYear(true)} disabled={currentYear === 2022}
                    className="flex items-center justify-center border border-gray-500 rounded h-8 w-8 leading-none hover:bg-gray-600 disabled:opacity-50 transition duration-200"
                >
                    <ChevronUpIcon className="h-5 w-5 text-white" />
                </button>
                <button
                    onClick={updateYear(false)} disabled={currentYear === 1981}
                    className="flex items-center justify-center border border-gray-500 rounded h-8 w-8 leading-none hover:bg-gray-600 disabled:opacity-50 transition duration-200"
                >
                    <ChevronDownIcon className="h-5 w-5 text-white" />
                </button>
            </div>
        </div>
    );
};
