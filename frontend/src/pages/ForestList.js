import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";

import ForestCard from "../components/ForestCard";
import "./ForestList.css";

const FORESTS_URL = "http://0.0.0.0:8000/forests/";

function ForestList() {
  const [forests, setForests] = useState([]);
  const [page, setPage] = useState(1);
  const [forestIndex, setForestIndex] = useState(0);
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

  // Pagination logic
  const MAX_FORESTS_PER_PAGE = 6;
  const numPages = Math.max(
    1,
    Math.ceil(forests.length / MAX_FORESTS_PER_PAGE)
  );

  const handlePageChange = (event, value) => {
    setForestIndex(MAX_FORESTS_PER_PAGE * (value - 1));
    setPage(value);
  };

  const displayedForests = forests.slice(
    forestIndex,
    forestIndex + MAX_FORESTS_PER_PAGE
  );

  // Main rendering logic
  const content = (
    <div className="forest-list-wrapper">
      <div className="forest-list">
        {displayedForests.map((forest) => (
          <ForestCard key={forest.id} forest={forest} />
        ))}
      </div>
      <Pagination
        className="forest-list-pager"
        count={numPages}
        page={page}
        color="primary"
        onChange={handlePageChange}
      />
    </div>
  );

  return (
    <>
      {hasError && <p>There was a problem retrieving forests.</p>}
      {!hasError && content}
    </>
  );
}

export default ForestList;
