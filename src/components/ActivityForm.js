import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "./general/Button";
import UploadInput from "./general/UploadInput";
import {
  getDestination,
  getPlaceTypes,
  saveActivity,
  saveDestination,
  updateDestination,
} from "../utils.js/apicalls";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const ActivityForm = ({ route, style, ...rest }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const location = useLocation();

  console.log("location", location);

  useEffect(() => {
    console.log("params", params);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (name) formData.append("name", name);
    if (description) formData.append("description", description);
    if (date) formData.append("date", date);
    if (price) formData.append("price", price);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    const response = await saveActivity(location.state.destinationId, formData);
    console.log("response", response);
    setLoading(false);
  };

  const handleImageChange = async (e) => {
    const images = e.target.files;
    console.log("images: ", images);
    setImages(images);
  };

  return (
    <form
      autoComplete="off"
      noValidate
      style={style}
      {...rest}
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader title="Create a new activity" />

        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <>
              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label={
                    <span>
                      Activity Name
                      <span
                        style={{
                          color: "red",
                          fontSize: "18px",
                        }}
                      >
                        *
                      </span>
                    </span>
                  }
                  name="name"
                  InputLabelProps={{ shrink: true }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  InputLabelProps={{ shrink: true }}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <UploadInput onChange={handleImageChange}>
                  Upload images
                </UploadInput>
                {/* display file names */}
                {images.length > 0 && (
                  <ul>
                    {Array.from(images).map((image) => (
                      <li
                        style={{
                          listStyleType: "none",
                          marginRight: "10px",
                        }}
                        key={image.name}
                      >
                        {image.name}
                      </li>
                    ))}
                  </ul>
                )}
              </Grid>
            </>
          </Grid>
          {errors && (
            <Box mt={3}>
              {errors.map((error) => (
                <Alert severity="error" key={error} sx={{ marginTop: "5px" }}>
                  {error}
                </Alert>
              ))}
            </Box>
          )}
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
            sx={{
              width: "200px",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#FFF" }} />
            ) : params.id ? (
              "Update activity"
            ) : (
              "Create activity"
            )}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ActivityForm;
