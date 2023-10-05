import React from "react";
import styles from "./sorting-array.module.css";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { SortMethod } from "../../types/sorting";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";

interface ISortingArray {
  inputValues: number[];
  sortMethod: SortMethod;
  sortDirection: Direction | null;
  isStart?: boolean;
  onStart?: () => void;
  onComplete?: () => void;
}

type TNumber = {
  index: number;
  state: ElementStates;
};

export const SortingArray: React.FC<ISortingArray> = ({
  inputValues,
  sortMethod,
  sortDirection,
  isStart,
  onStart,
  onComplete,
}) => {
  const [numbers, setNumbers] = React.useState<TNumber[]>([]);

  React.useEffect(() => {
    console.log("start animation");
    if (isStart) startAnimation();
  }, [isStart]);

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

  const startAnimation = async () => {
    if (!sortDirection) {
      return;
    }
    if (onStart) onStart();
    let complete = false;
    let processedNums = [] as TNumber[];
    while (!complete) {
      await delay(500);
      if (sortMethod === SortMethod.Selection) {
        const { nums, result } = cycleSortSelection(
          processedNums,
          sortDirection
        );
        processedNums = nums.slice();
        complete = result;
      }
      if (sortMethod === SortMethod.Bubble) {
        const { nums, result } = cycleSortBubble(processedNums, sortDirection);
        processedNums = nums.slice();
        complete = result;
      }
      setNumbers(processedNums);
      console.log(processedNums);
    }
    if (onComplete) onComplete();
  };

  const cycleSortSelection = (
    nums: TNumber[],
    sortDirection: Direction
  ): { nums: TNumber[]; result: boolean } => {
    if (sortDirection === Direction.Ascending) {
      console.log("Selection sort, ascending");
    }
    if (sortDirection === Direction.Descending) {
      console.log("Selection sort, descending");
    }
    return { nums, result: true };
  };

  const cycleSortBubble = (
    nums: TNumber[],
    sortDirection: Direction
  ): { nums: TNumber[]; result: boolean } => {
    if (sortDirection === Direction.Ascending) {
      console.log("bubble sort, ascending");
    }
    if (sortDirection === Direction.Descending) {
      console.log("bubble sort, descending");
    }
    return { nums, result: true };
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

  return <div className={styles.columns}>{renderColumns()}</div>;
};
