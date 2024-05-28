import React from "react";
import { BarChart } from "@mui/x-charts";

export default function CountryBarChart({ chartData, selectedMetric, currentYear }) {
    return (
        <div
            className="flex flex-col p-5 mt-4 bg-gray-800 rounded-lg shadow-lg text-white w-full max-w-5xl mx-auto border-2 border-green-600"
            style={{
                height: '70vh',
                marginTop: '30px'
            }}>
            <div className="flex justify-center text-center mb-4">
                {chartData.length !== 0 &&
                    <h1 className="text-2xl font-semibold">{(`Rankings for ${selectedMetric} in ${currentYear}`).toUpperCase()}</h1>}
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
                    label: 'Country',
                    scaleType: 'band',
                    color: '#fff'
                }]}
                margin={{ top: 10, bottom: 70, left: 70, right: 10 }}
                colors={['#4ade80']}
                style={{ color: '#fff' }}
            />
        </div>
    );
}
