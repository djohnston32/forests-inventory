import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ForestList from "./ForestList";

test("renders list of forests if request succeeds", async () => {
  window.fetch = jest.fn();
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, name: "Forest 1" },
      { id: 2, name: "Forest 2" },
      { id: 3, name: "Forest 3" },
    ],
  });
  render(
    <BrowserRouter>
      <ForestList />
    </BrowserRouter>
  );

  const forestElements = await screen.findAllByText(/forest/i);
  expect(forestElements).toHaveLength(3);
});
