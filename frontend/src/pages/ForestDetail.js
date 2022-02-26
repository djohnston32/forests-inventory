import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import HealthMetrics from "../components/HealthMetrics";
import "./ForestDetail.css";

const FOREST_URL = "http://0.0.0.0:8000/forests/";

// Page for displaying in-depth details about a single forest.
function ForestDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [forest, setForest] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchForest = async () => {
      try {
        const url = FOREST_URL + id;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error occurred.");
        }

        const data = await response.json();

        // TODO better validation

        setForest(data);
        setHasError(false);
      } catch (error) {
        setHasError(true);
      }
    };

    fetchForest();
  }, [id]);

  const goToForestsPage = () => {
    navigate("/forests");
  };

  const geolocationDisplayText = `Latitude: ${forest.latitude}, Longitude: ${forest.longitude}`;

  const content = (
    <>
      <Button variant="contained" onClick={goToForestsPage}>
        Back to List
      </Button>
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
    </>
  );

  return (
    <div className="forest-detail-wrapper">
      {hasError && <p>There was a problem retrieving the forest.</p>}
      {!hasError && content}
    </div>
  );
}

export default ForestDetail;
