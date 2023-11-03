import { getSortBubbleSteps, getSortSelectionSteps } from "./utils";
import { Direction } from "../../types/direction";

it("Sorts an empty array using bubble sort correctly", () => {
  const resultAscending = getSortBubbleSteps([], Direction.Ascending);
  const expectedResultAscending: Array<Array<number>> = [[]];
  const resultDescending = getSortBubbleSteps([], Direction.Descending);
  const expectedResultDescending: Array<Array<number>> = [[]];
  expect(resultAscending).toStrictEqual(expectedResultAscending);
  expect(resultDescending).toStrictEqual(expectedResultDescending);
});

it("Sorts an empty array using selection sort correctly", () => {
  const resultAscending = getSortSelectionSteps([], Direction.Ascending);
  const expectedResultAscending: Array<Array<number>> = [[]];
  const resultDescending = getSortSelectionSteps([], Direction.Descending);
  const expectedResultDescending: Array<Array<number>> = [[]];
  expect(resultAscending).toStrictEqual(expectedResultAscending);
  expect(resultDescending).toStrictEqual(expectedResultDescending);
});

it("Sorts an array with only one element using bubble sort correctly", () => {
  const resultAscending = getSortBubbleSteps([100], Direction.Ascending);
  const expectedResultAscending: Array<Array<number>> = [[100]];
  const resultDescending = getSortBubbleSteps([100], Direction.Descending);
  const expectedResultDescending: Array<Array<number>> = [[100]];
  expect(resultAscending).toStrictEqual(expectedResultAscending);
  expect(resultDescending).toStrictEqual(expectedResultDescending);
});

it("Sorts an array with only one element using selection sort correctly", () => {
  const resultAscending = getSortSelectionSteps([100], Direction.Ascending);
  const expectedResultAscending: Array<Array<number>> = [[100]];
  const resultDescending = getSortSelectionSteps([100], Direction.Descending);
  const expectedResultDescending: Array<Array<number>> = [[100]];
  expect(resultAscending).toStrictEqual(expectedResultAscending);
  expect(resultDescending).toStrictEqual(expectedResultDescending);
});

it("Sorts an array with several elements using bubble sort correctly", () => {
  const resultAscending = getSortBubbleSteps(
    [1, 486, 4327, 12, 0.05, 28, 200, 1],
    Direction.Ascending,
  ).pop();
  const expectedResultAscending: Array<number> = [
    0.05, 1, 1, 12, 28, 200, 486, 4327,
  ];

  const resultDescending = getSortBubbleSteps(
    [1, 486, 4327, 12, 0.05, 28, 200, 1],
    Direction.Descending,
  ).pop();
  const expectedResultDescending: Array<number> = [
    4327, 486, 200, 28, 12, 1, 1, 0.05,
  ];
  expect(resultAscending).toStrictEqual(expectedResultAscending);
  expect(resultDescending).toStrictEqual(expectedResultDescending);
});

it("Sorts an array with several elements using selection sort correctly", () => {
  const resultAscending = getSortSelectionSteps(
    [1, 486, 4327, 12, 0.05, 28, 200, 1],
    Direction.Ascending,
  ).pop();
  const expectedResultAscending: Array<number> = [
    0.05, 1, 1, 12, 28, 200, 486, 4327,
  ];

  const resultDescending = getSortSelectionSteps(
    [1, 486, 4327, 12, 0.05, 28, 200, 1],
    Direction.Descending,
  ).pop();
  const expectedResultDescending: Array<number> = [
    4327, 486, 200, 28, 12, 1, 1, 0.05,
  ];
  expect(resultAscending).toStrictEqual(expectedResultAscending);
  expect(resultDescending).toStrictEqual(expectedResultDescending);
});
