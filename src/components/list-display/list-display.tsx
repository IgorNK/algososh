import React from "react";
import styles from "./list-display.module.css";
import { Circle } from "../ui/circle/circle";
import { LinkedList, ILinkedListDisplayHandler } from "../../types/linked-list";
import { delay, randomList } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";

interface ILinkedListDisplayProps {
  onStart?: () => void;
  onComplete?: () => void;
}

type TLinkedListElement = {
  value: string;
  passenger: TPassengerElement;
  index: number;
  state: ElementStates;
  head: boolean;
  tail: boolean;
};

enum PassengerPosition {
  Head,
  Tail,
}

type TPassengerElement = {
  value: string;
  index: number;
  position: PassengerPosition;
};

export const LinkedListDisplay = React.forwardRef(
  (
    props: ILinkedListDisplayProps,
    ref: React.Ref<ILinkedListDisplayHandler>
  ) => {
    const [listElements, setListElements] = React.useState<
      TLinkedListElement[]
    >([]);
    const [list, setList] = React.useState(new LinkedList<string>());
    const { onStart, onComplete } = props;

    React.useEffect(() => {
      const newList = randomList(0, 100, 3, 7);
      setList(newList);
      updateListElements(newList);
    }, []);

    const addHead = async (item: string) => {
      if (onStart) onStart();
      updateListElements(
        list,
        { value: item, index: 0, position: PassengerPosition.Head },
        0
      );
      await delay(500);
      list.insertAtBeginning(item);
      updateListElements(list, undefined, undefined, 0);
      await delay(500);
      updateListElements(list);
      if (onComplete) onComplete();
    };

    const addTail = async (item: string) => {
      if (onStart) onStart();
      const lastIndex = list.getSize() - 1;
      updateListElements(
        list,
        { value: item, index: lastIndex, position: PassengerPosition.Head },
        lastIndex
      );
      await delay(500);
      list.insertAtEnd(item);
      updateListElements(list, undefined, undefined, lastIndex + 1);
      await delay(500);
      updateListElements(list);
      if (onComplete) onComplete();
    };

    const removeHead = async () => {
      if (onStart) onStart();
      const head = list.getHead();
      if (head !== null) {
        const value = head.value;
        updateListElements(
          list,
          { value, index: 0, position: PassengerPosition.Tail },
          0,
          undefined,
          0
        );
        await delay(500);
        list.removeAtBeginning();
        updateListElements(list);
      } else {
        console.log("No head!");
      }
      if (onComplete) onComplete();
    };

    const removeTail = async () => {
      if (onStart) onStart();
      const tail = list.getTail();
      const lastIndex = list.getSize() - 1;
      if (tail !== null) {
        const value = tail.value;
        updateListElements(
          list,
          { value, index: lastIndex, position: PassengerPosition.Tail },
          lastIndex,
          undefined,
          lastIndex
        );
        await delay(500);
        list.removeAtEnd();
        updateListElements(list);
      } else {
        console.log("No tail!");
      }
      if (onComplete) onComplete();
    };

    const addAt = async (item: string, index: number) => {
      if (onStart) onStart();
      list.insertAtIndex(item, index);
      updateListElements(list);
      if (onComplete) onComplete();
    };

    const removeAt = async (index: number) => {
      console.log(`removing at ${index}`);
      if (onStart) onStart();
      list.removeAtIndex(index);
      updateListElements(list);
      if (onComplete) onComplete();
    };

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

    const updateListElements = (
      list: LinkedList<string>,
      passenger?: TPassengerElement,
      changing?: number,
      modified?: number,
      empty?: number
    ) => {
      const listArray = list.toArray();
      const length = listArray.length;
      setListElements(
        listArray.map((element, index) => {
          const state =
            changing === index
              ? ElementStates.Changing
              : modified === index
              ? ElementStates.Modified
              : ElementStates.Default;
          return {
            value: index !== empty ? element : "",
            passenger: passenger,
            index,
            state,
            head: index === 0 ? true : false,
            tail: index === listArray.length - 1 ? true : false,
          } as TLinkedListElement;
        })
      );
    };

    // const clearQueue = () => {
    //   let newQueue = new Queue<string>(queueSize);
    //   setQueue(newQueue);
    //   updateQueueElements(newQueue);
    // };

    const renderListElements = (elements: TLinkedListElement[]) => {
      return (
        <>
          {elements.map((element, index) => {
            const isLast = index === elements.length - 1;
            let passenger = null;
            if (element.passenger && element.passenger.index === index) {
              passenger = (
                <Circle
                  letter={element.passenger.value}
                  isSmall={true}
                  state={ElementStates.Changing}
                />
              );
            }
            return (
              <>
                <Circle
                  letter={element.value}
                  state={element.state}
                  head={
                    passenger !== null &&
                    element.passenger.position === PassengerPosition.Head
                      ? passenger
                      : element.head
                      ? "head"
                      : null
                  }
                  tail={
                    passenger !== null &&
                    element.passenger.position === PassengerPosition.Tail
                      ? passenger
                      : element.tail
                      ? "tail"
                      : null
                  }
                  index={element.index}
                />
                {!isLast ? <ArrowIcon /> : null}
              </>
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
  }
);
