import { useState, useEffect } from "react";

import "./ForestList.css";

function ForestList() {
  const [forests, setForests] = useState([]);

  useEffect(() => {
    fetchForests();
  }, []);

  const fetchForests = () => {
    setForests([
      { id: 1, name: "Forest 1" },
      { id: 2, name: "Forest 2" },
      { id: 3, name: "Forest 3" },
    ]);
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
