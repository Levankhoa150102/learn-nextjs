export type Gender = 'male' | 'female';

export type BmiCategory = {
  label: string;
  color: string;
};

export function calculateBmi(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return { label: 'Underweight', color: '#84cdee' };
  if (bmi < 25) return { label: 'Normal', color: '#78b060' };
  if (bmi < 30) return { label: 'Overweight', color: '#ffdf32' };
  return { label: 'Obese', color: '#f5554a' };
}

export function getHealthyWeightRange(heightCm: number): { min: number; max: number } {
  const heightM = heightCm / 100;
  return {
    min: 18.5 * heightM * heightM,
    max: 24.9 * heightM * heightM,
  };
}

export function getBmiBarPosition(bmi: number): number {
  const min = 15;
  const max = 40;
  const clamped = Math.min(Math.max(bmi, min), max);
  return ((clamped - min) / (max - min)) * 100;
}
