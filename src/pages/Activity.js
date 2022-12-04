import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import { useState, useEffect } from "react";
import { PriceChange } from "@mui/icons-material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import useMediaQuery from "@mui/material/useMediaQuery";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getActivity, getDestination } from "../utils.js/apicalls";
import TotalAvatars from "../components/general/TotalAvatars";

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
  const matches = useMediaQuery("(min-width:1200px)");
  const params = useParams();
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [shortDate, setShortDate] = useState("");
  const [time, setTime] = useState("");
  const [creator, setCreator] = useState("");
  const [address, setAddress] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [creationTime, setCreationTime] = useState("");
  const [price, setPrice] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [image, setImage] = useState("");

  const loadData = async () => {
    const activity = await getActivity(params.id);

    setTitle(activity.name);
    setDescription(activity.description);
    setDate(getFormattedDate(activity.date));
    setShortDate(getFormattedDate(activity.date, "short"));
    setTime(getFormattedTime(activity.date));
    setCreationDate(getFormattedDate(activity.createdAt));
    setCreationTime(getFormattedTime(activity.createdAt));
    setPrice(activity.price ? activity.price + "€" : "Free");
    setImage(
      activity.medias !== undefined && activity.medias.length > 0
        ? activity.medias[0].url
        : "https://blog.redbubble.com/wp-content/uploads/2017/10/placeholder_image_square.jpg"
    );
  };

  useEffect(() => {
    loadData();
    // setTitle("Aquarium party");
    // setDescription(
    //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat eget ipsum et porta. Ut lobortis rhoncus ultrices. Nunc nulla risus, lacinia pretium auctor at, maximus vitae lorem. Maecenas nunc enim, imperdiet sit amet erat in, euismod luctus orci. Cras sodales tempor nunc. Aenean vitae viverra risus. Vivamus tempor congue vestibulum  Donec non varius tortor, id lobortis enim. Aenean sed urna quis nibh iaculis fringilla vel sit amet massa. Cras mollis eros lectus, vel dictum arcu dapibus in. Sed a nulla et augue feugiat luctus at vel nunc. Nulla nec nulla ultricies, porta orci ac, facilisis risus. Suspendisse sit amet dui euismod, egestas odio ut, venenatis libero. Fusce elementum laoreet justo non consequat. Nullam consectetur rutrum egestas."
    // );
    // setDate("Sun, Nov 13 2022");
    // setShortDate("nov. 13");
    // setTime("2:30 PM");
    setCreator("John Doe");
    // setCreationDate("Sun, Nov 13");
    // setCreationTime("2:30 PM");
    // setPrice("Free");
    setPlaceType("Restaurants . Bars . cafés");
    setAddress("10 rue de la paix, 75000 Paris");
  }, []);
  console.log("params are", params);
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
              fontWeight: "bold",
              fontSize: "25px",
              position: matches && "absolute",
              top: "40px",
              right: "10%",
            }}
          >
            {price}
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
          <Box sx={{ marginBottom: "10px" }}>
            <Typography
              variant="body2"
              sx={{ color: "#707070", fontSize: "13px", marginBottom: "20px" }}
            >
              Restaurants . Bars . cafés
            </Typography>

            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Created by: </span>
              <span style={{ color: "#1976d2", cursor: "pointer" }}>
                {creator}
              </span>
            </Typography>

            <Typography
              variant="body2"
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginTop: "20px",
              }}
            >
              Participants
            </Typography>
            <TotalAvatars
              data={[
                {
                  id: 1,
                  name: "Remy Sharp",
                  alt: "Remy Sharp",
                  src: "https://material-ui.com/static/images/avatar/1.jpg",
                },
                {
                  id: 2,
                  name: "Travis Howard",
                  alt: "Travis Howard",
                  // src: "https://material-ui.com/static/images/avatar/2.jpg",
                },
                {
                  id: 3,
                  name: "Cindy Baker",
                  alt: "Cindy Baker",
                  src: "https://material-ui.com/static/images/avatar/3.jpg",
                },
                {
                  id: 4,
                  name: "Agnes Walker",
                  alt: "Agnes Walker",
                  src: "https://material-ui.com/static/images/avatar/4.jpg",
                },
              ]}
              total={20}
            />
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
