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

  const onAddHeadClick = () => { };

  const onAddTailClick = () => { };

  const onRemoveHeadClick = () => { };

  const onRemoveTailClick = () => { };

  const onAddByIndexClick = () => { };

  const onRemoveByIndexClick = () => { };

  const onProcessingStart = () => { };

  const onProcessingComplete = () => { };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.inputSection}>
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
            setInputValue(e.currentTarget.value)
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
      </div>
      <LinkedListDisplay
        onStart={onProcessingStart}
        onComplete={onProcessingComplete}
        ref={listRef}
      />
    </SolutionLayout>
  );
};
