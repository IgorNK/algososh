import React from "react";
import styles from "./sorting-array.module.css";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { SortMethod, ISortingArrayHandler } from "../../types/sorting";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";

interface ISortingArray {
  inputValues: number[];
  sortMethod: SortMethod;
  onStart?: () => void;
  onComplete?: () => void;
}

type TNumber = {
  index: number;
  state: ElementStates;
};

export const SortingArray = React.forwardRef(
  (props: ISortingArray, ref: React.Ref<ISortingArrayHandler>) => {
    const [numbers, setNumbers] = React.useState<TNumber[]>([]);
    const { inputValues, sortMethod, onStart, onComplete } = props;

    React.useEffect(() => {
      if (!inputValues) {
        setNumbers([]);
      } else {
        setNumbers(
          inputValues.map((value) => {
            return { index: value, state: ElementStates.Default } as TNumber;
          })
        );
      }
    }, [inputValues]);

    const resetNumbers = () => {
      const newNums = numbers.slice();
      newNums.forEach((num) => (num.state = ElementStates.Default));
      setNumbers(newNums);
    };

    const sortAscending = async () => {
      if (onStart) onStart();
      await startAnimation(Direction.Ascending, sortMethod);
      if (onComplete) onComplete();
    };

    const sortDescending = async () => {
      if (onStart) onStart();
      startAnimation(Direction.Descending, sortMethod);
      if (onComplete) onComplete();
    };

    const startAnimation = async (
      sortDirection: Direction,
      sortMethod: SortMethod
    ) => {
      resetNumbers();
      let complete = false;
      let processedNums = numbers.slice();
      let prevStart = 0;
      let prevCmp = 0;
      let currMaxInd = 0;
      let bubbleStart = 0;
      let bubbleEnd = numbers.length - 1;
      while (!complete) {
        await delay(100);
        if (sortMethod === SortMethod.Selection) {
          const { nums, result, currentStart, currentCmp, maxInd } =
            cycleSortSelection(
              processedNums,
              sortDirection,
              prevStart,
              prevCmp,
              currMaxInd
            );
          currMaxInd = maxInd;
          prevStart = currentStart;
          prevCmp = currentCmp;
          processedNums = nums.slice();
          complete = result;
        }
        if (sortMethod === SortMethod.Bubble) {
          const { nums, result, start, end } = cycleSortBubble(
            processedNums,
            sortDirection,
            bubbleStart,
            bubbleEnd
          );
          processedNums = nums.slice();
          bubbleStart = start;
          bubbleEnd = end;
          complete = result;
        }
        setNumbers(processedNums);
        console.log(processedNums);
      }
    };

    const cycleSortSelection = (
      nums: TNumber[],
      sortDirection: Direction,
      currentStart: number,
      currentCmp: number,
      maxInd: number
    ): {
      nums: TNumber[];
      result: boolean;
      currentStart: number;
      currentCmp: number;
      maxInd: number;
    } => {
      let { length } = nums;
      let newStart = currentStart;
      let newCmp = currentCmp;
      let newMaxInd = maxInd;
      console.log(
        `start: ${newStart}, cmp: ${newCmp}, max: ${newMaxInd}:${nums[newMaxInd].index}`
      );

      if (newCmp === newStart) {
        newCmp++;
      }

      if (newStart >= length - 1) {
        console.log("start pointer reached the END");
        nums[newStart].state = ElementStates.Modified;
        return {
          nums,
          result: true,
          currentStart: newStart,
          currentCmp: newCmp,
          maxInd: newMaxInd,
        };
      }

      if (nums[newStart].state === ElementStates.Default) {
        console.log(`coloring the new start at ${newStart}`);
        nums[newStart].state = ElementStates.Changing;
      }

      if (nums[newCmp].state === ElementStates.Changing) {
        nums[newCmp].state = ElementStates.Default;
        newCmp++;
      }

      if (newCmp >= length) {
        console.log("current pointer reached the end, iterating start.");
        console.log(
          `swapping start:${newStart}:${nums[newStart].index} and max:${newMaxInd}:${nums[newMaxInd].index}`
        );
        swap(nums, newStart, newMaxInd);
        nums[newStart].state = ElementStates.Modified;
        newStart++;
        newCmp = newStart + 1;
        newMaxInd = newStart;
        return {
          nums,
          result: false,
          currentStart: newStart,
          currentCmp: newCmp,
          maxInd: newMaxInd,
        };
      }

      if (nums[newCmp].state === ElementStates.Default) {
        nums[newCmp].state = ElementStates.Changing;
        if (nums[newCmp].index > nums[newMaxInd].index) {
          if (sortDirection === Direction.Descending) {
            newMaxInd = newCmp;
          }
        }
        if (nums[newCmp].index < nums[newMaxInd].index) {
          if (sortDirection === Direction.Ascending) {
            newMaxInd = newCmp;
          }
        }
        return {
          nums,
          result: false,
          currentStart: newStart,
          currentCmp: newCmp,
          maxInd: newMaxInd,
        };
      }

      return {
        nums,
        result: false,
        currentStart: newStart,
        currentCmp: newCmp,
        maxInd: newMaxInd,
      };
    };

    const swap = (arr: TNumber[], firstIndex: number, secondIndex: number) => {
      const temp = arr[firstIndex].index;
      arr[firstIndex].index = arr[secondIndex].index;
      arr[secondIndex].index = temp;
    };

    const cycleSortBubble = (
      nums: TNumber[],
      sortDirection: Direction,
      start: number,
      end: number
    ): { nums: TNumber[]; result: boolean; start: number; end: number } => {
      let { length } = nums;
      let newStart = start;
      let newEnd = end;
      console.log(`start: ${newStart}, end: ${newEnd}`);
      if (newEnd < 1) {
        nums[newEnd].state = ElementStates.Modified;
        return { nums, result: true, start: newStart, end: newEnd };
      }

      nums[newStart].state = ElementStates.Changing;
      nums[newStart + 1].state = ElementStates.Changing;

      if (nums[newStart].index > nums[newStart + 1].index) {
        if (sortDirection === Direction.Ascending) {
          console.log(
            `swapping ${newStart}:${nums[newStart].index} and ${newStart + 1}:${
              nums[newStart + 1].index
            }`
          );
          swap(nums, newStart, newStart + 1);
        }
      }
      if (nums[newStart].index < nums[newStart + 1].index) {
        if (sortDirection === Direction.Descending) {
          console.log(
            `swapping ${newStart}:${nums[newStart].index} and ${newStart + 1}:${
              nums[newStart + 1].index
            }`
          );
          swap(nums, newStart, newStart + 1);
        }
      }

      if (newStart + 1 >= newEnd) {
        nums[newStart + 1].state = ElementStates.Modified;
        nums[newStart].state = ElementStates.Default;
        if (newStart > 0) {
          nums[newStart - 1].state = ElementStates.Default;
        }
        newEnd--;
        newStart = -1;
      }

      if (newStart > 0) {
        nums[newStart - 1].state = ElementStates.Default;
      }

      newStart++;

      return { nums, result: false, start: newStart, end: newEnd };
    };

    const renderColumns = () => {
      return (
        <>
          {numbers.map((number) => {
            return <Column index={number.index} state={number.state} />;
          })}
        </>
      );
    };

    React.useImperativeHandle(ref, () => ({
      sortAscending,
      sortDescending,
    }));

    return <div className={styles.columns}>{renderColumns()}</div>;
  }
);
