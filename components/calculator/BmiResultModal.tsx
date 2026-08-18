'use client';

import Image from 'next/image';
import BmiBar from './BmiBar';
import { Gender, calculateBmi, getHealthyWeightRange } from '@/utils/bmi';

type BmiResultModalProps = {
  open: boolean;
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  onClose: () => void;
};

export default function BmiResultModal({
  open,
  weight,
  height,
  age,
  gender,
  onClose,
}: BmiResultModalProps) {
  if (!open) return null;

  const bmi = calculateBmi(weight, height);
  const bmiDisplay = bmi.toFixed(1);
  const { min, max } = getHealthyWeightRange(height);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[390px] rounded-[30px] bg-[#f0f8ec] px-[25px] py-[30px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.25)]">
        <p className="text-center text-[16px] font-medium text-[#0a1207]">Your BMI:</p>
        <p className="mt-[15px] text-center text-[64px] font-bold leading-none text-[#519234]">
          {bmiDisplay}
        </p>

        <div className="mt-[15px] flex justify-center">
          <BmiBar bmi={bmi} />
        </div>

        <div className="relative my-[15px] h-px w-full">
          <Image src="/calculator/divider.svg" alt="" fill className="object-cover" />
        </div>

        <div className="flex w-full justify-between text-center">
          <div className="flex flex-col gap-[5px]">
            <p className="text-[20px] font-semibold text-[#519234]">{weight} kg</p>
            <p className="text-[14px] capitalize text-[#acacac]">weight</p>
          </div>
          <div className="flex flex-col gap-[5px]">
            <p className="text-[20px] font-semibold text-[#519234]">{height} cm</p>
            <p className="text-[14px] capitalize text-[#acacac]">height</p>
          </div>
          <div className="flex flex-col gap-[5px]">
            <p className="text-[20px] font-semibold text-[#519234]">{age}</p>
            <p className="text-[14px] capitalize text-[#acacac]">Age</p>
          </div>
          <div className="flex flex-col gap-[5px]">
            <p className="text-[20px] font-semibold capitalize text-[#519234]">{gender}</p>
            <p className="text-[14px] capitalize text-[#acacac]">Gender</p>
          </div>
        </div>

        <div className="mt-[15px] text-center">
          <p className="text-[16px] font-medium leading-[1.5] text-[#0a1207]">
            Healthy weight for the height:
          </p>
          <p className="text-[16px] font-bold leading-[1.5] text-[#519234]">
            {min.toFixed(1)} kg - {max.toFixed(1)} kg
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-[15px] h-[70px] w-full rounded-[25px] bg-[#65b741] text-[32px] font-semibold text-white shadow-[1px_2px_3px_1px_rgba(0,0,0,0.12)] transition hover:bg-[#5aa53a]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
