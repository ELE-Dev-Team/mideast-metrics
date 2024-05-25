import React from "react";
import { PlusIcon, MinusIcon, RefreshIcon } from '@heroicons/react/solid';

export default function Controls({ onZoomIn, onZoomOut, onRecenter }) {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center space-x-2">
        <button onClick={onZoomIn} className="border rounded p-1 text-white hover:bg-gray-700">
          <PlusIcon className="h-5 w-5" />
        </button>
        <button onClick={onZoomOut} className="border rounded p-1 text-white hover:bg-gray-700">
          <MinusIcon className="h-5 w-5" />
        </button>
        <button onClick={onRecenter} className="border rounded p-1 text-white hover:bg-gray-700">
          <RefreshIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
