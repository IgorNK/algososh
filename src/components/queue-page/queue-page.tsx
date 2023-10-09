import React from "react";
import styles from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { QueueDisplay } from "../queue-display/queue-display";
import { IQueueDisplayHandler } from "../../types/queue";

export const QueuePage: React.FC = () => {
  const [inputText, setInputText] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const queueRef = React.useRef<IQueueDisplayHandler>(null);

  const onAddClick = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (queueRef.current) {
        queueRef.current.enqueue(inputText);
      }
    },
    [queueRef, inputText],
  );

  const onDeleteClick = React.useCallback(() => {
    if (queueRef.current) {
      queueRef.current.dequeue();
    }
  }, [queueRef]);

  const onClearClick = React.useCallback(() => {
    if (queueRef.current) {
      queueRef.current.clearQueue();
    }
  }, [queueRef]);

  const onProcessingStart = () => {
    setIsProcessing(true);
  };

  const onProcessingComplete = () => {
    setIsProcessing(false);
  };

  return (
    <SolutionLayout title="Очередь">
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
      <QueueDisplay
        onStart={onProcessingStart}
        onComplete={onProcessingComplete}
        ref={queueRef}
      />
    </SolutionLayout>
  );
};
