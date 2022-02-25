import { useState, useEffect } from "react";

import ForestCard from "../components/ForestCard";
import "./ForestList.css";

const FORESTS_URL = "http://0.0.0.0:8000/forests/";

function ForestList() {
  const [forests, setForests] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchForests();
  }, []);

  const fetchForests = async () => {
    try {
      const response = await fetch(FORESTS_URL);
      if (!response.ok) {
        throw new Error("Error occurred.");
      }

      const data = await response.json();

      // TODO better validation

      const retrievedForests = [];
      for (const key in data) {
        retrievedForests.push(data[key]);
      }

      setForests(retrievedForests);
      setHasError(false);
    } catch (error) {
      setHasError(true);
    }
  };

  return (
    <div className="forest-list">
      {hasError && <p>There was a problem retrieving forests.</p>}
      {!hasError &&
        forests.map((forest) => <ForestCard key={forest.id} forest={forest} />)}
    </div>
  );
}

export default ForestList;
