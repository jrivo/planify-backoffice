import DashboardWrapper from "./components/DashboardWrapper";
import { BrowserRouter as Router, Routes, Link } from "react-router-dom";
import Route from "./components/Route";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
