import { useState, useEffect } from "react";

import "./ForestList.css";

const FORESTS_URL = "http://0.0.0.0:8000/forests/";

function ForestList() {
  const [forests, setForests] = useState([]);

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

      const retrievedForests = [];
      for (const key in data) {
        retrievedForests.push({
          id: data[key].id,
          name: data[key].name,
        });
      }

      setForests(retrievedForests);
    } catch (error) {
      // TODO Show appropriate error messages in UI
      console.log(error);
    }
  };

  return (
    <div>
      {forests.map((forest) => (
        <p key={forest.id}>{forest.name}</p>
      ))}
    </div>
  );
}

export default ForestList;
