import { Route, Navigate } from "react-router-dom";
import DashboardWrapper from "./DashboardWrapper";

const CRoute = ({ element, protectedRoute, ...rest }) => {
  return <Route path="/" element={<DashboardWrapper />} />;
};

export default CRoute;
