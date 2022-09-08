import { Route } from "react-router-dom";
import DashboardWrapper from "./DashboardWrapper";

const CRoute = ({ element, ...rest }) => {
  return (
    // <Route path="/" element={<DashboardWrapper />} />
    <Route path="/" element={<DashboardWrapper />} />

    // <Route
    //   {...rest}
    //   path="/"
    //   element={<DashboardWrapper>{element}</DashboardWrapper>}
    // />
  );
};

export default CRoute;
