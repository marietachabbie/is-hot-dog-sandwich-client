import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Poll from "./Pages/Poll/Poll";
import Answers from "./Pages/Answers/Answers";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Poll />} />
        <Route path="/answers" element={<Answers />} />
      </Routes>
    </Router>
  );
}
