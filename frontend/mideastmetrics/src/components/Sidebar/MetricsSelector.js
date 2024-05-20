import React from 'react';

export default function MetricsSelector({ validMetric, selectedMetric, setSelectedMetric, isMetricsOpen, setIsMetricsOpen }) {
    return (
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
    );
};
