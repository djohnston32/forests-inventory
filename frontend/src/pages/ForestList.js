import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import ForestCard from "../components/ForestCard";
import "./ForestList.css";

const FORESTS_URL = "http://0.0.0.0:8000/forests/";

/* Displays the list of forests. */
function ForestList() {
  // The list of forests received from the backend
  const [forests, setForests] = useState([]);

  // State and constants for pagination. "page" is the current page number.  "forestIndex" is the
  // index of the first forest to display on the current page.
  const [page, setPage] = useState(1);
  const [forestIndex, setForestIndex] = useState(0);
  const MAX_FORESTS_PER_PAGE = 2;

  // Values for the search and type filter inputs.
  const [searchValue, setSearchValue] = useState("");
  const [typeFilterValue, setTypeFilterValue] = useState("");

  // Used to toggle messages if something goes wrong.
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

  // Filtering logic
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value.toLowerCase());
    handlePageChange(null, 1);
  };

  const handleTypeFilterChange = (event) => {
    setTypeFilterValue(event.target.value);
    handlePageChange(null, 1);
  };

  const hasFilteredName = (forest) =>
    forest.name.toLowerCase().includes(searchValue);
  const hasFilteredType = (forest) =>
    typeFilterValue === "" || forest.type === typeFilterValue;
  const filteredForests = forests.filter(
    (forest) => hasFilteredName(forest) && hasFilteredType(forest)
  );

  // Pagination logic
  const numPages = Math.max(
    1,
    Math.ceil(filteredForests.length / MAX_FORESTS_PER_PAGE)
  );

  const handlePageChange = (event, value) => {
    setForestIndex(MAX_FORESTS_PER_PAGE * (value - 1));
    setPage(value);
  };

  const displayedForests = filteredForests.slice(
    forestIndex,
    forestIndex + MAX_FORESTS_PER_PAGE
  );

  // Main rendering logic
  const searchInput = (
    <Box
      component="form"
      sx={{ width: 300, marginBottom: "20px" }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Search by Name"
        variant="outlined"
        value={searchValue}
        onChange={handleSearchChange}
      />
    </Box>
  );

  const typeSelect = (
    <Box sx={{ width: 170, marginBottom: "20px" }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">Forest Type</InputLabel>
        <Select
          labelId="select-label"
          value={typeFilterValue}
          label="Type"
          onChange={handleTypeFilterChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="conservation">Conservation</MenuItem>
          <MenuItem value="reforestation">Reforestation</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  const filterBar = (
    <div className="filter-bar">
      {searchInput}
      {typeSelect}
    </div>
  );

  const forestContent = (
    <div className="forest-list-wrapper">
      {filterBar}
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
      {!hasError && forestContent}
    </>
  );
}

export default ForestList;
