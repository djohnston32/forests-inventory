import { render, screen } from "@testing-library/react";
import ForestList from "./ForestList";

test("renders list of forests", () => {
  render(<ForestList />);
  const forestElements = screen.getAllByText(/forest/i);
  expect(forestElements).toHaveLength(3);
});
