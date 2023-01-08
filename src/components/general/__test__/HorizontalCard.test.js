// testing the ActivityCard component

import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import HorizontalCard from "../HorizontalCard";

afterEach(cleanup);

// Fields
// title,
// subtitle1,
// image,
// subtitle2,
// footerText,
// style,
// action,

describe("HorizontalCard", () => {
  it("should render the title", () => {
    const { getByText } = render(
      <HorizontalCard
        title="title"
        subtitle1="subtitle1"
        image="https://randomuser.me/api"
        subtitle2="subtitle2"
        footerText="footerText"
      />
    );
    expect(getByText("title")).toBeInTheDocument();
  });

  it("should render the subtitle1", () => {
    const { getByText } = render(
      <HorizontalCard
        title="title"
        subtitle1="subtitle1"
        image="https://randomuser.me/api"
        subtitle2="subtitle2"
        footerText="footerText"
      />
    );
    expect(getByText("subtitle1")).toBeInTheDocument();
  });

  it("should render the subtitle2", () => {
    const { getByText } = render(
      <HorizontalCard
        title="title"
        subtitle1="subtitle1"
        image="https://randomuser.me/api"
        subtitle2="subtitle2"
        footerText="footerText"
      />
    );

    expect(getByText("subtitle2")).toBeInTheDocument();
  });

  it("should render the footerText", () => {
    const { getByText } = render(
      <HorizontalCard
        title="title"
        subtitle1="subtitle1"
        image="https://randomuser.me/api"
        subtitle2="subtitle2"
        footerText="footerText"
      />
    );
    expect(getByText("footerText")).toBeInTheDocument();
  });

  it("title font size should be 15px", () => {
    const { getByText } = render(
      <HorizontalCard
        title="title"
        subtitle1="subtitle1"
        image="https://randomuser.me/api"
        subtitle2="subtitle2"
        footerText="footerText"
      />
    );
    expect(getByText("title")).toHaveStyle("font-size: 15px");
  });

  it("subtitle1 font size should be 0.875rem", () => {
    const { getByText } = render(
      <HorizontalCard
        title="title"
        subtitle1="subtitle1"
        image="https://randomuser.me/api"
        subtitle2="subtitle2"
        footerText="footerText"
      />
    );
    expect(getByText("subtitle1")).toHaveStyle("font-size: 0.875rem");
  });

  it("subtitle2 font size should be 0.875rem", () => {
    const { getByText } = render(
      <HorizontalCard
        title="title"
        subtitle1="subtitle1"
        image="https://randomuser.me/api"
        subtitle2="subtitle2"
        footerText="footerText"
      />
    );
    expect(getByText("subtitle2")).toHaveStyle("font-size: 0.875rem");
  });

  it("footerText font size should be 0.875rem", () => {
    const { getByText } = render(
      <HorizontalCard
        title="title"
        subtitle1="subtitle1"
        image="https://randomuser.me/api"
        subtitle2="subtitle2"
        footerText="footerText"
      />
    );
    expect(getByText("footerText")).toHaveStyle("font-size: 0.875rem");
  });

  it("footerText should be bold", () => {
    const { getByText } = render(
      <HorizontalCard
        title="title"
        subtitle1="subtitle1"
        image="https://randomuser.me/api"
        subtitle2="subtitle2"
        footerText="footerText"
      />
    );
    expect(getByText("footerText")).toHaveStyle("font-weight: 700");
  });
});
