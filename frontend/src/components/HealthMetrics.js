import { useState, useEffect } from "react";
import "./HealthMetrics.css";

function HealthMetrics(props) {
  const [healthMetrics, setHealthMetrics] = useState([]);

  useEffect(() => {
    const fetchHealthMetrics = async () => {
      try {
        // TODO Move parts of url to constants file to reduce duplication.
        const url = `http://0.0.0.0:8000/forests/${props.forest_id}/health`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error occurred.");
        }

        const data = await response.json();

        // TODO validate

        setHealthMetrics(data.metrics);
      } catch (error) {
        // TODO Show appropriate error messages in UI
        console.log(error);
      }
    };

    fetchHealthMetrics();
  }, [props.forest_id]);

  return (
    <div>
      Health Metrics
      <p>{healthMetrics.carbon_stored_tonnes}</p>
      <p>{healthMetrics.thirty_day_carbon_change_tonnes}</p>
    </div>
  );
}

export default HealthMetrics;
