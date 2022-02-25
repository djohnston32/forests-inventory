import { Routes, Route, Navigate } from "react-router-dom";

import ForestList from "./pages/ForestList";

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
      </Routes>
    </div>
  );
}

export default App;
