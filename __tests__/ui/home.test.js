import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "@jest/globals";

describe("Testing UI: Unit testing", () => {
  test.skip("had and display a heading title", () => {
    // ARRANGE
    render(<Page />); //this need babel to run convert jsx suntax to javascript

    // ACT
    const heading = screen.getByRole("heading", {
      name: "contact",
    });

    // ASSERT
    expect(heading).toBeDefined();
  });
});
