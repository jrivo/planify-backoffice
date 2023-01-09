// testing the button component
import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Button from "../Button";

afterEach(cleanup);

describe("Button", () => {
  it("should render the button", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText("Click Me")).toBeInTheDocument();
  });

  it("should call the onClick function", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Click Me</Button>);
    fireEvent.click(getByText("Click Me"));
    expect(onClick).toHaveBeenCalled();
  });

  it("color should be white", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText("Click Me")).toHaveStyle("color: #fff");
  });

  it("background color should be #2D3E50", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText("Click Me")).toHaveStyle(
      `background-color: ${process.env.REACT_APP_PRIMARY_COLOR}`
    );
  });

  it("should have a border radius of 5px", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText("Click Me")).toHaveStyle("border-radius: 5px");
  });

  it("should have a box shadow", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText("Click Me")).toHaveStyle(
      "box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)"
    );
  });

  it("should have a font weight of 300", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText("Click Me")).toHaveStyle("font-weight: 300");
  });
});
