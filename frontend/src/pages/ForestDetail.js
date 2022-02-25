import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ForestDetail.css";

const FOREST_URL = "http://0.0.0.0:8000/forest/";

function ForestDetail() {
  const { id } = useParams();
  const [forest, setForest] = useState([]);

  useEffect(() => {
    const fetchForest = async () => {
      setForest({
        id: 1,
        name: "forest 1",
        image_url: "the_url",
        type: "conservation",
        short_description: "a really big forest",
      });
    };

    fetchForest();
  }, [id]);

  return (
    <div>
      Forest Detail
      <h2>{forest.name}</h2>
      <p>{forest.image_url}</p>
      <p>Type: {forest.type}</p>
      <p>{forest.short_description}</p>
    </div>
  );
}

export default ForestDetail;
