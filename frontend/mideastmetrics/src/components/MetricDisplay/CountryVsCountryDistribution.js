import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryBarChart from "./CountryBarChart";
import CountryPieChart from "./CountryPieChart";
import TopThreeCountries from "./TopThreeCountries";
import BottomThreeCountries from "./BottomThreeCountries";
import MetricStatistics from "./MetricStatistics";
import { calculateStatistics } from "./statisticsUtils";
import { supabase } from "../../supabaseClient";

function getSelectedDataDistribution(countryDataDistribution, selectedMetric, geoJsonData) {
    let dataArray = [];
    countryDataDistribution.forEach((countryData) => {
        if (countryData) {
            let value = countryData[selectedMetric];
            if (value > 0) {
                if (selectedMetric === 'gdpValue') {
                    value = scaleMoneyPerBillion(value);
                }
                const countryFeature = geoJsonData.features.find(
                    (feature) => feature.properties.ADMIN === countryData.country_name
                );
                const isoA2 = countryFeature ? countryFeature.properties.ISO_A2 : '';
                const countryName = capitalizeWords(countryData.country_name);
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



export default function CountryVsCountryDistribution({ selectedCountry, selectedMetric, currentYear, validCountries, geoJsonData }) {
    const [countryMetric, setCountryMetric] = useState([]);
    useEffect(() => {
        async function getMetrics() {
            try {
                const responses = await Promise.all(
                    validCountries.map(async (country) => {
                        const response = await supabase
                                                .from('_country')
                                                .select(`country_name, ${ selectedMetric }`)
                                                .eq('country_name', country.toLowerCase())
                        if (response.data.length > 0) {
                            return response.data[0];
                        }
                    })
                );
                const uniqueResponses = Array.from(new Map(responses.filter(Boolean).map((item => [item?.country_name, item]))).values());
                setCountryMetric(uniqueResponses);
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
