import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryLineChart from "./CountryLineChart";

function getSelectedDataDistribution(countryDataDistribution, selectedMetric) {
    let dataArray = [];
    countryDataDistribution.forEach((yearData) => {
        if (yearData.countryId.year >= 1980 && yearData.countryId.year <= 2021 && yearData[selectedMetric] !== 0) {
            dataArray.push({
                val: parseData(yearData[selectedMetric], selectedMetric),
                year: yearData.countryId.year
            });
        }
    });
    dataArray.sort((a, b) => a.year - b.year);
    return dataArray;
}

function parseData(val, selectedMetric) {
    switch (selectedMetric) {
        case 'gdpValue': {
            return scaleMoneyPerBillion(val);
        }
        default:
            return val;
    }
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

export default function CountryYearDistribution({ selectedMetric, selectedCountry, currentYear }) {
    const [countryMetric, setCountryMetric] = useState([]);

    useEffect(() => {
        async function getMetrics() {
            try {
                const response = await axios.get(`https://mideast-metrics.delightfulglacier-fb9bf0e7.eastus.azurecontainerapps.io/api/v1/countries?name=${selectedCountry.toLowerCase()}`);
                setCountryMetric(response.data || []);
            } catch (err) {
                console.log(err);
            }
        }
        getMetrics();
    }, [selectedCountry, currentYear]);

    const chartData = getSelectedDataDistribution(countryMetric, selectedMetric);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <CountryLineChart
                chartData={chartData}
                selectedCountry={selectedCountry}
                selectedMetric={selectedMetric}
            />
        </div>
    );
}
