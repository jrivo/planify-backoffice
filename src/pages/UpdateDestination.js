import { Box } from "@mui/material";
import DestinationForm from "../components/DestinationFrom";

const UpdateDestination = () => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "50px",
      }}
    >
      <DestinationForm
        style={{
          width: "80%",
        }}
      />
    </Box>
  );
};

export default UpdateDestination;
