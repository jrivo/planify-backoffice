import DashboardWrapper from "./components/DashboardWrapper";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Destination from "./pages/Destination";
import Activities from "./pages/Activities";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Activity from "./pages/Activity";
import Account from "./pages/Account";
import CreateDestination from "./pages/CreateDestination";
import UpdateDestination from "./pages/UpdateDestination";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardWrapper>
              <Activities />
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
          path="/destinations/:id"
          element={
            <DashboardWrapper>
              <Destination />
            </DashboardWrapper>
          }
        />
        <Route
          path="/destinations/create"
          element={
            <DashboardWrapper>
              <CreateDestination />
            </DashboardWrapper>
          }
        />

        <Route
          path="/destinations/:id"
          element={
            <DashboardWrapper>
              <Destination />
            </DashboardWrapper>
          }
        />

        <Route
          path="/destinations/:id/update"
          element={
            <DashboardWrapper>
              <UpdateDestination />
            </DashboardWrapper>
          }
        />
        <Route
          path="/activities/:id"
          element={
            <DashboardWrapper>
              <Activity />
            </DashboardWrapper>
          }
        />

        <Route
          path="/account"
          element={
            <DashboardWrapper>
              <Account />
            </DashboardWrapper>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
