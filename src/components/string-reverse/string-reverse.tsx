import React from "react";
import styles from "./string-reverse.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

interface IStringReverseProps {
  inputString?: string;
  isStart?: boolean;
  onStart?: () => void;
  onComplete?: () => void;
}

type TLetter = {
  letter: string;
  state: ElementStates;
};

export const StringReverse: React.FC<IStringReverseProps> = ({
  inputString,
  isStart,
  onStart,
  onComplete,
}) => {
  const [letters, setLetters] = React.useState<TLetter[]>([]);

  React.useEffect(() => {
    const startAnimation = async () => {
      if (onStart) onStart();
      await runAnimation();
      if (onComplete) onComplete();
    };

    if (isStart) startAnimation();
  }, [isStart]);

  React.useEffect(() => {
    if (!inputString) {
      return;
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

  const runAnimation = async () => {
    if (!inputString) {
      return;
    }
    let processedString = inputString.slice();

    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return <div className={styles.letters}>{renderLetters(letters)}</div>;
};
