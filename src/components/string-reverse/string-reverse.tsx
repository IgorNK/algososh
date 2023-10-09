import React from "react";
import styles from "./string-reverse.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { IStringReverseHandler } from "../../types/string";

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

    React.useEffect(() => {
      if (!inputString) {
        setLetters([]);
      } else {
        setLetters(
          Array.from(inputString).map((char) => {
            return { letter: char, state: ElementStates.Default } as TLetter;
          })
        );
      }
    }, [inputString]);

    const renderLetters = (letters: TLetter[]) => {
      return (
        <>
          {letters.map((char) => {
            return <Circle letter={char.letter} state={char.state} />;
          })}
        </>
      );
    };

    const reverse = async () => {
      if (onStart) onStart();
      let complete = false;
      while (!complete) {
        await delay(500);
        complete = cycleReverse();
        console.log(letters);
      }
      if (onComplete) onComplete();
    };

    const cycleReverse = () => {
      const chars = letters.slice();
      const { length } = chars;
      let index = 0;
      console.log(`from ${index} to ${length / 2}`);
      while (index < length / 2) {
        let firstIdx = index;
        let lastIdx = length - 1 - index;
        console.log(
          `first index: ${firstIdx}:${chars[firstIdx].letter}, last index: ${lastIdx}:${chars[lastIdx].letter}`
        );
        if (chars[firstIdx].state === ElementStates.Modified) {
          index++;
          console.log(`already modified, iterating index: ${index}`);
          continue;
        }
        if (chars[firstIdx].state === ElementStates.Changing) {
          const temp = chars[lastIdx].letter;
          console.log(
            `swapping ${firstIdx}:${chars[firstIdx].letter} and ${lastIdx}:${chars[lastIdx].letter}`
          );
          chars[lastIdx].letter = chars[firstIdx].letter;
          chars[firstIdx].letter = temp;
          chars[firstIdx].state = ElementStates.Modified;
          chars[lastIdx].state = ElementStates.Modified;
          console.log(chars);
          setLetters(chars);
          return false;
        }
        if (chars[firstIdx].state === ElementStates.Default) {
          chars[firstIdx].state = ElementStates.Changing;
          chars[lastIdx].state = ElementStates.Changing;
          setLetters(chars);
          return false;
        }
      }
      console.log(`complete`);
      setLetters(chars);
      return true;
    };

    React.useImperativeHandle(ref, () => ({
      reverse,
    }));

    return <div className={styles.letters}>{renderLetters(letters)}</div>;
  }
);
