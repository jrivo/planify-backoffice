import { Box } from "@mui/material";
import DestinationForm from "../components/DestinationFrom";

const CreateDestination = () => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // width: "100%",
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

export default CreateDestination;
