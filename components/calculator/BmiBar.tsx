'use client';

import Image from 'next/image';
import { getBmiCategory } from '@/utils/bmi';

type BmiBarProps = {
  bmi: number;
};

const SEGMENTS = [
  { color: '#84cdee', count: 6 },
  { color: '#78b060', count: 15 },
  { color: '#ffdf32', count: 10 },
  { color: '#f5554a', count: 13 },
];

export default function BmiBar({ bmi }: BmiBarProps) {
  const category = getBmiCategory(bmi);
  const position = Math.min(Math.max(((bmi - 15) / 25) * 100, 0), 100);

  return (
    <div className="relative w-[280px]">
      <div
        className="absolute -top-[23px] flex flex-col items-center -translate-x-1/2 transition-all duration-300"
        style={{ left: `${position}%` }}
      >
        <div
          className="rounded px-[5px] py-[2px] text-[12px] font-semibold text-white"
          style={{ backgroundColor: category.color }}
        >
          {category.label}
        </div>
        <div className="rotate-180">
          <Image
            src="/calculator/polygon-indicator.svg"
            alt=""
            width={6}
            height={3}
            className="block"
          />
        </div>
      </div>

      <div className="mt-[23px] flex gap-px">
        {SEGMENTS.map((segment) =>
          Array.from({ length: segment.count }).map((_, i) => (
            <div
              key={`${segment.color}-${i}`}
              className="h-5 w-[6px] rounded"
              style={{ backgroundColor: segment.color }}
            />
          ))
        )}
      </div>
    </div>
  );
}
