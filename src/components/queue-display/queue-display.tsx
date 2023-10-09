import React from "react";
import styles from "./queue-display.module.css";
import { Circle } from "../ui/circle/circle";
import { Queue, IQueueDisplayHandler } from "../../types/queue";
import { delay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";

interface IQueueDisplayProps {
  onStart?: () => void;
  onComplete?: () => void;
}

type TQueueElement = {
  value: string;
  index: number;
  state: ElementStates;
  head: boolean;
  tail: boolean;
};

export const QueueDisplay = React.forwardRef(
  (props: IQueueDisplayProps, ref: React.Ref<IQueueDisplayHandler>) => {
    const [queueElements, setQueueElements] = React.useState<TQueueElement[]>(
      [],
    );
    const queueSize = 7;
    const [queue, setQueue] = React.useState(new Queue<string>(queueSize));
    const { onStart, onComplete } = props;

    // React.useEffect(() => {
    //   updateQueueElements(queue);
    // }, [queue]);

    const enqueue = async (item: string) => {
      if (onStart) onStart();
      let newQueue = queue.copy();
      try {
        newQueue.enqueue(item);
        setQueue(newQueue);
        updateQueueElements(newQueue);
      } catch {
        console.log(`can't queue more elements`);
      }
      await delay(500);
      if (onComplete) onComplete();
    };

    const dequeue = async () => {
      if (onStart) onStart();
      let newQueue = queue.copy();
      await delay(500);
      try {
        newQueue.dequeue();
        setQueue(newQueue);
        updateQueueElements(newQueue);
      } catch {
        console.log(`can't dequeue`);
      }
      if (onComplete) onComplete();
    };

    // const updateQueueElements = (queue: Queue<string>) => {
    //   const newElements: TQueueElement[] = [];
    //   for (let i = 0; i < queueSize; i++) {
    //
    //   }
    // }

    const updateQueueElements = (queue: Queue<string>) => {
      setQueueElements(
        queue.toArray().map((element, index) => {
          return {
            value: element,
            index,
            state: ElementStates.Default,
            head: queue.getHead() === index ? true : false,
            tail: queue.getTail() === index ? true : false,
          } as TQueueElement;
        }),
      );
    };

    const clearQueue = () => {
      let newQueue = new Queue<string>(queueSize);
      setQueue(newQueue);
      setQueueElements([]);
    };

    const renderQueueElements = (elements: TQueueElement[]) => {
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
      enqueue,
      dequeue,
      clearQueue,
    }));

    return (
      <div className={styles.queue}>{renderQueueElements(queueElements)}</div>
    );
  },
);
