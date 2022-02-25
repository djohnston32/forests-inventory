import { Routes, Route, Navigate } from "react-router-dom";

import ForestList from "./pages/ForestList";
import ForestDetail from "./pages/ForestDetail";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Forests Inventory</p>
      </header>
      <Routes>
        <Route path="/" element={<Navigate replace to="/forests" />} />
        <Route path="/forests" element={<ForestList />} />
        <Route path="/forests/:id" element={<ForestDetail />} />
      </Routes>
    </div>
  );
}

export default App;
