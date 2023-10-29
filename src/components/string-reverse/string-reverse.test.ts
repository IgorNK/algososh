import { getStringReverseSteps } from "./utils";

it("Reverses a string with even number of chars correctly", () => {
  const string = "A quick brown fox jumped over a lazy dog";
  const reverseString = "god yzal a revo depmuj xof nworb kciuq A";
  let result = "";
  const resultArray = getStringReverseSteps(string).pop();
  if (resultArray) {
    result = resultArray.join("");
  }
  expect(result).toBe(reverseString);
});

it("Reverses a string with odd number of chars correctly", () => {
  const string =
    "He thrusts his fists against the posts and still insists he sees the ghosts";
  const reverseString =
    "stsohg eht sees eh stsisni llits dna stsop eht tsniaga stsif sih stsurht eH";
  let result = "";
  const resultArray = getStringReverseSteps(string).pop();
  if (resultArray) {
    result = resultArray.join("");
  }
  expect(result).toBe(reverseString);
});

it("Reverses a string with one word correctly", () => {
  const string = "Wabbabubbalakashakapaka";
  const reverseString = "akapakahsakalabbubabbaW";
  let result = "";
  const resultArray = getStringReverseSteps(string).pop();
  if (resultArray) {
    result = resultArray.join("");
  }
  expect(result).toBe(reverseString);
});

it("Reverses an empty string correctly", () => {
  const string = "";
  const reverseString = "";
  let result = "Something";
  const resultArray = getStringReverseSteps(string).pop();
  if (resultArray) {
    result = resultArray.join("");
  }
  expect(result).toBe(reverseString);
});
