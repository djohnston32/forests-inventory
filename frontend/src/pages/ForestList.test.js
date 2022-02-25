import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ForestList from "./ForestList";

test("renders list of forests if request succeeds", async () => {
  window.fetch = jest.fn();
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, name: "Rainforest 1" },
      { id: 2, name: "Rainforest 2" },
      { id: 3, name: "Rainforest 3" },
    ],
  });
  render(
    <BrowserRouter>
      <ForestList />
    </BrowserRouter>
  );

  const forestElements = await screen.findAllByText(/rainforest/i);
  expect(forestElements).toHaveLength(2);
});

test("renders error message if request fails", async () => {
  window.fetch = jest.fn();
  window.fetch.mockResolvedValueOnce({
    ok: false,
  });
  render(
    <BrowserRouter>
      <ForestList />
    </BrowserRouter>
  );

  const errorElement = await screen.findByText(/there was a problem/i);
  expect(errorElement).toBeInTheDocument();
});
