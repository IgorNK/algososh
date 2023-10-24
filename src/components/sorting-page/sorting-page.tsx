import React from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { SortingArray } from "../sorting-array/sorting-array";
import { Direction } from "../../types/direction";
import { SortMethod, ISortingArrayHandler } from "../../types/sorting";
import { randomArr } from "../../utils/utils";

export const SortingPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [values, setValues] = React.useState<number[]>([]);
  const [sortMethod, setSortMethod] = React.useState<SortMethod>(
    SortMethod.Selection
  );
  const sortRef = React.useRef<ISortingArrayHandler>(null);

  React.useEffect(() => {
    setValues(randomArr());
  }, []);

  const onGenerateClick = () => {
    setValues(randomArr());
  };

  const onSortAscendingClick = () => {
    if (sortRef.current) {
      sortRef.current.sortAscending();
    }
  };

  const onSortDescendingClick = () => {
    if (sortRef.current) {
      sortRef.current.sortDescending();
    }
  };

  const onProcessingStart = () => {
    setIsProcessing(true);
  };

  const onProcessingComplete = () => {
    setIsProcessing(false);
  };

  return (
    <SolutionLayout title='Сортировка массива'>
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
          extraClass='ml-10 mr-1'
        />
        <Button
          text={"По возрастанию"}
          sorting={Direction.Ascending}
          onClick={onSortAscendingClick}
          disabled={isProcessing}
          extraClass='ml-25'
        />
        <Button
          text={"По убыванию"}
          sorting={Direction.Descending}
          onClick={onSortDescendingClick}
          disabled={isProcessing}
          extraClass='ml-6 mr-20'
        />
        <Button
          text={"Новый массив"}
          onClick={onGenerateClick}
          disabled={isProcessing}
          extraClass='ml-20'
        />
      </div>
      <SortingArray
        inputValues={values}
        sortMethod={sortMethod}
        onStart={onProcessingStart}
        onComplete={onProcessingComplete}
        ref={sortRef}
      />
    </SolutionLayout>
  );
};
