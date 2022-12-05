import { Box } from "@mui/material";
import ActivityForm from "../components/ActivityForm";

const CreateAcivity = () => {
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
      <ActivityForm
        style={{
          width: "80%",
        }}
      />
    </Box>
  );
};

export default CreateAcivity;
