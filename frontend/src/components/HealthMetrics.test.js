import { render, screen } from "@testing-library/react";
import HealthMetrics from "./HealthMetrics";

test("renders forest health metrics if request succeeds", async () => {
  window.fetch = jest.fn();
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => {
      return {
        forest_id: 1,
        date: "January 1",
        metrics: {
          carbon_stored_tonnes: 100,
          thirty_day_carbon_change_tonnes: 12,
        },
      };
    },
  });
  render(<HealthMetrics forest_id={1} />);

  const healthMetricsElement = await screen.findByText(/Health Metrics/i);
  expect(healthMetricsElement).toBeInTheDocument();
});

test("renders error message if request fails", async () => {
  window.fetch = jest.fn();
  window.fetch.mockResolvedValueOnce({
    ok: false,
  });
  render(<HealthMetrics />);

  const errorElement = await screen.findByText(/there was a problem/i);
  expect(errorElement).toBeInTheDocument();
});
