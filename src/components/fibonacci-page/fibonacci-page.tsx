import React from "react";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { FibonacciSequence } from "../fibonacci-sequence/fibonacci-sequence";

export const FibonacciPage: React.FC = () => {
  const [inputText, setInputText] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingStarted, setProcessingStarted] = React.useState(false);
  const onCalculateClick = () => { };
  const onProcessingStart = () => { };
  const onProcessingComplete = () => { };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.inputSection}>
        <Input
          type={"number"}
          max={19}
          isLimitText={true}
          disabled={isProcessing}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputText(e.currentTarget.value)
          }
        />
        <Button
          text="Рассчитать"
          disabled={isProcessing}
          onClick={onCalculateClick}
        />
      </div>
      <div>
        <FibonacciSequence
          inputAmount={inputText}
          isStart={processingStarted}
          onStart={onProcessingStart}
          onComplete={onProcessingComplete}
        />
      </div>
    </SolutionLayout>
  );
};
