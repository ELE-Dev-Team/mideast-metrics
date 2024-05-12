import React, { useState, useEffect } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import CountryYearDistribution from "./CountyYearDistribution";

const valid_metrics = [
    "gdpValue",
    "gdpGrowth",
    "gdpPerCapita",
    "pppValue",
    "lifeExpectancyM",
    "lifeExpectancyF",
    "lifeExpectancyT",
    "mortalityRateM",
    "mortalityRateF",
    "mortalityRateT",
    "crudeBirthRateT",
    "taxes",
    "netMigration",
    "importsOfGoodsAndServices",
    "malePop",
    "femalePop",
    "totalPop",
    "unemploymentRateT",
    "unemploymentRateF",
    "unemploymentRateM"
];


export default function Metrics({selectedCountry, selectedISOA2, selectedISOA3, selectedMetric}) {

  
  return (
      <div>
      </div>
  );
}

/*
 */
