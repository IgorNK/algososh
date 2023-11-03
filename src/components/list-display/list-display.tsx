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
    ref: React.Ref<ILinkedListDisplayHandler>,
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
        [0],
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
        [lastIndex],
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
          [0],
          undefined,
          0,
        );
        await delay(500);
        list.removeAtBeginning();
        updateListElements(list);
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
          [lastIndex],
          undefined,
          lastIndex,
        );
        await delay(500);
        list.removeAtEnd();
        updateListElements(list);
      }
      if (onComplete) onComplete();
    };

    const addAt = async (item: string, index: number) => {
      if (onStart) onStart();
      for (let i = 0; i <= index; i++) {
        if (i >= list.getSize()) {
          break;
        }
        updateListElements(list, {
          value: item,
          index: i,
          position: PassengerPosition.Tail,
        });
        await delay(500);
      }
      list.insertAtIndex(item, index);
      updateListElements(
        list,
        { value: item, index, position: PassengerPosition.Tail },
        [index],
        undefined,
        index,
      );
      await delay(500);
      updateListElements(list, undefined, undefined, index);
      await delay(500);
      updateListElements(list);
      if (onComplete) onComplete();
    };

    const removeAt = async (index: number) => {
      if (onStart) onStart();
      const deleted = list.getAtIndex(index);
      const changing = [];
      for (let i = 0; i <= index; i++) {
        if (i >= list.getSize()) {
          break;
        }
        changing.push(i);
        updateListElements(list, undefined, changing);
        await delay(500);
      }
      if (!deleted) {
        return;
      }
      updateListElements(
        list,
        { value: deleted.value, index, position: PassengerPosition.Tail },
        changing,
        undefined,
        index,
      );
      await delay(500);
      list.removeAtIndex(index);
      updateListElements(list);
      if (onComplete) onComplete();
    };

    const updateListElements = (
      list: LinkedList<string>,
      passenger?: TPassengerElement,
      changing?: number[],
      modified?: number,
      empty?: number,
    ) => {
      const listArray = list.toArray();
      const length = listArray.length;
      setListElements(
        listArray.map((element, index) => {
          const state =
            changing !== undefined && changing.includes(index)
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
            tail: index === length - 1 ? true : false,
          } as TLinkedListElement;
        }),
      );
    };

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
              <div
                className={styles.listElement}
                key={`${element.value}-${element.index}`}
              >
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
              </div>
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
      <div className={styles.list} data-cy="elements">{renderListElements(listElements)}</div>
    );
  },
);
