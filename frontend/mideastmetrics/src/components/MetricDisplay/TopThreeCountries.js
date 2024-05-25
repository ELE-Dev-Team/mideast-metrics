import React from "react";

export default function TopThreeCountries({ topThreeData, selectedCountryData, showSelectedCountry, selectedMetric, currentYear }) {
    // Determine the rank of the selected country
    const selectedCountryRank = topThreeData.length + 1;

    return (
        <div className="flex flex-col p-5 mt-4 bg-white rounded-lg shadow-lg text-gray-900 w-2/3 border-2 border-green-600">
            <div className="text-center mb-6">
                {topThreeData.length !== 0 && (
                    <h1 className="text-2xl font-semibold">{`Top 3 Countries for ${selectedMetric} in ${currentYear}`.toUpperCase()}</h1>
                )}
            </div>
            <hr className="mb-4" />
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rank
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {topThreeData.map((item, index) => (
                            <tr key={index} className={item.country === selectedCountryData?.country ? 'bg-red-100' : ''}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.country}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.val}</td>
                            </tr>
                        ))}
                        {showSelectedCountry && selectedCountryData && (
                            <tr className="bg-red-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{selectedCountryRank}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-bold">{selectedCountryData.country}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-bold">{selectedCountryData.val}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
