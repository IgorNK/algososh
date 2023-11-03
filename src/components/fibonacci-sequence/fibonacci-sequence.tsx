import React from "react";
import styles from "./fibonacci-sequence.module.css";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { IFibonacciSequenceHandler } from "../../types/fibonacci";
import { fibonacciStep } from "./utils";

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
      let sequence: number[] = [];
      while (!complete) {
        await delay(500);
        const { nums, result } = cycleSequence(sequence, inputAmount + 1);
        sequence = nums.slice();
        complete = result;
        setNumbers(updateNumberElements(sequence));
      }
      if (onComplete) onComplete();
    };

    const cycleSequence = (
      nums: number[],
      sequenceLength: number,
    ): { nums: number[]; result: boolean } => {
      let sequenceStep = fibonacciStep(nums);
      let result = false;
      if (sequenceStep.length === sequenceLength) {
        result = true;
      } else {
        result = false;
      }
      return { nums: sequenceStep, result };
    };

    const updateNumberElements = (nums: number[]): TNumber[] => {
      return nums.map((value, index) => {
        return { number: value, tail: index };
      });
    };

    React.useImperativeHandle(ref, () => ({
      calculate,
    }));

    return (
      <div className={styles.numbers} data-cy="numbers">
        {renderNumbers(numbers)}
      </div>
    );
  },
);
