import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import MENA from "../../assets/MENA_.geojson";
import Controls from "./Controls";
import CountryForm from "./CountryForm";

export default function Map({ onSelectCountry, selectedCountry, setValidCountries, validCountries }) {
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([20, 10]);

  const onZoomIn = () => {
    if (zoom > 3) return;
    setZoom((zoom) => zoom * 1.2);
  };

  const onZoomOut = () => {
    if (zoom === 1) return;
    setZoom((zoom) => zoom / 1.2);
  };

  const onRecenter = () => {
    setCenter([20, 10]);
    setZoom(1);
  };

  function getValidCountries() {
    let countries = [];
    fetch(MENA)
      .then((response) => response.json())
      .then((data) => {
        data.features.forEach((countryData) => {
          countries.push(countryData.properties.ADMIN);
        });
        setValidCountries(countries);
      });
  }

  useEffect(() => {
    getValidCountries();
  }, []);

  return (
    <div className="flex flex-col border rounded-lg border-3 bg-stone-900/70" style={{ width: '80%' }}>
      <div className="flex flex-col md:flex-row justify-between items-center p-2">
        <Controls onZoomIn={onZoomIn} onZoomOut={onZoomOut} onRecenter={onRecenter} />
        <CountryForm onSelectCountry={onSelectCountry} validCountries={validCountries} />
      </div>
      <div className="flex justify-center items-center flex-grow">
        <div className="w-full h-full">
          <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{ center: [20, 10], scale: 500 }}
            className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.50)] w-full h-full"
          >
            <ZoomableGroup
              center={center}
              zoom={zoom}
              translateExtent={[[0, 0], [800, 800]]}
              maxZoom={1.5}
              onMoveEnd={({ coordinates, zoom }) => {
                setCenter(coordinates);
                setZoom(zoom);
              }}
            >
              <Geographies geography={MENA}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isSelected = geo.properties.ADMIN === selectedCountry;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className="outline-none"
                        style={{
                          default: { fill: isSelected ? "#16a34a" : "#15803d", stroke: "#4ade80" },
                          hover: { fill: "#16a34a" },
                          pressed: { fill: "#4ade80" },
                        }}
                        onClick={() => onSelectCountry(geo.properties.ADMIN)}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
}
