import React from "react";
import styles from "./list-display.module.css";
import { Circle } from "../ui/circle/circle";
import { LinkedList, ILinkedListDisplayHandler } from "../../types/linked-list";
import { delay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";

interface ILinkedListDisplayProps {
  onStart?: () => void;
  onComplete?: () => void;
}

type TLinkedListElement = {
  value: string;
  index: number;
  state: ElementStates;
  head: boolean;
  tail: boolean;
};

export const LinkedListDisplay = React.forwardRef(
  (
    props: ILinkedListDisplayProps,
    ref: React.Ref<ILinkedListDisplayHandler>,
  ) => {
    const [listElements, setListElements] = React.useState<
      TLinkedListElement[]
    >([]);
    const [list, setList] = React.useState(new LinkedList<string>());
    const { onStart, onComplete } = props;

    const addHead = async (item: string) => { };

    const addTail = async (item: string) => { };

    const removeHead = async () => { };

    const removeTail = async () => { };

    const addAt = async (index: number) => { };

    const removeAt = async (index: number) => { };

    // const enqueue = async (item: string) => {
    //   if (onStart) onStart();
    //   const position = (queue.getTail() + 1) % queueSize;
    //   queueElements[position].state = ElementStates.Changing;
    //   await delay(500);
    //   queueElements[position].state = ElementStates.Default;
    //   let newQueue = queue.copy();
    //   try {
    //     newQueue.enqueue(item);
    //     setQueue(newQueue);
    //     updateQueueElements(newQueue);
    //   } catch {
    //     console.log(`can't queue more elements`);
    //   }
    //   if (onComplete) onComplete();
    // };
    //
    // const dequeue = async () => {
    //   if (onStart) onStart();
    //   const position = queue.getHead();
    //   queueElements[position].state = ElementStates.Changing;
    //   await delay(500);
    //   queueElements[position].state = ElementStates.Default;
    //   let newQueue = queue.copy();
    //   try {
    //     newQueue.dequeue();
    //     setQueue(newQueue);
    //     updateQueueElements(newQueue);
    //   } catch {
    //     console.log(`can't dequeue`);
    //   }
    //   if (onComplete) onComplete();
    // };

    // const updateListElements = (list: LinkedList<string>) => {
    //   setListElements(
    //     list.toArray().map((element, index) => {
    //       return {
    //         value: element,
    //         index,
    //         state: ElementStates.Default,
    //         head: queue.getHead() === index ? true : false,
    //         tail: queue.getTail() === index ? true : false,
    //       } as TQueueElement;
    //     }),
    //   );
    // };

    // const clearQueue = () => {
    //   let newQueue = new Queue<string>(queueSize);
    //   setQueue(newQueue);
    //   updateQueueElements(newQueue);
    // };

    const renderListElements = (elements: TLinkedListElement[]) => {
      return (
        <>
          {elements.map((element) => {
            return (
              <Circle
                letter={element.value}
                state={element.state}
                head={element.head ? "head" : null}
                tail={element.tail ? "tail" : null}
                index={element.index}
              />
            );
          })}
        </>
      );
    };

    React.useImperativeHandle(ref, () => ({
      addHead,
      addTail,
      removeHead,
      removeTail,
      addAt,
      removeAt,
    }));

    return (
      <div className={styles.list}>{renderListElements(listElements)}</div>
    );
  },
);
