import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Results } from "../pages/Result/Results";
import { Programs } from "../pages/Programs/Programs";
import { Home } from "../pages/Home/Home";

export const Routerr = () => {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/results" element={<Results />} />
        <Route path="/results/programs" element={<Programs />} />
      </Routes>
    </Router>
  );
};

export default Routerr;
