import React from "react";
import styles from "./fibonacci-sequence.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";

interface IFibonacciSequenceProps {
  inputAmount: number;
  isStart?: boolean;
  onStart?: () => void;
  onComplete?: () => void;
}

type TNumber = {
  number: number;
  tail: number;
};

export const FibonacciSequence: React.FC<IFibonacciSequenceProps> = ({
  inputAmount,
  isStart,
  onStart,
  onComplete,
}) => {
  const [numbers, setNumbers] = React.useState<TNumber[]>([]);

  React.useEffect(() => {
    console.log("start animation");
    if (isStart) startAnimation();
  }, [isStart]);

  const renderNumbers = (numbers: TNumber[]) => {
    return (
      <>
        {numbers.map((char) => {
          return <Circle letter={`${char.number}`} tail={`${char.tail}`} />;
        })}
      </>
    );
  };

  const startAnimation = async () => {
    if (onStart) onStart();
    let complete = false;
    let processedNums = [] as TNumber[];
    while (!complete) {
      await delay(500);
      const { nums, result } = cycleSequence(processedNums);
      processedNums = nums.slice();
      complete = result;
      setNumbers(processedNums);
      console.log(processedNums);
    }
    if (onComplete) onComplete();
  };

  const cycleSequence = (
    nums: TNumber[]
  ): { nums: TNumber[]; result: boolean } => {
    console.log("nums at start:");
    console.log(nums);
    const { length } = nums;
    console.log(`length: ${length}`);
    if (length < 2) {
      const newNumber = { number: 1, tail: length } as TNumber;
      console.log(`number: 1, tail: ${length}`);
      nums.push(newNumber);
    } else {
      const newNumber = {
        number: nums[length - 2].number + nums[length - 1].number,
        tail: length,
      } as TNumber;
      console.log(`number: ${newNumber.number}, tail: ${length}`);
      nums.push(newNumber);
    }
    if (length === inputAmount) {
      console.log("done, nums on end:");
      console.log(nums);
      return { nums: nums, result: true };
    } else {
      console.log("next, nums on end:");
      console.log(nums);
      setNumbers(nums);
      return { nums: nums, result: false };
    }
  };

  return <div className={styles.numbers}>{renderNumbers(numbers)}</div>;
};
