import React from 'react';
import { MapIcon } from '@heroicons/react/solid';

export default function ViewOptions({ handleSideBarClick }) {
    const handleClick = (component) => {
        handleSideBarClick(component);
    };

    return (
        <div className="mb-2">
            <h2 className="text-xl font-semibold mb-2">View Options</h2>
            <ul className="space-y-2">
                <li
                    className="py-2 px-4 rounded transition duration-200 flex items-center hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleClick('View Map')}
                >
                    <MapIcon className="h-5 w-5 mr-2" />
                    View Map
                </li>
            </ul>
        </div>
    );
};
