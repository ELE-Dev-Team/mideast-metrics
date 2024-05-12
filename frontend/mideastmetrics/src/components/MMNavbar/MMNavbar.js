import MMLogo from "../../assets/mideastmetricslogo.png";
import React, {useState} from "react";
import "./Scrollbar.css";

function MMNavbar({validMetric, setSelectedMetric, currentYear, updateYear}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed w-full bg-stone-900 z-50 drop-shadow-[0_10px_10px_rgba(0,0,0,0.50)]">
      <div className="flex justify-between tracking-widest text-white font-extrabold">
        <div className="flex items-center justify-center flex-grow">
          <div className="fixed left-3 align-content-center border-2 roundeds border-green-800" style={{
            width: "10svw",
          }}>
            <div className="flex p-3 justify-content-between space-x-4 rounded w-full">
              <button onClick={updateYear(false)} disabled={currentYear === 1981}
                      className="bg-green-700 rounded text-white h-full w-2/3">{"←"}
              </button>
              <p className="mb-2">
                <span className="font-extrabold text-white">{currentYear}</span>
              </p>
              <button onClick={updateYear(true)} disabled={currentYear === 2022}
                      className="bg-green-700 rounded text-white h-full w-2/3">{"→"}
              </button>
            </div>
          </div>
          <h1>MIDEAST</h1>
          <img
              src={MMLogo ? MMLogo : null}
              className="w-24"
              alt="Logo for Mideast Metrics"
          />
          <h1>METRICS</h1>
          <div
              className="fixed top-3 right-3 bg-stone-900 rounded border-2 border-green-500/70 hover:border-green-500 align-content-center"
              style={{
                width: "10svw",
              }}>
            <button onClick={() => setIsOpen(!isOpen)}
                    className="p-4 bg rounded overflow-hidden text-white w-full">
              Metrics
            </button>
            {isOpen ? (
                <div>
                  <ul className="overflow-y-auto" style={{
                    height: "50svh",
                  }}>
                    {validMetric.map((metric) => (
                        <div>
                          <li key={metric}
                              className="flex-1 rounded truncate text-left"
                              onClick={() => {
                                setSelectedMetric(metric);
                                setIsOpen(false);
                              }}
                          >
                            {(metric).toUpperCase()}
                            <hr/>
                          </li>
                        </div>
                    ))}
                  </ul>
                </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}


export default MMNavbar;