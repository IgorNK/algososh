import React from "react";
import styles from "./stack-display.module.css";
import { Circle } from "../ui/circle/circle";
import { Stack, IStackDisplayHandler } from "../../types/stack";
import { delay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";

interface IStackDisplayProps {
  onStart?: () => void;
  onComplete?: () => void;
}

type TStackElement = {
  value: string;
  state: ElementStates;
  top: boolean;
};

export const StackDisplay = React.forwardRef(
  (props: IStackDisplayProps, ref: React.Ref<IStackDisplayHandler>) => {
    const [stackElements, setStackElements] = React.useState<TStackElement[]>(
      [],
    );
    const [stack, setStack] = React.useState(new Stack<string>());
    const { onStart, onComplete } = props;

    const addToStack = async (item: string) => {
      if (onStart) onStart();
      let newStack = stack.copy();
      newStack.push(item);
      setStack(newStack);
      updateStackElements(newStack, true);
      await delay(500);
      updateStackElements(newStack, false);
      if (onComplete) onComplete();
    };

    const popFromStack = async () => {
      if (onStart) onStart();
      let newStack = stack.copy();
      newStack.pop();
      setStack(newStack);
      updateStackElements(newStack, true);
      await delay(500);
      updateStackElements(newStack, false);
      if (onComplete) onComplete();
    };

    const updateStackElements = (stack: Stack<string>, changing: boolean) => {
      setStackElements(
        stack.toArray().map((element, index) => {
          const last = index === stack.getSize() - 1;
          return {
            value: element,
            state:
              changing && last ? ElementStates.Changing : ElementStates.Default,
            top: last ? true : false,
          } as TStackElement;
        }),
      );
    };

    const clearStack = () => {
      let newStack = new Stack<string>();
      setStack(newStack);
      setStackElements([]);
    };

    const renderStackElements = (elements: TStackElement[]) => {
      return (
        <>
          {elements.map((element) => {
            return (
              <Circle
                letter={element.value}
                state={element.state}
                head={element.top ? "top" : null}
              />
            );
          })}
        </>
      );
    };

    React.useImperativeHandle(ref, () => ({
      addToStack,
      popFromStack,
      clearStack,
    }));

    return (
      <div className={styles.stack}>{renderStackElements(stackElements)}</div>
    );
  },
);
