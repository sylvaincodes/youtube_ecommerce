import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "@jest/globals";
import Page from "@/app/(pages)/(website)/(home)/page"; // need to access DOM
import * as React from 'react'

describe("Testing home UI: Unit testing", () => {
  test("display the homepage", () => {
    //Arrange
    render(<Page />); // this component is JSX format so we need Babel to convert JSX to Javascript syntax.

    //Act
    const heading = screen.getByRole("heading", {
      name: "home",
    });

    //Assert
    expect(heading).toBeDefined();
  });
});
