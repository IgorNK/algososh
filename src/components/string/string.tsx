import React from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { StringReverse } from "../string-reverse/string-reverse";

export const StringComponent: React.FC = () => {
  const [inputText, setInputText] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingStarted, setProcessingStarted] = React.useState(false);

  const onReverseClick = React.useCallback((e) => {
    setProcessingStarted(true);
  }, []);

  const onProcessingStart = () => {
    setIsProcessing(true);
    setProcessingStarted(false);
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
          disabled={isProcessing}
          onClick={onReverseClick}
        />
      </div>
      <div>
        <StringReverse
          inputString={inputText}
          isStart={processingStarted}
          onStart={onProcessingStart}
          onComplete={onProcessingComplete}
        />
      </div>
    </SolutionLayout>
  );
};
