import React from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { SortingArray } from "../sorting-array/sorting-array";
import { Direction } from "../../types/direction";
import { SortMethod } from "../../types/sorting";
import { randomArr } from "../../utils/utils";

export const SortingPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingStarted, setProcessingStarted] = React.useState(false);
  const [values, setValues] = React.useState<number[]>([]);
  const [sortMethod, setSortMethod] = React.useState<SortMethod>(
    SortMethod.Selection
  );
  const [sortDirection, setSortDirection] = React.useState<Direction | null>(
    null
  );

  const onGenerateClick = () => {
    setValues(randomArr());
  };

  const onSortAscendingClick = () => {
    setSortDirection(Direction.Ascending);
    setProcessingStarted(true);
  };

  const onSortDescendingClick = () => {
    setSortDirection(Direction.Descending);
    setProcessingStarted(true);
  };

  const onProcessingStart = () => {
    setIsProcessing(true);
    setProcessingStarted(false);
  };

  const onProcessingComplete = () => {
    setIsProcessing(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.inputSection}>
        <RadioInput
          label={"Выбор"}
          checked={sortMethod === SortMethod.Selection}
          onChange={() => setSortMethod(SortMethod.Selection)}
          disabled={isProcessing}
        />
        <RadioInput
          label={"Пузырёк"}
          checked={sortMethod === SortMethod.Bubble}
          onChange={() => setSortMethod(SortMethod.Bubble)}
          disabled={isProcessing}
          extraClass="ml-10 mr-1"
        />
        <Button
          text={"По возрастанию"}
          sorting={Direction.Ascending}
          onClick={onSortAscendingClick}
          disabled={isProcessing}
          extraClass="ml-25"
        />
        <Button
          text={"По убыванию"}
          sorting={Direction.Descending}
          onClick={onSortDescendingClick}
          disabled={isProcessing}
          extraClass="ml-6 mr-20"
        />
        <Button
          text={"Новый массив"}
          onClick={onGenerateClick}
          disabled={isProcessing}
          extraClass="ml-20"
        />
      </div>
      <SortingArray
        inputValues={values}
        isStart={processingStarted}
        sortMethod={sortMethod}
        sortDirection={sortDirection}
        onStart={onProcessingStart}
        onComplete={onProcessingComplete}
      />
    </SolutionLayout>
  );
};
