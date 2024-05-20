import React from 'react';
import 'flag-icons/css/flag-icons.min.css';

export default function CountryInfo({ selectedCountry, selectedISOA2 }) {
    return (
        <div className="mb-4">
            <p className="mt-4 text-lg font-bold flex items-center">
                Selected Country: {selectedCountry ? (
                <>
                    {selectedCountry}
                    <span className={`fi fi-${selectedISOA2.toLowerCase()} ml-2`}/>
                </>
            ) : "None"}
            </p>
        </div>
    );
};

