import { Button } from "@mui/material";

const CustomButton = ({ style, sx, children, ...rest }) => {
  const primaryColor = process.env.REACT_APP_PRIMARY_COLOR;
  const primaryLighterColor = process.env.REACT_APP_PRIMARY_LIGHTER_COLOR;
  return (
    <Button
      sx={{
        backgroundColor: primaryColor,
        color: "#fff",
        borderRadius: "5px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        ...style,
        ...sx,
        "&:hover": {
          backgroundColor: primaryLighterColor,
          boxShadow: "none",
        },
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
