import React from "react";
import styles from "./string-reverse.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { IStringReverseHandler } from "../../types/string";
import { getStringReverseSteps, getLetterState } from "./utils";

interface IStringReverseProps {
  inputString?: string;
  onStart?: () => void;
  onComplete?: () => void;
}

type TLetter = {
  letter: string;
  state: ElementStates;
};

export const StringReverse = React.forwardRef(
  (props: IStringReverseProps, ref: React.Ref<IStringReverseHandler>) => {
    const [letters, setLetters] = React.useState<TLetter[]>([]);
    const { inputString, onStart, onComplete } = props;
    const [msDelay, setDelay] = React.useState(500);

    React.useEffect(() => {
      if (!inputString) {
        setLetters([]);
      } else {
        setLetters(
          Array.from(inputString).map((char) => {
            return { letter: char, state: ElementStates.Default } as TLetter;
          }),
        );
      }
    }, [inputString]);

    const renderLetters = (letters: TLetter[]) => {
      return (
        <>
          {letters.map((char, index) => {
            return (
              <Circle
                key={`${char.letter}-${index}-${char.state}`}
                letter={char.letter}
                state={char.state}
              />
            );
          })}
        </>
      );
    };

    const reverse = async () => {
      if (!inputString) {
        return;
      }
      if (onStart) onStart();
      const steps = getStringReverseSteps(inputString);
      await delay(msDelay);
      setLetters(
        inputString.split("").map((char, index) => {
          return {
            letter: char,
            state:
              index === 0 || index === inputString.length - 1
                ? ElementStates.Changing
                : ElementStates.Default,
          };
        }),
      );
      for (let i = 0; i < steps.length; i++) {
        await delay(msDelay);
        const chars = steps[i];
        setLetters(
          chars.map((char, index) => {
            return {
              letter: char,
              state: getLetterState(chars.length, index, i),
            };
          }),
        );
      }
      if (onComplete) onComplete();
    };

    React.useImperativeHandle(ref, () => ({
      reverse,
    }));

    return <div className={styles.letters}>{renderLetters(letters)}</div>;
  },
);
