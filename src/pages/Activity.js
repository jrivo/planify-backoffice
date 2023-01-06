import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";
import { useState, useEffect } from "react";
import { PriceChange } from "@mui/icons-material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "../components/general/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  getActivity,
  deleteActivity,
  getActivitySubscribers,
} from "../utils.js/apicalls";
import TotalAvatars from "../components/general/TotalAvatars";
import AlertDialog from "../components/general/AlertDialog";
import { getFormattedDate, getFormattedTime } from "../utils.js/format";

const Activity = ({ destination, onClick }) => {
  const matches = useMediaQuery("(min-width:1200px)");
  const params = useParams();
  const navigate = useNavigate();
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [shortDate, setShortDate] = useState("");
  const [time, setTime] = useState("");
  const [creator, setCreator] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const activity = await getActivity(params.id);
    const subscribers = await getActivitySubscribers(params.id);

    console.log("subscribers", subscribers);
    console.log("activity is", activity);

    setSubscribers(
      subscribers.map((subscriber) => ({
        id: subscriber.id,
        name: subscriber.firstName + " " + subscriber.lastName,
        alt: subscriber.firstName + " " + subscriber.lastName,
        src: subscriber?.profilePicture?.url,
        tooltipText: subscriber.email,
      }))
    );

    setTitle(activity.name);
    setDescription(activity.description);
    setDate(getFormattedDate(activity.date));
    setShortDate(getFormattedDate(activity.date, "short"));
    setTime(getFormattedTime(activity.date));
    setAddress(
      activity?.address?.streetNumber +
        " " +
        activity?.address?.street +
        ", " +
        activity?.address?.postalCode +
        " " +
        activity?.address?.city
    );
    setPrice(activity.price);
    setCreator(activity.ownerFirstName + " " + activity.ownerLastName);
    setImage(
      activity.medias !== undefined && activity.medias.length > 0
        ? activity.medias[0].url
        : "https://blog.redbubble.com/wp-content/uploads/2017/10/placeholder_image_square.jpg"
    );
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading)
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        size={100}
      />
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "felx-start",
        // paddingTop: "20px",
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
          <Typography
            variant="body2"
            sx={{
              // fontWeight: "bold",
              fontSize: "25px",
              position: matches && "absolute",
              top: "140px",
              right: "1%",
            }}
          >
            {price ? "Price: " + price + "€" : "Free"}{" "}
          </Typography>
          <Typography
            variant="body2"
            style={{
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            {shortDate}
          </Typography>

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
                fontSize: "54px",
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
                onClick={() => navigate("update")}
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
                message="Do you really want to delete this activity?"
                open={alertOpen}
                setOpen={setAlertOpen}
                action={() => {
                  deleteActivity(params.id);
                  navigate("/activities");
                }}
              />
            </Box>
          </Box>
          <Box sx={{ marginBottom: "10px", paddingTop: "20px" }}>
            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Created by: </span>
              <span style={{ color: "#1976d2", cursor: "pointer" }}>
                {creator}
              </span>
            </Typography>

            {subscribers.length > 0 && (
              <Typography
                variant="body2"
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                Participants ({subscribers.length})
              </Typography>
            )}
            <TotalAvatars data={subscribers} total={subscribers.length} />
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
                Date & time
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
                  {date}, <br /> {time}
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
            About this event
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Activity;
