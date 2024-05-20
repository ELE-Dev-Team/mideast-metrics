import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import axios from "axios";

export default function CountryVsCountryDistribution({ selectedCountry, selectedMetric, currentYear, validCountries }) {
    const [countryMetric, setCountryMetric] = useState([]);

    useEffect(() => {
        async function getMetrics() {
            try {
                const responses = await Promise.all(
                    validCountries.map(async (country) => {
                        const response = await axios.get(`http://localhost:8080/api/v1/countries?name=${country}&year=${currentYear}`);
                        if (response.data.length > 0) {
                            return response.data[0];
                        }
                    })
                );
                if (responses.length !== 0) {
                    setCountryMetric(responses);
                } else {
                    console.log("Response is empty.");
                }
            } catch (err) {
                console.log(err);
            }
        }
        getMetrics();
    }, [currentYear, validCountries]);

    function getSelectedDataDistribution(countryDataDistribution) {
        let dataArray = [];
        countryDataDistribution.forEach((countryData) => {
            if (countryData) {
                dataArray.push({
                    val: countryData[selectedMetric],
                    country: countryData.countryId.countryName
                });
            }
        });
        dataArray.sort((a, b) => a.val - b.val);
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

    function isSelectedCountryInTopThree(topThreeData, selectedCountryData) {
        return topThreeData.some(item => item.country === selectedCountryData.country);
    }

    const chartData = getSelectedDataDistribution(countryMetric);
    const topThreeData = [...chartData].sort((a, b) => b.val - a.val).slice(0, 3);
    const selectedCountryData = chartData.find(item => item.country === selectedCountry);

    const showSelectedCountry = selectedCountryData && !isSelectedCountryInTopThree(topThreeData, selectedCountryData);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div
                className="flex flex-col p-5 bg-slate-50 rounded outline outline-green-600 outline-5 text-white"
                style={{
                    width: '66vw',
                    height: '70vh'
                }}>
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
            <div
                className="flex flex-col p-5 mt-4 bg-slate-50 rounded outline outline-green-600 outline-5 text-black"
                style={{
                    width: '66vw'
                }}>
                <div className="text-center mb-4">
                    {topThreeData.length !== 0 &&
                        <h1 className="font-bold">{`Top 3 Countries for ${selectedMetric} in ${currentYear}`.toUpperCase()}</h1>}
                </div>
                <hr className="mb-3" />
                <ul className="list-decimal pl-6">
                    {topThreeData.map((item, index) => (
                        <li key={index} className="mb-2" style={{ color: item.country === selectedCountry ? 'red' : 'black', fontWeight: item.country === selectedCountry ? 'bold' : 'normal' }}>
                            <span>{`${item.country}: `}</span><span className="font-normal">{item.val}</span>
                        </li>
                    ))}
                    {showSelectedCountry && (
                        <>
                            <li className="mt-4 font-bold">...</li>
                            <li className="mb-2" style={{ color: 'red', fontWeight: 'bold' }}>
                                <span>{`${selectedCountryData.country}: `}</span><span className="font-normal">{selectedCountryData.val}</span>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}
