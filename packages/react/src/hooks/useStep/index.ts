import { SetStateAction, useCallback, useMemo, useState } from 'react';
import { isFunction } from '@modern-kit/utils';

type StepType = 'nextStep' | 'prevStep';

export type StepAction = ({
  prev,
  next,
}: {
  prev: number;
  next: number;
}) => void;

export interface UseStepProps {
  maxStep: number;
  initialStep?: number;
  infinite?: boolean;
}

export function useStep({
  maxStep,
  initialStep = 0,
  infinite = false,
}: UseStepProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const hasNextStep = useMemo(
    () => currentStep < maxStep,
    [currentStep, maxStep]
  );
  const hasPrevStep = useMemo(() => currentStep > 0, [currentStep]);

  const setStep = useCallback(
    (step: SetStateAction<number>, action?: StepAction) => {
      const nextStep = isFunction(step) ? step(currentStep) : step;
      const isValidNextStep = nextStep >= 0 && nextStep <= maxStep;

      if (isValidNextStep) {
        if (action) {
          action({ prev: currentStep, next: nextStep });
        }
        setCurrentStep(step);
        return;
      }
      throw new Error('Step not valid');
    },
    [currentStep, maxStep]
  );

  const getNextStep = useCallback(
    (type: StepType, isOverflow: boolean) => {
      const isNextStepType = type === 'nextStep';

      if (isOverflow) {
        return isNextStepType ? 0 : maxStep;
      }
      return isNextStepType ? currentStep + 1 : currentStep - 1;
    },
    [maxStep, currentStep]
  );

  const handleStepOverflow = useCallback(
    (type: StepType, action?: StepAction) => {
      if (!infinite) return;

      const nextStep = getNextStep(type, true);

      if (action) {
        action({ prev: currentStep, next: nextStep });
      }
      setCurrentStep(nextStep);
    },
    [infinite, currentStep, getNextStep]
  );

  const handleStepWithinBounds = useCallback(
    (type: StepType, action?: StepAction) => {
      const nextStep = getNextStep(type, false);

      if (action) {
        action({ prev: currentStep, next: nextStep });
      }
      setCurrentStep(nextStep);
    },
    [currentStep, getNextStep]
  );

  const goToNextStep = useCallback(
    (action?: StepAction) => {
      if (!hasNextStep) {
        handleStepOverflow('nextStep', action);
        return;
      }
      handleStepWithinBounds('nextStep', action);
    },
    [hasNextStep, handleStepWithinBounds, handleStepOverflow]
  );

  const goToPrevStep = useCallback(
    (action?: StepAction) => {
      if (!hasPrevStep) {
        handleStepOverflow('prevStep', action);
        return;
      }
      handleStepWithinBounds('prevStep', action);
    },
    [hasPrevStep, handleStepWithinBounds, handleStepOverflow]
  );

  const resetStep = useCallback(
    (action?: StepAction) => {
      if (action) {
        action({ prev: currentStep, next: initialStep });
      }
      setCurrentStep(initialStep);
    },
    [currentStep, initialStep]
  );

  return {
    currentStep,
    hasNextStep,
    hasPrevStep,
    setStep,
    goToNextStep,
    goToPrevStep,
    resetStep,
  };
}
