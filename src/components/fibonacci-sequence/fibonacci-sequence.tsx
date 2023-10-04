import React from "react";

interface IFibonacciSequenceProps {
  inputAmount?: string;
  isStart?: boolean;
  onStart?: () => void;
  onComplete?: () => void;
}
export const FibonacciSequence: React.FC<IFibonacciSequenceProps> = ({
  inputAmount,
  isStart,
  onStart,
  onComplete,
}) => {
  return <></>;
};
