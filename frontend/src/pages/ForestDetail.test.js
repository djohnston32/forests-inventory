import { render, screen } from "@testing-library/react";
import ForestDetail from "./ForestDetail";
import { BrowserRouter } from "react-router-dom";

jest.mock("../components/HealthMetrics", () => () => {
  const HealthMetricsMock = "health-metrics-mock";
  return <HealthMetricsMock />;
});

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
        latitute: 123,
        longitude: 456,
        area_hectares: 1000,
        country: "Brazil",
        long_description:
          "A really good forest but with an even longer description.",
      };
    },
  });
  render(
    <BrowserRouter>
      <ForestDetail />
    </BrowserRouter>
  );

  const forestElements = await screen.findAllByText(/forest/i);
  expect(forestElements[0]).toBeInTheDocument();
});
