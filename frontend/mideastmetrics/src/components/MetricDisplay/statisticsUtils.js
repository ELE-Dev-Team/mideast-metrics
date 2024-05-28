import { mean, median, mode, std } from 'mathjs';

export function calculateStatistics(data) {
    const values = data.map(item => item.val).filter(val => val > 0);

    if (values.length === 0) {
        return {
            average: 0,
            median: 0,
            mode: 0,
            stdDev: 0
        };
    }

    const calculatedMode = mode(values);
    return {
        average: mean(values),
        median: median(values),
        mode: Array.isArray(calculatedMode) ? calculatedMode[0] : calculatedMode,
        stdDev: std(values)
    };
}
