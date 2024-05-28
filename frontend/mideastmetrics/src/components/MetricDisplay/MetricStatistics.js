import React from "react";

export default function MetricStatistics({ statistics, selectedMetric, currentYear }) {
    return (
        <div className="flex flex-col p-5 mt-4 bg-gray-800 rounded-lg shadow-lg text-white w-full max-w-5xl mx-auto border-4 border-green-600">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold">{`Statistics for ${selectedMetric} in ${currentYear}`.toUpperCase()}</h1>
            </div>
            <hr className="mb-4 border-gray-600" />
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-900">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Statistic</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Value</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Average</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{statistics.average.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Median</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{statistics.median.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Mode</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{parseFloat(statistics.mode).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Standard Deviation</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{statistics.stdDev.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
