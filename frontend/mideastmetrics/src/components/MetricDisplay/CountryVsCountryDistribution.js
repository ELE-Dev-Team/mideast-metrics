import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryBarChart from "./CountryBarChart";
import CountryPieChart from "./CountryPieChart";
import TopThreeCountries from "./TopThreeCountries";
import BottomThreeCountries from "./BottomThreeCountries";
import MetricStatistics from "./MetricStatistics";
import { calculateStatistics } from "./statisticsUtils"; // Assuming the utility functions are in statisticsUtils.js

function getSelectedDataDistribution(countryDataDistribution, selectedMetric, geoJsonData) {
    let dataArray = [];
    countryDataDistribution.forEach((countryData) => {
        if (countryData) {
            let value = countryData[selectedMetric];
            if (value > 0) { // Only include countries with non-zero values
                if (selectedMetric === 'gdpValue') {
                    value = scaleMoneyPerBillion(value);
                }
                const countryFeature = geoJsonData.features.find(
                    (feature) => feature.properties.ADMIN === countryData.countryId.countryName
                );
                const isoA2 = countryFeature ? countryFeature.properties.ISO_A2 : '';
                const countryName = capitalizeWords(countryData.countryId.countryName);
                dataArray.push({
                    val: value,
                    country: countryName,
                    isoA2: isoA2
                });
            }
        }
    });
    dataArray.sort((a, b) => a.val - b.val);
    return dataArray;
}

function capitalizeWords(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

function scaleMoneyPerBillion(moneyVal) {
    return (moneyVal / 1e9).toFixed(2);
}

function isSelectedCountryInTopThree(topThreeData, selectedCountryData) {
    return topThreeData.some(item => item.country === selectedCountryData.country);
}

function isSelectedCountryInBottomThree(bottomThreeData, selectedCountryData) {
    return bottomThreeData.some(item => item.country === selectedCountryData.country);
}

export default function CountryVsCountryDistribution({ selectedCountry, selectedMetric, currentYear, validCountries, geoJsonData }) {
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
                setCountryMetric(responses.filter(Boolean));
            } catch (err) {
                console.log(err);
            }
        }
        getMetrics();
    }, [currentYear, validCountries]);

    const chartData = getSelectedDataDistribution(countryMetric, selectedMetric, geoJsonData);
    const topThreeData = [...chartData].sort((a, b) => b.val - a.val).slice(0, 3);
    const bottomThreeData = [...chartData].sort((a, b) => a.val - b.val).slice(0, 3);
    const selectedCountryData = chartData.find(item => item.country === selectedCountry);
    const statistics = calculateStatistics(chartData);

    const showSelectedCountryInTop = selectedCountryData && !isSelectedCountryInTopThree(topThreeData, selectedCountryData);
    const showSelectedCountryInBottom = selectedCountryData && !isSelectedCountryInBottomThree(bottomThreeData, selectedCountryData);

    return (
        <div className="flex flex-col items-center justify-center w-full space-y-8">
            <CountryBarChart
                chartData={chartData}
                selectedMetric={selectedMetric}
                currentYear={currentYear}
            />
            <CountryPieChart
                chartData={chartData}
                selectedMetric={selectedMetric}
            />
            <TopThreeCountries
                topThreeData={topThreeData}
                selectedCountryData={selectedCountryData}
                selectedMetric={selectedMetric}
                currentYear={currentYear}
            />
            <BottomThreeCountries
                bottomThreeData={bottomThreeData}
                selectedCountryData={selectedCountryData}
                selectedMetric={selectedMetric}
                currentYear={currentYear}
                totalCountries={chartData.length}
            />
            <MetricStatistics
                statistics={statistics}
                selectedMetric={selectedMetric}
                currentYear={currentYear}
            />
        </div>
    );
}
