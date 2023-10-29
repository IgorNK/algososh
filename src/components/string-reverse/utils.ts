import { ElementStates } from "../../types/element-states";

export const getStringReverseSteps = (inputString: string): string[][] => {
  if (inputString === "") {
    return [[]];
  }
  const steps = Array<Array<string>>();
  const chars = inputString.split("");
  const { length } = chars;
  let index = 0;
  while (index < length / 2) {
    let firstIdx = index;
    let lastIdx = length - 1 - index;
    const temp = chars[lastIdx];
    chars[lastIdx] = chars[firstIdx];
    chars[firstIdx] = temp;
    index++;
    steps.push(chars.slice());
  }
  return steps;
};

export const getLetterState = (
  strLen: number,
  index: number,
  iter: number,
): ElementStates => {
  if (index <= iter || index >= strLen - 1 - iter) {
    return ElementStates.Modified;
  }
  if (index <= iter + 1 || index >= strLen - 2 - iter) {
    return ElementStates.Changing;
  }
  return ElementStates.Default;
};
