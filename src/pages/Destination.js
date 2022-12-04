import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "../components/general/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  deleteDestination,
  getActivity,
  getDestination,
  getPlaceTypes,
} from "../utils.js/apicalls";
import AlertDialog from "../components/general/AlertDialog";

const formatPhone = (phone) => {
  if (phone.length === 10) {
    return phone.replace(
      /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
      "$1 $2 $3 $4 $5"
    );
  } else if (phone.length === 11) {
    return phone.replace(
      /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
      "+$1 $2 $3 $4 $5"
    );
  }
};
const getFormattedDate = (date, format) => {
  const d = new Date(date);
  if (format === "short") {
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getFormattedTime = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
};

const Activity = ({ destination, onClick }) => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:1200px)");
  const params = useParams();
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [address, setAddress] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [creationTime, setCreationTime] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const loadData = async () => {
    const placeTypes = await getPlaceTypes();
    const destination = await getDestination(params.id);
    setTitle(destination.name);
    setDescription(destination.description);
    setPlaceType(
      placeTypes.find((type) => type.id === destination.placeTypeId)
    );
    console.log(
      "test",
      placeTypes.find((type) => type.id === destination.placeTypeId).name
    );
    setEmail(destination.email);
    setPhone(destination.phone);
    setCreationDate(getFormattedDate(destination.createdAt));
    setCreationTime(getFormattedTime(destination.createdAt));
    setImage(
      destination.medias !== undefined && destination.medias.length > 0
        ? destination.medias[0].url
        : "https://blog.redbubble.com/wp-content/uploads/2017/10/placeholder_image_square.jpg"
    );
  };

  useEffect(() => {
    loadData();
    setCreator("John Doe");
    setAddress("10 rue de la paix, 75000 Paris");
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "felx-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            marginRight: "20px",
            width: "80%",
            height: "300px",
            marginTop: "20px",
          }}
        >
          <img
            src={image}
            alt="destination"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              overflow: "hidden",
            }}
          />
        </Box>
        <Box sx={{ width: "80%", marginTop: "40px", position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "800",
                fontSize: "44px",
                lineHeight: "54px",
                marginBottom: "20px",
              }}
            >
              {title}
            </Typography>

            <Box>
              <Button
                sx={{
                  marginRight: "20px",
                  fontSize: "13px",
                }}
              >
                Add Activity
              </Button>

              <Button
                sx={{
                  marginRight: "20px",
                  fontSize: "13px",
                }}
                onClick={() => {
                  navigate("update");
                }}
              >
                Edit
              </Button>
              <Button
                sx={{
                  fontSize: "13px",
                  backgroundColor: "red",
                  color: "#FFF",
                  "&:hover": {
                    backgroundColor: "red",
                    boxShadow: "none",
                  },
                }}
                onClick={() => {
                  setAlertOpen(true);
                  // deleteDestination(params.id);
                  // navigate("/destinations");
                }}
              >
                Delete
              </Button>
              <AlertDialog
                message="Do you really want to delete this destination?"
                open={alertOpen}
                setOpen={setAlertOpen}
                action={() => {
                  deleteDestination(params.id);
                  navigate("/destinations");
                }}
              />
            </Box>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography
              variant="body2"
              sx={{ color: "#707070", fontSize: "13px", marginBottom: "20px" }}
            >
              {placeType?.name}
            </Typography>

            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Created by: </span>
              <span style={{ color: "#1976d2", cursor: "pointer" }}>
                {creator}
              </span>
            </Typography>
          </Box>
          <Typography
            variant="h5"
            style={{
              fontSize: "25px",
              fontWeight: "700",
              marginTop: "20px",
            }}
          >
            When and where
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginTop: "5px",
              marginBottom: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "50%",
              }}
            >
              <Typography
                variant="body2"
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "5px",
                }}
              >
                Creation date
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CalendarTodayIcon
                  sx={{ color: "#1976d2", marginRight: "15px" }}
                />

                <Typography
                  variant="body2"
                  style={{ fontSize: "14px", color: "#6f7287" }}
                >
                  {creationDate}, <br /> {creationTime}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "50%",
              }}
            >
              <Typography
                variant="body2"
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "5px",
                }}
              >
                Address
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LocationOnIcon
                  sx={{ color: "#1976d2", marginRight: "10px" }}
                />
                <Typography
                  variant="body2"
                  style={{ fontSize: "14px", color: "#6f7287" }}
                >
                  {address}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography
            variant="h5"
            style={{
              fontSize: "25px",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            About this destination
          </Typography>
          <Typography variant="body2">{description}</Typography>

          <Typography
            variant="h5"
            style={{
              fontSize: "25px",
              fontWeight: "700",
              marginBottom: "10px",
              marginTop: "30px",
            }}
          >
            More information
          </Typography>

          <Typography variant="body2">
            <span style={{ fontWeight: "bold" }}>Email: </span>
            <span>{email}</span>
          </Typography>
          <Typography variant="body2">
            <span style={{ fontWeight: "bold" }}>Phone: </span>
            <span>{formatPhone(phone)}</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Activity;
