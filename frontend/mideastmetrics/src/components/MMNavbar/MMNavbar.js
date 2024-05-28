import MMLogo from "../../assets/mideastmetricslogo.png";
import React from "react";

export default function MMNavbar() {
  return (
    <div className="w-full bg-gray-900 text-white shadow-lg p-4 fixed top-0 left-0 z-50 flex items-center justify-center drop-shadow-[0_10px_15px_rgba(0,0,0,0.75)]">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold tracking-widest">MIDEAST</h1>
        <img
          src={MMLogo ? MMLogo : null}
          className="w-16"
          alt="Logo for Mideast Metrics"
        />
        <h1 className="text-xl font-bold tracking-widest">METRICS</h1>
      </div>
    </div>
  );
}
