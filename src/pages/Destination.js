import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "../components/general/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReactCardSlider from "react-card-slider-component";
import {
  deleteDestination,
  getActivity,
  getDestination,
  getPlaceTypes,
  getUser,
} from "../utils.js/apicalls";
import AlertDialog from "../components/general/AlertDialog";
import {
  getFormattedDate,
  getFormattedTime,
  formatPhone,
  shortenText,
} from "../utils.js/format";
import Carousel from "../components/general/Carousel";

const Destination = ({ destination, onClick }) => {
  const navigate = useNavigate();
  const params = useParams();
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
  const [rows, setRows] = useState([]);
  const [activities, setActivities] = useState([]);

  const columns = [
    { field: "name", headerName: "Name", width: "200px" },
    { field: "Date", headerName: "Date", width: "200px" },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: "200px",
    },
  ];

  const loadData = async () => {
    const placeTypes = await getPlaceTypes();
    const destination = await getDestination(params.id);
    const user = await getUser(destination.ownerId);
    console.log("this is the owner");
    setCreator(user.firstName + " " + user.lastName);

    console.log("destination", destination);
    setTitle(destination.name);
    setDescription(destination.description);
    setPlaceType(
      placeTypes.find((type) => type.id === destination.placeTypeId)
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
    setAddress(
      destination?.address?.streetNumber +
        " " +
        destination?.address?.street +
        ", " +
        destination?.address?.postalCode +
        " " +
        destination?.address?.city
    );
    setActivities(
      destination.activities.map((activity) => {
        return {
          image:
            activity.medias && activity.medias.length > 0
              ? activity.medias[0].url
              : process.env.REACT_APP_IMAGE_PLACEHOLDER,
          title: shortenText(activity.name, 18),
          subtitle1: getFormattedDate(activity.date),
          subtitle2: activity.address?.city,
          footerText: activity.price ? activity.price + " €" : "Free",
          action: () => {
            navigate(`/activities/${activity.id}`);
          },
        };
      })
    );
  };

  useEffect(() => {
    loadData();
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
                onClick={() => {
                  navigate("/activities/create", {
                    state: { destinationId: params.id },
                  });
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
            {(localStorage.getItem("role") === "ADMIN" ||
              localStorage.getItem("role") === "MODERATOR") && (
              <Typography variant="body2">
                <span style={{ fontWeight: "bold" }}>Created by: </span>

                <span
                  style={{
                    color: "#1976d2",
                    // cursor: "pointer"
                  }}
                >
                  {creator}
                </span>
              </Typography>
            )}
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
              marginTop: "20px",
            }}
          >
            More information
          </Typography>

          <Typography variant="body2">
            <span style={{ fontWeight: "bold" }}>Email: </span>
            <span>{email}</span>
          </Typography>
          <Typography variant="body2">
            {phone && (
              <>
                <span style={{ fontWeight: "bold" }}>Phone: </span>
                <span>{formatPhone(phone)}</span>{" "}
              </>
            )}
          </Typography>

          {activities && activities?.length > 0 && (
            <>
              <Typography
                variant="h5"
                style={{
                  fontSize: "25px",
                  fontWeight: "700",
                  marginBottom: "30px",
                  marginTop: "20px",
                }}
              >
                Activities
              </Typography>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Carousel items={activities} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default Destination;
