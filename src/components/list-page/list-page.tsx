import React from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ILinkedListDisplayHandler } from "../../types/linked-list";
import { LinkedListDisplay } from "../list-display/list-display";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [inputIndex, setInputIndex] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const listRef = React.useRef<ILinkedListDisplayHandler>(null);

  const onAddHeadClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (listRef.current) {
      listRef.current.addHead(inputValue);
    }
  };

  const onAddTailClick = () => {
    if (listRef.current) {
      listRef.current.addTail(inputValue);
    }
  };

  const onRemoveHeadClick = () => {
    if (listRef.current) {
      listRef.current.removeHead();
    }
  };

  const onRemoveTailClick = () => {
    if (listRef.current) {
      listRef.current.removeTail();
    }
  };

  const onAddByIndexClick = () => {
    if (listRef.current) {
      listRef.current.addAt(inputValue, +inputIndex);
    }
  };

  const onRemoveByIndexClick = () => {
    if (listRef.current) {
      listRef.current.removeAt(+inputIndex);
    }
  };

  const onProcessingStart = () => {
    setIsProcessing(true);
  };

  const onProcessingComplete = () => {
    setIsProcessing(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.inputSection} onSubmit={onAddHeadClick}>
        <Input
          extraClass={styles.valueInput}
          maxLength={4}
          placeholder={"Введите значение"}
          isLimitText={true}
          disabled={isProcessing}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
        />
        <Button
          extraClass={styles.addHead}
          text={"Добавить в head"}
          onClick={onAddHeadClick}
          disabled={isProcessing}
          isLoader={isProcessing}
        />
        <Button
          extraClass={styles.addTail}
          text={"Добавить в tail"}
          onClick={onAddTailClick}
          disabled={isProcessing}
          isLoader={isProcessing}
        />
        <Button
          extraClass={styles.removeHead}
          text={"Удалить из head"}
          onClick={onRemoveHeadClick}
          disabled={isProcessing}
          isLoader={isProcessing}
        />
        <Button
          extraClass={styles.removeTail}
          text={"Удалить из tail"}
          onClick={onRemoveTailClick}
          disabled={isProcessing}
          isLoader={isProcessing}
        />
        <Input
          extraClass={styles.indexInput}
          maxLength={2}
          type={"number"}
          placeholder={"Введите индекс"}
          disabled={isProcessing}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputIndex(e.currentTarget.value)
          }
        />
        <Button
          extraClass={styles.addIndex}
          text={"Добавить по индексу"}
          onClick={onAddByIndexClick}
          disabled={isProcessing}
          isLoader={isProcessing}
        />
        <Button
          extraClass={styles.removeIndex}
          text={"Удалить по индексу"}
          onClick={onRemoveByIndexClick}
          disabled={isProcessing}
          isLoader={isProcessing}
        />
      </form>
      <LinkedListDisplay
        onStart={onProcessingStart}
        onComplete={onProcessingComplete}
        ref={listRef}
      />
    </SolutionLayout>
  );
};
