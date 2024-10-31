import React from "react";
import { LineChart } from "@mui/x-charts";

export default function CountryLineChart({ chartData, selectedCountry, selectedMetric }) {
    return (
        <div
            className="flex flex-col p-5 mt-4 bg-gray-800 rounded-lg shadow-lg text-white w-full max-w-5xl mx-auto border-4 border-green-600"
            style={{
                height: '70vh',
                marginTop: '30px'
            }}>
            <div className="flex justify-center text-center mb-4">
                {chartData.length !== 0 &&
                    <h1 className="text-2xl font-semibold">{(`${selectedCountry}'s ${selectedMetric} from ${chartData[0].year} - ${chartData[chartData.length - 1].year} `).toUpperCase()}</h1>}
            </div>
            <hr className="mb-4 border-gray-600" />
            <LineChart
                series={[
                    { data: chartData.map(item => item.val) },
                ]}
                grid={{ vertical: true, horizontal: true }}
                yAxis={[{ label: `${selectedMetric}`, color: '#fff' }]}
                xAxis={[{ data: chartData.map(item => item?.year), label: 'Year', scaleType: 'band', color: '#fff' }]}
                margin={{ top: 10, bottom: 70, left: 70, right: 10 }}
                colors={['#4ade80']}
                style={{ color: '#fff' }}
            />
        </div>
    );
}
