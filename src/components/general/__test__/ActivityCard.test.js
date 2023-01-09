// testing the ActivityCard component

import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import ActivityCard from "../ActivityCard";

afterEach(cleanup);

describe("ActivityCard", () => {
  it("should render the person's name", () => {
    const { getByText } = render(
      <ActivityCard
        person="John Doe"
        action="action"
        thing="a new project"
        date="2021-05-01T12:00:00.000Z"
        image="https://randomuser.me/api/port"
      />
    );
    expect(getByText("John Doe")).toBeInTheDocument();
  });

  it("should render the action", () => {
    const { getByText } = render(
      <ActivityCard
        person="John Doe"
        action="action"
        thing="a new project"
        date="2021-05-01T12:00:00.000Z"
        image="https://randomuser.me/api/port"
      />
    );
    expect(getByText("action")).toBeInTheDocument();
  });

  it("should render the thing", () => {
    const { getByText } = render(
      <ActivityCard
        person="John Doe"
        action="action"
        thing="a new project"
        date="2021-05-01T12:00:00.000Z"
        image="https://randomuser.me/api/port"
      />
    );
    expect(getByText("« a new project »")).toBeInTheDocument();
  });
});
