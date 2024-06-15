import React from "react";
import { BarChart } from "@mui/x-charts";

export default function CountryBarChart({ chartData, selectedMetric, currentYear }) {
    return (
        <div className="flex flex-col p-5 mt-4 bg-gray-800 rounded-lg shadow-lg text-white w-full max-w-5xl  border-4 border-green-600 h-[75vh]">
            <div className="flex justify-center text-center">
                {chartData.length !== 0 ? (
                    <h1 className="text-2xl font-semibold">{(`Rankings for ${selectedMetric} in ${currentYear}`).toUpperCase()}</h1>
                ) : (
                    <h1 className="text-2xl font-semibold">ERROR LOADING RANKINGS</h1>
                )}
            </div>
            <hr className="mb-4 border-gray-600" />
            <BarChart
                series={[
                    { data: chartData.map(item => item.val) },
                ]}
                grid={{ vertical: true, horizontal: true }}
                yAxis={[{ label: `${selectedMetric}`, color: '#fff' }]}
                xAxis={[{
                    data: chartData.map(item => item.country),
                    scaleType: 'band',
                    tickPlacement: 'middle',
                    tickLabelStyle: { transform: "rotate(-75.5deg) translate(-5px, -5px)" }
                }]}
                margin={{ top: 5, bottom: 153, left: 60, right: 0 }}
                colors={['#4ade80']}
                style={{ color: '#fff' }}
            />
        </div>
    );
}
