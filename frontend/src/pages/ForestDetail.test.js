import { render, screen } from "@testing-library/react";
import ForestDetail from "./ForestDetail";

test("renders list of forests if request succeeds", async () => {
  window.fetch = jest.fn();
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => {
      return {
        id: 1,
        name: "Forest 1",
        image_url: "image_url_1",
        type: "conservation",
        short_description: "A really good forest.",
        location: { latitute: 123, longitude: 456 },
        area_hectares: 1000,
        country: "Brazil",
        long_description:
          "A really good forest but with an even longer description.",
      };
    },
  });
  render(<ForestDetail />);

  const forestElements = await screen.findByText(/forest/i);
  expect(forestElements).toBeInTheDocument();
});
