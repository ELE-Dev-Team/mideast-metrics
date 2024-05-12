import React, { useState } from "react";

export default function MetricsButton({ validMetric, setSelectedMetric }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="fixed bottom-0 right-0 m-5 flex flex-col-reverse items-end">
            {isOpen ? (
                <ul dir="rtl" className="bg-slate-500/70 rounded overflow-auto" style={{
                    maxHeight: "50svh",
                }}>
                    {validMetric.map((metric) => (
                        <li key={metric}
                            className="flex-1 rounded truncate text-left"
                            onClick={() => {
                                setSelectedMetric(metric);
                                setIsOpen(false);
                            }}
                        >
                            {metric}
                            <hr/>
                        </li>
                    ))}
                </ul>
            ) : null}
            {!isOpen ?
                <button onClick={() => setIsOpen(!isOpen)} className="p-4 border-5 border-green-500 bg-stone-900/70 hover:bg-green-600 rounded-full overflow-hidden text-white">
                    Metrics
                </button> : null
            }
        </div>
    );
}
