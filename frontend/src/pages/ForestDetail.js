import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    <div>
      Forest Detail
      <h2>{forest.name}</h2>
      <p>{forest.image_url}</p>
      <p>Type: {forest.type}</p>
      <p>{forest.long_description}</p>
      <p>{geolocationDisplayText}</p>
      <p>{forest.area_hectares}</p>
      <p>{forest.country}</p>
    </div>
  );
}

export default ForestDetail;
