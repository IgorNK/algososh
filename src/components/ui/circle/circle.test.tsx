import React from "react";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

const TestElement: React.FC = (props) => {
  return <div id="Test Element"></div>;
};

it("Circle without letters is rendered correctly", () => {
  const tree = renderer.create(<Circle />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle with letters is rendered correctly", () => {
  const tree = renderer.create(<Circle letter="A" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle with head is rendered correctly", () => {
  const tree = renderer.create(<Circle head="A" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle with JSX-element in head is rendered correctly", () => {
  const tree = renderer.create(<Circle head={<TestElement />} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle with tail is rendered correctly", () => {
  const tree = renderer.create(<Circle tail="A" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle with JSX-element in tail is rendered correctly", () => {
  const tree = renderer.create(<Circle tail={<TestElement />} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle with prop isSmall === true is rendered correctly", () => {
  const tree = renderer.create(<Circle isSmall={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle with state prop set as Default is rendered correctly", () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Default} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle with state prop set as Changing is rendered correctly", () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Changing} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle with state prop set as Modified is rendered correctly", () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Modified} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
