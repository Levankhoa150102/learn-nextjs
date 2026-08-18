'use client';

import Image from 'next/image';
import { Gender } from '@/utils/bmi';

type GenderStepProps = {
  selected: Gender | null;
  onSelect: (gender: Gender) => void;
  onContinue: () => void;
};

export default function GenderStep({ selected, onSelect, onContinue }: GenderStepProps) {
  return (
    <>
      <h1 className="text-center text-[32px] font-semibold drop-shadow-[0px_0px_2px_rgba(0,0,0,0.25)]">
        <span className="text-[#ffb534]">BMI</span>
        <span className="text-[#65b741]"> Calculator</span>
      </h1>

      <p className="mt-8 text-center text-[24px] font-medium text-[#0a1207]">
        Please choose your gender
      </p>

      <div className="mt-[30px] flex flex-col gap-[30px]">
        <button
          type="button"
          onClick={() => onSelect('male')}
          aria-label="Select Male"
          className={`relative h-[180px] w-full overflow-hidden rounded-[30px] shadow-[0px_2px_6px_1px_rgba(0,0,0,0.1)] transition ${
            selected === 'male' ? 'ring-4 ring-[#65b741]' : ''
          }`}
        >
          <Image
            src="/calculator/male-card.png"
            alt="Male"
            fill
            className="object-cover"
          />
        </button>

        <button
          type="button"
          onClick={() => onSelect('female')}
          aria-label="Select Female"
          className={`relative h-[180px] w-full overflow-hidden rounded-[30px] shadow-[0px_2px_6px_1px_rgba(0,0,0,0.1)] transition ${
            selected === 'female' ? 'ring-4 ring-[#ce922a]' : ''
          }`}
        >
          <Image
            src="/calculator/female-card.png"
            alt="Female"
            fill
            className="object-cover"
          />
        </button>
      </div>

      <button
        type="button"
        onClick={() => selected && onContinue()}
        disabled={!selected}
        className="mt-[50px] h-[70px] w-full rounded-[25px] bg-[#65b741] text-[32px] font-semibold text-white shadow-[1px_2px_3px_1px_rgba(0,0,0,0.12)] transition hover:bg-[#5aa53a] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
      </button>
    </>
  );
}
