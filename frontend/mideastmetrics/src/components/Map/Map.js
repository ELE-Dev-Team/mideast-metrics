import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import MENA from "../../assets/MENA_.geojson";

function Map({ onSelectCountry, selectedCountry }) {
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([20, 6]);
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
    setZoom(zoom => zoom * 1.2);
  };

  const onZoomOut = () => {
    if (zoom === 1) return;
    setZoom(zoom => zoom / 1.2);
  };

  return (
    <div className="flex flex-col max-h-70 h-auto border rounded-lg border-3 bg-stone-900/70 mt-5 w-8/12"
      style={{
        maxHeight: "85svh"
      }}
    >
      <div className="justify-between inline-flex items-center p-2">
        <div className="flex items-center justify-self-start">
          <button onClick={onZoomIn} className="border-1 rounded mx-1 px-1.5 text-white">+</button>
          <button onClick={onZoomOut} className="border-1 rounded mx-1 px-1.5 text-white">-</button>
        </div>
        <div className="items-center justify-self-end">
          <form >
            <input name="text" onChange={handleFormChange} placeholder="Enter Country Name..." className="outline-none p-1 rounded" />
            <button type="submit" onClick={handleSubmitClick} className="border-1 rounded ml-2 p-1 text-white">Search</button>
          </form>
        </div>
      </div>
      <div className="justify-self-center overflow-hidden">
        <ComposableMap
          projection="geoAzimuthalEqualArea"
          projectionConfig={{
            center: [20, 6],
            scale: 500,
          }}
          className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.50)]"
        >
          <ZoomableGroup center={center} zoom={zoom}
            translateExtent={[[0, 0], [800, 1000]]}
            maxZoom={5}
            onMoveEnd={({ coordinates, zoom }) => {
              setCenter(coordinates);
              setZoom(zoom);
              console.log(coordinates, zoom)
            }} >
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
                      onClick={() => { onSelectCountry(geo.properties.ADMIN); }}
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