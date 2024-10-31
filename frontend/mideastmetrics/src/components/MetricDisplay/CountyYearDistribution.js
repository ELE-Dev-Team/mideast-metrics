import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryLineChart from "./CountryLineChart";
import { supabase } from "../../supabaseClient";

function getSelectedDataDistribution(countryDataDistribution, selectedMetric) {
    let dataArray = [];
    countryDataDistribution.forEach((yearData) => {
        if (yearData.year >= 1980 && yearData.year <= 2021 && yearData[selectedMetric] !== 0) {
            dataArray.push({
                val: parseData(yearData[selectedMetric], selectedMetric),
                year: yearData.year
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
                const response = await supabase
                                                .from('_country')
                                                .select(`country_name, year, ${ selectedMetric }`)
                                                .eq('country_name', selectedCountry.toLowerCase())
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
            {chartData && <CountryLineChart
                chartData={chartData}
                selectedCountry={selectedCountry}
                selectedMetric={selectedMetric}
            />}
        </div>
    );
}
