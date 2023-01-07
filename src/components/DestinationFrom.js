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
import AddressInput from "./general/AddressInput";
import UploadInput from "./general/UploadInput";
import {
  getDestination,
  getPlaceTypes,
  saveDestination,
  updateDestination,
} from "../utils.js/apicalls";
import { useNavigate, useParams } from "react-router-dom";

const DestinationForm = ({ style, ...rest }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [placeTypeList, setPlaceTypeList] = useState([]);
  const [placeTypeId, setPlaceTypeId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [defaultAddressValue, setDefaultAddressValue] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [googleAddressId, setGoogleAddressId] = useState("");

  console.log("params", params);
  const loadData = params.id
    ? async () => {
        console.log("updating a destination");
        console.log("params id", params.id);
        const destination = await getDestination(params.id);
        console.log("destination", destination);
        const placeTypes = await getPlaceTypes();
        setPlaceTypeList(placeTypes);
        setName(destination.name);
        setPlaceTypeId(destination.placeTypeId.toString());
        setEmail(destination.email);
        setPhone(destination.phone);
        setWebsite(destination.website);
        setDescription(destination.description);
        setStreet(destination?.address?.street);
        setStreetNumber(destination?.address?.streetNumber);
        setCity(destination?.address?.city);
        setPostalCode(destination?.address?.postalCode);
        setRegion(destination?.address?.region);
        setCountry(destination?.address?.country);
        setLatitude(destination?.address?.latitude);
        setLongitude(destination?.address?.longitude);
        setGoogleAddressId(destination?.address?.googleAddressId);
      }
    : async () => {
        console.log("creating a destination");

        const placeTypes = await getPlaceTypes();
        setPlaceTypeList(placeTypes);
      };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddressChange = (address) => {
    console.log("address", address);
    setCity(address.city);
    setCountry(address.country);
    setPostalCode(address.postalCode);
    setRegion(address.region);
    setStreet(address.streetName);
    setStreetNumber(address.streetNumber);
    setLongitude(address.longitude);
    setLatitude(address.latitude);
    setGoogleAddressId(address.googleAddressId);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
        console.log("added image");
      }

      console.log("palce type id", placeTypeId);
      formData.append("name", name);
      formData.append("placeType", placeType);
      formData.append("placeTypeId", parseInt(placeTypeId));
      if (email) formData.append("email", email);
      formData.append("phone", phone);
      formData.append("website", website);
      formData.append("description", description);
      formData.append("street", street);
      formData.append("streetNumber", streetNumber);
      formData.append("city", city);
      formData.append("postalCode", postalCode);
      formData.append("region", region);
      formData.append("country", country);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("googleAddressId", googleAddressId);

      const submit = params.id
        ? (data) => updateDestination(params.id, data)
        : saveDestination;
      const response = await submit(formData);
      console.log("status code: ", response.statusCode);
      if (response.statusCode === 400) {
        setErrors(response.message);
      } else if (response.statusCode === 403) {
        setErrors(["You are not authorized to perform this action"]);
      } else if (response.statusCode >= 400) {
        setErrors(["Something went wrong"]);
      } else {
        navigate("/destinations");
      }

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
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
        <CardHeader
          title={params.id ? "Update destination" : "Create your destination"}
        />

        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label={
                    <span>
                      Destination Name
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
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="placeType">
                    Destination type
                    <span
                      style={{
                        color: "red",
                        fontSize: "18px",
                      }}
                    >
                      *
                    </span>
                  </InputLabel>
                  <Select
                    fullWidth
                    label="Place type"
                    name="placeType"
                    value={placeTypeId}
                    onChange={(e) => setPlaceTypeId(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  >
                    {placeTypeList.map((placeType) => (
                      <MenuItem
                        key={placeType.id}
                        value={placeType.id.toString()}
                      >
                        {placeType.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  InputLabelProps={{ shrink: true }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={phone}
                  placeholder="+33 6 00 00 00 00"
                  onChange={(e) => setPhone(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <AddressInput
                  onChange={handleAddressChange}
                  required={true}
                  defaultValue={
                    params.id
                      ? streetNumber +
                        " " +
                        street +
                        ", " +
                        city +
                        ", " +
                        country
                      : ""
                  }
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
              "Update destiantion"
            ) : (
              "Create Destination"
            )}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default DestinationForm;
