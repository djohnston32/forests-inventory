import { Routes, Route, Navigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ForestList from "./pages/ForestList";
import ForestDetail from "./pages/ForestDetail";

import "./App.css";

function App() {
  return (
    <div className="App">
      <AppBar className="app-bar" position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Forests Inventory
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Navigate replace to="/forests" />} />
        <Route path="/forests" element={<ForestList />} />
        <Route path="/forests/:id" element={<ForestDetail />} />
      </Routes>
    </div>
  );
}

export default App;
