import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryBarChart from "./CountryBarChart";
import TopThreeCountries from "./TopThreeCountries";

function getSelectedDataDistribution(countryDataDistribution, selectedMetric) {
    let dataArray = [];
    countryDataDistribution.forEach((countryData) => {
        if (countryData) {
            let value = countryData[selectedMetric];
            if (selectedMetric === 'gdpValue') {
                value = scaleMoneyPerBillion(value);
            }
            dataArray.push({
                val: value,
                country: countryData.countryId.countryName
            });
        }
    });
    dataArray.sort((a, b) => a.val - b.val);
    return dataArray;
}

function scaleMoneyPerBillion(moneyVal) {
    return (moneyVal / 1e9).toFixed(2);
}

function isSelectedCountryInTopThree(topThreeData, selectedCountryData) {
    return topThreeData.some(item => item.country === selectedCountryData.country);
}

export default function CountryVsCountryDistribution({ selectedCountry, selectedMetric, currentYear, validCountries }) {
    const [countryMetric, setCountryMetric] = useState([]);

    useEffect(() => {
        async function getMetrics() {
            try {
                const responses = await Promise.all(
                    validCountries.map(async (country) => {
                        const response = await axios.get(`https://api.spring93.dev/api/v1/countries?name=${country.toLowerCase()}&year=${currentYear}`);
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

    const chartData = getSelectedDataDistribution(countryMetric, selectedMetric);
    const topThreeData = [...chartData].sort((a, b) => b.val - a.val).slice(0, 3);
    const selectedCountryData = chartData.find(item => item.country === selectedCountry);

    const showSelectedCountry = selectedCountryData && !isSelectedCountryInTopThree(topThreeData, selectedCountryData);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <CountryBarChart
                chartData={chartData}
                selectedMetric={selectedMetric}
                currentYear={currentYear}
            />
            {/* <TopThreeCountries
                topThreeData={topThreeData}
                selectedCountryData={selectedCountryData}
                showSelectedCountry={showSelectedCountry}
                selectedMetric={selectedMetric}
                currentYear={currentYear}
                scaleMoneyPerBillion={scaleMoneyPerBillion}
            /> */}
        </div>
    );
}
