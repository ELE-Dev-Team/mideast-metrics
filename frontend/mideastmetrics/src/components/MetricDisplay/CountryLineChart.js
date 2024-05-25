import React from "react";
import { LineChart } from "@mui/x-charts";

export default function CountryLineChart({ chartData, selectedCountry, selectedMetric }) {
    return (
        <div
            className="flex flex-col p-5 bg-slate-50 rounded outline outline-green-600 outline-5 text-white"
            style={{
                width: '66vw',
                height: '70vh'
            }}>
            <div className="flex justify-content-center text-center text-black">
                {chartData.length !== 0 &&
                    <h1>{(`${selectedCountry}'s ${selectedMetric} from ${chartData[0].year} - ${chartData[chartData.length - 1].year} `).toUpperCase()}</h1>}
            </div>
            <hr />
            <LineChart
                series={[
                    { data: chartData.map(item => item.val) },
                ]}
                grid={{ vertical: true, horizontal: true }}
                yAxis={[{ label: `${selectedMetric}` }]}
                xAxis={[{ data: chartData.map(item => item.year), label: 'Year', scaleType: 'band' }]}
                margin={{ top: 10, bottom: 70, left: 70, right: 10 }}
                colors={['#365314']}
            />
        </div>
    );
}
