import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

it("Button with text is rendered correctly", () => {
  const tree = renderer.create(<Button text="Button text" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Button without text is rendered correctly", () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Disabled button is rendered correctly", () => {
  const tree = renderer.create(<Button disabled={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Button with loading indicator is rendered correctly", () => {
  const tree = renderer.create(<Button isLoader={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Button press executes a callback correctly", () => {
  const callback = jest.fn(() => {
    return "success";
  });
  render(<Button text="Test Button" onClick={callback} />);
  const link = screen.getByText("Test Button");
  fireEvent.click(link);
  expect(callback).toHaveBeenCalledTimes(1);
});
