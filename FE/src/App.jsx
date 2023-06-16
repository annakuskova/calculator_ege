import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
import Home from "./pages/Home/Home";
import { Programs } from "./pages/Programs/Programs";
import { Results } from "./pages/Result/Results";


function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results/programs" element={<Programs />} />
      </Routes>
      <ToastContainer style={{ width: "400px" }} />
    </Router>
  );
}

export default App;
