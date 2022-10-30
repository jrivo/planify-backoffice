import DashboardWrapper from "./components/DashboardWrapper";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Destination from "./pages/Destination";
import Activities from "./pages/Activities";
import Login from "./pages/Login";
import Activity from "./pages/Activity";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardWrapper>
              <Home />
            </DashboardWrapper>
          }
        />
        <Route
          path="/destinations"
          element={
            <DashboardWrapper>
              <Destinations />
            </DashboardWrapper>
          }
        />
        <Route
          path="/destinations/:userId"
          element={
            <DashboardWrapper>
              <Destination />
            </DashboardWrapper>
          }
        />
        <Route
          path="/activities"
          element={
            <DashboardWrapper>
              <Activities />
            </DashboardWrapper>
          }
        />
        <Route
          path="/activities/:userId"
          element={
            <DashboardWrapper>
              <Activity />
            </DashboardWrapper>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
