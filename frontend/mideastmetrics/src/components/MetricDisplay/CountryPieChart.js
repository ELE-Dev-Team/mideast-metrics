import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from "recharts";
import 'flag-icons/css/flag-icons.min.css';

const COLORS = ['#006400', '#228B22', '#32CD32', '#3CB371', '#2E8B57', '#66CDAA', '#8FBC8F', '#20B2AA'];

const CustomTooltip = ({ active, payload, total }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const percent = ((data.value / total) * 100).toFixed(2);
        return (
            <div className="custom-tooltip bg-gray-800 p-2 border border-green-600 rounded shadow-lg text-white">
                <p className="label text-lg font-semibold" style={{ color: data.fill }}>{data.name}</p>
                <p className="intro text-sm text-gray-300">{`Value: ${data.value}`}</p>
                <p className="desc text-sm text-gray-400">{`Percentage: ${percent}%`}</p>
            </div>
        );
    }
    return null;
};

export default function CountryPieChart({ chartData, selectedMetric }) {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const data = chartData.map((item) => ({
        name: item.country,
        value: parseFloat(item.val),
        isoA2: item.isoA2
    }));

    const total = data.reduce((acc, item) => acc + item.value, 0);

    return (
        <div
            className="flex flex-col p-5 mt-4 bg-gray-800 rounded-lg shadow-lg text-white w-full max-w-5xl mx-auto border-4 border-green-600"
            style={{
                height: '70vh',
                marginTop: '30px'
            }}>
            <div className="flex justify-center text-center mb-4">
                {chartData.length !== 0 &&
                    <h1 className="text-2xl font-semibold">{(`Pie Distribution of ${selectedMetric}`).toUpperCase()}</h1>}
            </div>
            <hr className="mb-4 border-gray-600" />
            <div className="flex justify-center items-center h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius="75%"
                            innerRadius="50%"
                            fill="#8884d8"
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip total={total} />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
