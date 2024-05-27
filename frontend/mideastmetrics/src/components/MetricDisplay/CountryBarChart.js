import React from "react";
import { BarChart } from "@mui/x-charts";

export default function CountryBarChart({ chartData, selectedMetric, currentYear }) {
    return (
        <div
            className="flex flex-col p-5 bg-slate-50 rounded outline outline-green-600 outline-5 text-white">
            <div className="flex justify-center text-center text-black">
                {chartData.length !== 0 &&
                    <h1>{(`Rankings for ${selectedMetric} in ${currentYear}`).toUpperCase()}</h1>}
            </div>
            <hr />
            <BarChart
                series={[
                    { data: chartData.map(item => item.val) },
                ]}
                grid={{ vertical: true, horizontal: true }}
                yAxis={[{ label: `${selectedMetric}` }]}
                xAxis={[{ data: chartData.map(item => item.country), label: 'Country', scaleType: 'band' }]}
                margin={{ top: 10, bottom: 70, left: 70, right: 10 }}
                colors={['#365314']}
            />
        </div>
    );
}
