import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "@mui/material";

const SuccessBox = ({ message, link }) => {
  console.log(link);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "281px",
      }}
    >
      <CheckCircleIcon sx={{ fontSize: 100, color: "#4caf50" }} />
      <Typography
        variant="h5"
        sx={{
          marginTop: "20px",
          fontSize: 18,
          color: "#4c4c4c",
          textAlign: "center",
        }}
      >
        {message}
      </Typography>
      {link && (
        <Typography
          color="textSecondary"
          variant="body2"
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <Link
            href={link.path}
            variant="subtitle2"
            underline="hover"
            sx={{
              cursor: "pointer",
            }}
          >
            {link.label}
          </Link>
        </Typography>
      )}
    </Box>
  );
};

export default SuccessBox;
