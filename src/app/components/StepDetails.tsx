import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  label?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, label = "Datos básicos" }) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#00008F] flex items-center justify-center text-white text-sm font-bold">
          {currentStep}
        </div>
        <span className="text-sm font-semibold text-gray-700">{label}</span>
      </div>
      
      <div className="flex items-center gap-1 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#FF4E56] transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      
      <p className="text-xs text-gray-500 text-left">Paso {currentStep} de {totalSteps}</p>
    </div>
  );
};
