import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders forests inventory heading", () => {
  render(<App />);
  const linkElement = screen.getByText(/forests inventory/i);
  expect(linkElement).toBeInTheDocument();
});
