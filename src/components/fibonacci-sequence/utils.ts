export const fibonacciStep = (nums: number[]): number[] => {
  const outNums = nums.slice();
  const { length } = outNums;
  if (length < 2) {
    outNums.push(1);
  } else {
    outNums.push(outNums[length - 2] + outNums[length - 1]);
  }
  return outNums;
};
