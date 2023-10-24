import React from "react";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { FibonacciSequence } from "../fibonacci-sequence/fibonacci-sequence";
import { IFibonacciSequenceHandler } from "../../types/fibonacci";

export const FibonacciPage: React.FC = () => {
  const [inputText, setInputText] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const fibRef = React.useRef<IFibonacciSequenceHandler>(null);

  const onCalculateClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (fibRef.current) {
      fibRef.current.calculate();
    }
  };
  const onProcessingStart = () => {
    setIsProcessing(true);
  };
  const onProcessingComplete = () => {
    setIsProcessing(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.inputSection} onSubmit={onCalculateClick}>
        <Input
          type={"number"}
          max={19}
          isLimitText={true}
          disabled={isProcessing}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            let value = e.currentTarget.value;
            if (+value > 19) {
              value = "19";
            }
            if (+value < 0) {
              value = "0";
            }
            setInputText(value);
          }}
        />
        <Button
          text="Рассчитать"
          disabled={isProcessing}
          isLoader={isProcessing}
          onClick={onCalculateClick}
        />
      </form>
      <div>
        <FibonacciSequence
          inputAmount={+inputText}
          onStart={onProcessingStart}
          onComplete={onProcessingComplete}
          ref={fibRef}
        />
      </div>
    </SolutionLayout>
  );
};
