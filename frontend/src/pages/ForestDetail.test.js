import { render, screen } from "@testing-library/react";
import ForestDetail from "./ForestDetail";

test("renders forest", async () => {
  const forest = {
    id: 1,
    name: "forest 1",
    image_url: "the_url",
    type: "conservation",
    short_description: "a really big forest",
  };
  render(<ForestDetail forest={forest} />);

  const forestElement = screen.getByText(/forest detail/i);
  expect(forestElement).toBeInTheDocument();
});
