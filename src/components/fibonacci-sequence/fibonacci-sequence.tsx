import React from "react";
import styles from "./fibonacci-sequence.module.css";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { IFibonacciSequenceHandler } from "../../types/fibonacci";

interface IFibonacciSequenceProps {
  inputAmount: number;
  onStart?: () => void;
  onComplete?: () => void;
}

type TNumber = {
  number: number;
  tail: number;
};

export const FibonacciSequence = React.forwardRef(
  (
    props: IFibonacciSequenceProps,
    ref: React.Ref<IFibonacciSequenceHandler>,
  ) => {
    const { inputAmount, onStart, onComplete } = props;
    const [numbers, setNumbers] = React.useState<TNumber[]>([]);

    const renderNumbers = (numbers: TNumber[]) => {
      return (
        <>
          {numbers.map((char, index) => {
            return (
              <Circle
                key={`${char.number}-${index}-${char.tail}`}
                letter={`${char.number}`}
                tail={`${char.tail}`}
              />
            );
          })}
        </>
      );
    };

    const calculate = async () => {
      if (onStart) onStart();
      let complete = false;
      let processedNums = [] as TNumber[];
      while (!complete) {
        await delay(500);
        const { nums, result } = cycleSequence(processedNums);
        processedNums = nums.slice();
        complete = result;
        setNumbers(processedNums);
      }
      if (onComplete) onComplete();
    };

    const cycleSequence = (
      nums: TNumber[],
    ): { nums: TNumber[]; result: boolean } => {
      const { length } = nums;
      if (length < 2) {
        const newNumber = { number: 1, tail: length } as TNumber;
        nums.push(newNumber);
      } else {
        const newNumber = {
          number: nums[length - 2].number + nums[length - 1].number,
          tail: length,
        } as TNumber;
        nums.push(newNumber);
      }
      if (length === inputAmount) {
        return { nums: nums, result: true };
      } else {
        setNumbers(nums);
        return { nums: nums, result: false };
      }
    };

    React.useImperativeHandle(ref, () => ({
      calculate,
    }));

    return <div className={styles.numbers}>{renderNumbers(numbers)}</div>;
  },
);
