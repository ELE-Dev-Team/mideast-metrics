import React from "react";

export default function BottomThreeCountries({ bottomThreeData, selectedCountryData, selectedMetric, currentYear, totalCountries }) {
    return (
        <div className="flex flex-col p-5 mt-4 bg-gray-800 rounded-lg shadow-lg text-white w-full max-w-5xl mx-auto border-4 border-green-600">
            <div className="text-center mb-6">
                {bottomThreeData.length !== 0 && (
                    <h1 className="text-2xl font-semibold">{`Bottom 3 Countries for ${selectedMetric} in ${currentYear}`.toUpperCase()}</h1>
                )}
            </div>
            <hr className="mb-4 border-gray-600" />
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-900">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Rank
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {bottomThreeData.map((item, index) => (
                            <tr key={index} className={item.country === selectedCountryData?.country ? 'bg-green-700' : ''}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{totalCountries - index}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{item.country}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{item.val}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
