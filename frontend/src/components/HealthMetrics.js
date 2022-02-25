import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import "./HealthMetrics.css";

function HealthMetrics(props) {
  const [healthMetrics, setHealthMetrics] = useState([]);
  const [hasError, setHasError] = useState(false);

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

        // TODO better validation

        setHealthMetrics(data.metrics);
        setHasError(false);
      } catch (error) {
        setHasError(true);
      }
    };

    fetchHealthMetrics();
  }, [props.forest_id]);

  const content = (
    <Card sx={{ width: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Health Metrics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Carbon Stored (tonnes): {healthMetrics.carbon_stored_tonnes}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Change in last 30 days (tonnes):{" "}
          {healthMetrics.thirty_day_carbon_change_tonnes}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <>
      {hasError && <p>There was a problem retrieving health metrics.</p>}
      {!hasError && content}
    </>
  );
}

export default HealthMetrics;
