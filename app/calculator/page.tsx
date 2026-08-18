'use client';

import { useState } from 'react';
import { Roboto } from 'next/font/google';
import BmiResultModal from '@/components/calculator/BmiResultModal';
import GenderStep from '@/components/calculator/GenderStep';
import ValuesStep from '@/components/calculator/ValuesStep';
import { Gender } from '@/utils/bmi';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

type Step = 'gender' | 'values';

export default function CalculatorPage() {
  const [step, setStep] = useState<Step>('gender');
  const [gender, setGender] = useState<Gender | null>(null);
  const [weight, setWeight] = useState(65);
  const [age, setAge] = useState(26);
  const [height, setHeight] = useState(170);
  const [showResult, setShowResult] = useState(false);

  return (
    <div className={`${roboto.className} min-h-screen bg-white`}>
      <div className="mx-auto min-h-screen w-full max-w-[414px] px-[10px] pb-10 pt-[88px]">
        {step === 'gender' ? (
          <GenderStep
            selected={gender}
            onSelect={setGender}
            onContinue={() => setStep('values')}
          />
        ) : (
          <ValuesStep
            weight={weight}
            age={age}
            height={height}
            onWeightChange={setWeight}
            onAgeChange={setAge}
            onHeightChange={setHeight}
            onBack={() => setStep('gender')}
            onCalculate={() => setShowResult(true)}
          />
        )}
      </div>

      {gender && (
        <BmiResultModal
          open={showResult}
          weight={weight}
          height={height}
          age={age}
          gender={gender}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  );
}
