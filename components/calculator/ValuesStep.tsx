'use client';

import Image from 'next/image';

type ValuesStepProps = {
  weight: number;
  age: number;
  height: number;
  onWeightChange: (value: number) => void;
  onAgeChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onBack: () => void;
  onCalculate: () => void;
};

function StepperCard({
  label,
  unit,
  value,
  onDecrease,
  onIncrease,
}: {
  label: string;
  unit?: string;
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-[15px] rounded-[30px] bg-[#fbf6ee] p-[25px] shadow-[0px_2px_6px_1px_rgba(0,0,0,0.1)]">
      <p className="text-center text-[16px] font-medium text-[#acacac]">
        {label}
        {unit && <span> {unit}</span>}
      </p>
      <p className="text-[48px] font-bold leading-none text-[#ce922a]">{value}</p>
      <div className="flex gap-[30px]">
        <button type="button" onClick={onDecrease} className="size-10">
          <Image src="/calculator/btn-minus.svg" alt="Decrease" width={40} height={40} />
        </button>
        <button type="button" onClick={onIncrease} className="size-10">
          <Image src="/calculator/btn-plus.svg" alt="Increase" width={40} height={40} />
        </button>
      </div>
    </div>
  );
}

export default function ValuesStep({
  weight,
  age,
  height,
  onWeightChange,
  onAgeChange,
  onHeightChange,
  onBack,
  onCalculate,
}: ValuesStepProps) {
  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-0 top-1 size-6"
          aria-label="Go back"
        >
          <Image src="/calculator/arrow-back.svg" alt="" width={24} height={24} />
        </button>

        <h1 className="text-center text-[32px] font-semibold drop-shadow-[0px_0px_2px_rgba(0,0,0,0.25)]">
          <span className="text-[#ffb534]">BMI</span>
          <span className="text-[#65b741]"> Calculator</span>
        </h1>
      </div>

      <p className="mt-8 text-center text-[24px] font-medium text-[#0a1207]">
        Please Modify the values
      </p>

      <div className="mt-[30px] grid grid-cols-2 gap-[30px]">
        <StepperCard
          label="Weight"
          unit="(kg)"
          value={weight}
          onDecrease={() => onWeightChange(Math.max(20, weight - 1))}
          onIncrease={() => onWeightChange(Math.min(300, weight + 1))}
        />
        <StepperCard
          label="Age"
          value={age}
          onDecrease={() => onAgeChange(Math.max(1, age - 1))}
          onIncrease={() => onAgeChange(Math.min(120, age + 1))}
        />
      </div>

      <div className="mt-[30px] flex w-full flex-col items-center gap-[15px] rounded-[30px] bg-[#fbf6ee] p-[25px] shadow-[0px_2px_6px_1px_rgba(0,0,0,0.1)]">
        <p className="text-center text-[16px] font-medium text-[#acacac]">Height (cm)</p>
        <p className="text-[48px] font-bold leading-none text-[#ce922a]">{height}</p>
        <div className="relative h-[61px] w-full max-w-[320px]">
          <input
            type="range"
            min={100}
            max={250}
            value={height}
            onChange={(e) => onHeightChange(Number(e.target.value))}
            className="absolute inset-0 z-10 w-full cursor-pointer opacity-0"
            aria-label="Height in centimeters"
          />
          <div className="pointer-events-none relative h-full w-full">
            <Image
              src="/calculator/height-ruler.svg"
              alt=""
              fill
              className="object-contain"
            />
            <div
              className="absolute top-0 h-full w-[2px] bg-[#ce922a]"
              style={{ left: `${((height - 100) / 150) * 100}%` }}
            >
              <div className="absolute -top-1 left-1/2 size-0 -translate-x-1/2 border-x-[6px] border-t-[8px] border-x-transparent border-t-[#ce922a]" />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onCalculate}
        className="mt-[25px] h-[70px] w-full rounded-[25px] bg-[#65b741] text-[32px] font-semibold text-white shadow-[1px_2px_3px_1px_rgba(0,0,0,0.12)] transition hover:bg-[#5aa53a]"
      >
        Calculate
      </button>
    </>
  );
}
