import React, {useEffect, useState} from "react";
import {LineChart} from "@mui/x-charts";
import axios from "axios";


export default function CountryVsCountryDistribution({ selectedMetric, selectedCountry, currentYear, validCountries }) {
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
    }, [selectedCountry, currentYear, validCountries]);

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
        console.log(val);
        switch (selectedMetric) {
            case 'gdpValue': {
                return scaleMoneyPerBillion(val);
            }
            default:
                return val
        }
    }

    const chartData = getSelectedDataDistribution(countryMetric);

    return (
        <div
            className="flex flex-col justify-between m-20 p-5 bg-slate-300 rounded outline outline-green-600 outline-5 text-white"
            style={{
                width: '66svw',
                height: '70svh'
            }}>
            <div className="flex justify-content-center text-center text-black">
                {chartData.length !== 0 && <h1>{(`Rankings for ${selectedMetric} in ${currentYear}`).toUpperCase()}</h1>}
            </div>
            <hr/>
            <LineChart
                series={[
                    {data: chartData.map(item => item.val)},
                ]}
                grid={{vertical: true, horizontal: true}}
                yAxis={[{label: `${selectedMetric}`}]}
                xAxis={[{data: chartData.map(item => item.country), label: 'Year', scaleType: 'band',}]}
                margin={{top: 10, bottom: 70, left: 70, right: 10}}
                colors={['#365314']}
            />
        </div>
    );
}
