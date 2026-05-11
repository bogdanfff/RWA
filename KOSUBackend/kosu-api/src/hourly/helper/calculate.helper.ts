export function calculateEfficiency(produced: number, target: number): number {
    if (!target) return 0;
    return Math.min(+((produced / target) * 100).toFixed(2), 999.99);
}

export function calculateAbsentism(actual: number, planned: number): number {
    if (!planned) return 0;
    const absent = planned - actual;
    return Math.min(+((absent / planned) * 100).toFixed(2), 999.99);
}