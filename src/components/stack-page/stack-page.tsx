import React from "react";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { StackDisplay } from "../stack-display/stack-display";
import { IStackDisplayHandler } from "../../types/stack";

export const StackPage: React.FC = () => {
  const [inputText, setInputText] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const stackRef = React.useRef<IStackDisplayHandler>(null);

  const onAddClick = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (stackRef.current) {
        stackRef.current.addToStack(inputText);
      }
    },
    [stackRef, inputText],
  );

  const onDeleteClick = React.useCallback(() => {
    if (stackRef.current) {
      stackRef.current.popFromStack();
    }
  }, [stackRef]);

  const onClearClick = React.useCallback(() => {
    if (stackRef.current) {
      stackRef.current.clearStack();
    }
  }, [stackRef]);

  const onProcessingStart = () => {
    setIsProcessing(true);
  };

  const onProcessingComplete = () => {
    setIsProcessing(false);
  };

  // let addElement = () => { };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.inputSection} onSubmit={onAddClick}>
        <Input
          maxLength={4}
          isLimitText={true}
          disabled={isProcessing}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputText(e.currentTarget.value)
          }
        />
        <Button
          text={"Добавить"}
          onClick={onAddClick}
          disabled={isProcessing}
          isLoader={isProcessing}
          extraClass="ml-6"
        />
        <Button
          text={"Удалить"}
          onClick={onDeleteClick}
          disabled={isProcessing}
          isLoader={isProcessing}
          extraClass="ml-6 mr-20"
        />
        <Button
          text={"Очистить"}
          onClick={onClearClick}
          disabled={isProcessing}
          isLoader={isProcessing}
          extraClass="ml-20"
        />
      </form>
      <StackDisplay
        onStart={onProcessingStart}
        onComplete={onProcessingComplete}
        ref={stackRef}
      />
    </SolutionLayout>
  );
};
