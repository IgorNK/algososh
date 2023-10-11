import React from "react";
import styles from "./sorting-array.module.css";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { SortMethod, ISortingArrayHandler } from "../../types/sorting";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import {
  getSortBubbleSteps,
  getSortSelectionSteps,
  getElementStateBubble,
  getElementStateSelection,
} from "./utils";

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
    const [msDelay, setDelay] = React.useState(100);
    const { inputValues, sortMethod, onStart, onComplete } = props;

    React.useEffect(() => {
      if (!inputValues) {
        setNumbers([]);
      } else {
        setNumbers(
          inputValues.map((value) => {
            return { index: value, state: ElementStates.Default } as TNumber;
          }),
        );
      }
    }, [inputValues]);

    const resetNumbers = (numbers: TNumber[], state: ElementStates) => {
      const newNums = numbers.slice();
      newNums.forEach((num) => (num.state = state));
      setNumbers(newNums);
    };

    const sortAscending = async () => {
      if (onStart) onStart();
      await startAnimation(inputValues, Direction.Ascending, sortMethod);
      if (onComplete) onComplete();
    };

    const sortDescending = async () => {
      if (onStart) onStart();
      await startAnimation(inputValues, Direction.Descending, sortMethod);
      if (onComplete) onComplete();
    };

    const startAnimation = async (
      inputValues: number[],
      sortDirection: Direction,
      sortMethod: SortMethod,
    ) => {
      resetNumbers(numbers, ElementStates.Default);
      let steps: Array<Array<number>>;
      switch (sortMethod) {
        case SortMethod.Bubble: {
          steps = getSortBubbleSteps(inputValues, sortDirection);
          break;
        }
        case SortMethod.Selection: {
          steps = getSortSelectionSteps(inputValues, sortDirection);
          break;
        }
        default:
          return;
      }
      let pass = 0;
      let counter = 1;
      let last = steps[0].length - 1;
      let newNumbers: TNumber[] = [];
      for (let i = 0; i < steps.length; i++) {
        await delay(msDelay);
        const stepNumbers = steps[i];
        newNumbers = stepNumbers.map((value, index) => {
          let state: ElementStates;
          switch (sortMethod) {
            case SortMethod.Bubble: {
              state = getElementStateBubble(index, last, counter);
              break;
            }
            case SortMethod.Selection: {
              state = getElementStateSelection(index, pass, counter);
              break;
            }
            default: {
              state = ElementStates.Default;
            }
          }
          return {
            index: value,
            state,
          };
        });
        if (counter === last) {
          last--;
          counter = 0;
          pass++;
        }
        counter++;
        setNumbers(newNumbers.slice());
      }
      await delay(msDelay);
      resetNumbers(newNumbers, ElementStates.Modified);
    };

    const renderColumns = () => {
      return (
        <>
          {numbers.map((number, index) => {
            return (
              <Column
                key={`${number.index}-${index}-${number.state}`}
                index={number.index}
                state={number.state}
              />
            );
          })}
        </>
      );
    };

    React.useImperativeHandle(ref, () => ({
      sortAscending,
      sortDescending,
    }));

    return <div className={styles.columns}>{renderColumns()}</div>;
  },
);
