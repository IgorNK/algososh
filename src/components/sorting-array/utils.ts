import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";

const swap = (array: number[], firstIndex: number, secondIndex: number) => {
  const temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
};

export const getSortBubbleSteps = (
  array: number[],
  direction: Direction,
): number[][] => {
  const steps = Array<Array<number>>();
  const nums = array.slice();
  let start = 0;
  let end = nums.length - 1;
  while (end > 0 && start <= nums.length - 1) {
    if (nums[start] > nums[start + 1]) {
      if (direction === Direction.Ascending) {
        swap(nums, start, start + 1);
      }
    }
    if (nums[start] < nums[start + 1]) {
      if (direction === Direction.Descending) {
        swap(nums, start, start + 1);
      }
    }

    if (start + 1 >= end) {
      end--;
      start = -1;
    }

    start++;
    steps.push(nums.slice());
  }

  return steps;
};

export const getSortSelectionSteps = (
  array: number[],
  direction: Direction,
): number[][] => {
  const steps = Array<Array<number>>();
  const nums = array.slice();
  let { length } = nums;
  let start = 0;
  let cmp = 0;
  let max = 0;

  while (start < length && cmp < length) {
    if (nums[cmp] > nums[max]) {
      if (direction === Direction.Descending) {
        max = cmp;
      }
    }
    if (nums[cmp] < nums[max]) {
      if (direction === Direction.Ascending) {
        max = cmp;
      }
    }

    cmp++;
    if (cmp >= length) {
      if (nums[max] > nums[start] && direction === Direction.Descending) {
        swap(nums, start, max);
      }
      if (nums[max] < nums[start] && direction === Direction.Ascending) {
        swap(nums, start, max);
      }
      start++;
      max = start;
      cmp = start + 1;
    }
    steps.push(nums.slice());
  }

  return steps;
};

export const getElementStateBubble = (
  index: number,
  newLen: number,
  counter: number,
): ElementStates => {
  if (index >= newLen + 1) {
    return ElementStates.Modified;
  }
  if (index === counter - 1 || index === counter) {
    return ElementStates.Changing;
  }
  return ElementStates.Default;
};

export const getElementStateSelection = (
  index: number,
  pass: number,
  counter: number,
): ElementStates => {
  if (index < pass) {
    return ElementStates.Modified;
  }
  if (index === pass || index === pass + counter) {
    return ElementStates.Changing;
  }
  return ElementStates.Default;
};
