import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { PlusIcon, MinusIcon, RefreshIcon, SearchIcon } from '@heroicons/react/solid';
import MENA from "../../assets/MENA_.geojson";

function Map({ onSelectCountry, selectedCountry, setValidCountries }) {
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([20, 10]);
  const [currentCountry, setCurrentCountry] = useState("");

  function handleFormChange(event) {
    setCurrentCountry(event.target.value);
  }

  function handleSubmitClick(event) {
    event.preventDefault();
    onSelectCountry(currentCountry);
    setCurrentCountry("");
  }

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
        });
    setValidCountries(countries);
  }

  useEffect(() => {
    getValidCountries();
  }, []);

  return (
      <div className="flex flex-col border rounded-lg border-3 bg-stone-900/70 h-full">
        <div className="flex justify-between items-center p-2">
          <div className="flex items-center space-x-2">
            <button onClick={onZoomIn} className="border rounded p-1 text-white hover:bg-gray-700">
              <PlusIcon className="h-5 w-5"/>
            </button>
            <button onClick={onZoomOut} className="border rounded p-1 text-white hover:bg-gray-700">
              <MinusIcon className="h-5 w-5"/>
            </button>
            <button onClick={onRecenter} className="border rounded p-1 text-white hover:bg-gray-700">
              <RefreshIcon className="h-5 w-5"/>
            </button>
          </div>
          <div className="items-center">
            <form onSubmit={handleSubmitClick} className="flex items-center space-x-2">
              <input
                  name="text"
                  onChange={handleFormChange}
                  placeholder="Enter Country Name..."
                  className="outline-none p-1 rounded"
              />
              <button type="submit" className="border rounded p-1 text-white hover:bg-gray-700">
                <SearchIcon className="h-5 w-5"/>
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center flex-grow">
          <ComposableMap
              projection="geoAzimuthalEqualArea"
              projectionConfig={{
                center: [20, 10],
                scale: 500,
              }}
              className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.50)]"
          >
            <ZoomableGroup
                center={center}
                zoom={zoom}
                translateExtent={[[0, 0], [800, 800]]}
                maxZoom={1.5}
                onMoveEnd={({ coordinates, zoom }) => {
                  setCenter(coordinates);
                  setZoom(zoom);
                  console.log(coordinates, zoom);
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
                                default: {
                                  fill: isSelected ? "#16a34a" : "#15803d",
                                  stroke: "#4ade80",
                                },
                                hover: {
                                  fill: "#16a34a",
                                },
                                pressed: {
                                  fill: "#4ade80",
                                },
                              }}
                              onClick={() => {
                                onSelectCountry(geo.properties.ADMIN);
                              }}
                          />
                      );
                    })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
  );
}

export default Map;
