import React from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { StringReverse } from "../string-reverse/string-reverse";
import { IStringReverseHandler } from "../../types/string";

export const StringComponent: React.FC = () => {
  const [inputText, setInputText] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const stringRef = React.useRef<IStringReverseHandler>(null);

  const onReverseClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (stringRef.current) {
        stringRef.current.reverse();
      }
    },
    [],
  );

  const onProcessingStart = () => {
    setIsProcessing(true);
  };

  const onProcessingComplete = () => {
    setIsProcessing(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.inputSection}>
        <Input
          maxLength={11}
          isLimitText={true}
          disabled={isProcessing}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputText(e.currentTarget.value)
          }
        />
        <Button
          text="Развернуть"
          disabled={isProcessing || inputText === ""}
          onClick={onReverseClick}
          isLoader={isProcessing}
        />
      </div>
      <div>
        <StringReverse
          inputString={inputText}
          onStart={onProcessingStart}
          onComplete={onProcessingComplete}
          ref={stringRef}
        />
      </div>
    </SolutionLayout>
  );
};
