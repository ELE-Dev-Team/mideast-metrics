import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import './Charts.css';
import axios from "axios";

export default function CountryYearDistribution({ selectedMetric, selectedCountry, currentYear }) {
    const [countryMetric, setCountryMetric] = useState([]);

    useEffect(() => {
        async function getMetrics() {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/countries?name=${selectedCountry}`);
                if (response.data) {
                    setCountryMetric(response.data);
                } else {
                    console.log("Response is empty.");
                }
            } catch (err) {
                console.log(err);
            }
        }
        getMetrics();
    }, [selectedCountry, currentYear]);

    function getSelectedDataDistribution(countryDataDistribution) {
        let dataArray = [];
        countryDataDistribution.forEach((yearData) => {
            if (yearData.countryId.year >= 1980 && yearData.countryId.year <= 2021 && yearData[selectedMetric] !== 0) {
                dataArray.push({
                    val: parseData(yearData[selectedMetric]),
                    year: yearData.countryId.year
                });
            }
        });
        return dataArray;
    }

    function scaleMoneyPerBillion(moneyVal) {
        const units = ["", "K", "M", "B", "T"];
        let unitIndex = 0;
        let scaledValue = moneyVal;

        while (scaledValue >= 1000 && unitIndex < units.length - 1) {
            scaledValue /= 1000;
            unitIndex++;
        }
        scaledValue = scaledValue.toFixed(2);
        return scaledValue;
    }

    function parseData(val) {
        switch (selectedMetric) {
            case 'gdpValue': {
                return scaleMoneyPerBillion(val);
            }
            default:
                return val;
        }
    }

    const chartData = getSelectedDataDistribution(countryMetric);

    return (
        <div className="flex flex-col items-center justify-center h-full">
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
        </div>
    );
}
