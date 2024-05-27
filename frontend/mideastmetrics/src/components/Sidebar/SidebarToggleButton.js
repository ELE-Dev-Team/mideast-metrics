import React from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';

export default function SidebarToggleButton({ isSidebarOpen, setIsSidebarOpen }) {
    return (
        <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-full shadow-lg transition-transform duration-300 ease-in-out z-50"
        >
            {isSidebarOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
    );
}
