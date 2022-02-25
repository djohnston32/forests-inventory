import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import HealthMetrics from "../components/HealthMetrics";
import "./ForestDetail.css";

const FOREST_URL = "http://0.0.0.0:8000/forests/";

function ForestDetail() {
  const { id } = useParams();
  const [forest, setForest] = useState([]);

  useEffect(() => {
    const fetchForest = async () => {
      try {
        const url = FOREST_URL + id;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error occurred.");
        }

        const data = await response.json();

        // TODO validate

        setForest(data);
      } catch (error) {
        // TODO Show appropriate error messages in UI
        console.log(error);
      }
    };

    fetchForest();
  }, [id]);

  const geolocationDisplayText = `Latitude: ${forest.latitude}, Longitude: ${forest.longitude}`;

  return (
    <div className="forest-detail-wrapper">
      <Typography variant="h4" component="div">
        <p>{forest.name}</p>
      </Typography>
      <Card sx={{ width: "100%" }}>
        <CardMedia
          component="img"
          height="140"
          image={forest.image_url}
          alt={forest.name}
        />
      </Card>
      <div className="forest-detail-info">
        <div className="forest-detail-info-item">
          <p>{forest.long_description}</p>
          <p>Type: {forest.type}</p>
          <p>Country: {forest.country}</p>
          <p>{geolocationDisplayText}</p>
          <p>Area in hectares: {forest.area_hectares}</p>
        </div>
        <HealthMetrics className="forest-detail-info-item" forest_id={id} />
      </div>
    </div>
  );
}

export default ForestDetail;
