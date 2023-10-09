import { LinkedList } from "../types/linked-list";

export const randomArr = (
  min = 0,
  max = 100,
  minLen = 3,
  maxLen = 17,
): number[] => {
  const outArray = [];
  const amount = minLen + Math.floor(Math.random() * (maxLen - minLen + 1));
  for (let i = 0; i < amount; i++) {
    const num = min + Math.floor(Math.random() * (max - min + 1));
    outArray.push(num);
  }
  return outArray;
};

export const randomList = (
  min = 0,
  max = 100,
  minLen = 3,
  maxLen = 7,
): LinkedList<string> => {
  const list = new LinkedList<string>();
  const amount = minLen + Math.floor(Math.random() * (maxLen - minLen + 1));
  for (let i = 0; i < amount; i++) {
    const num = min + Math.floor(Math.random() * (max - min + 1));
    list.insertAtEnd(`${num}`);
  }
  return list;
};

export const delay = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
