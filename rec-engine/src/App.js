import "./App.css";
import Interactive from "./components/interactive";
import Navbar from "./components/Navbar";
import About from "./components/about";
import PastRecs from "./components/pastRecs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Interactive />} />
        <Route path="/about" element={<About />} />
        <Route path="/pastRecs" element={<PastRecs />} />
      </Routes>
    </Router>
  );
}

export default App;
