import { useEffect, useState } from "react";
import {
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
import { getPlaceTypes, saveDestination } from "../utils.js/apicalls";

const DestinationForm = ({ style, ...rest }) => {
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
  const [images, setImages] = useState([]);

  const loadData = async () => {
    const placeTypes = await getPlaceTypes();
    setPlaceTypeList(placeTypes);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddressChange = (address) => {
    setCity(address.city);
    setCountry(address.country);
    setPostalCode(address.postalCode);
    setRegion(address.region);
    setStreet(address.streetName);
    setStreetNumber(address.streetNumber);
    setPlaceId(address.placeId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
      console.log("added image");
    }
    formData.append("name", name);
    formData.append("placeType", placeType);
    formData.append("placeTypeId", placeTypeId);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("website", website);
    formData.append("description", description);
    formData.append("street", street);
    formData.append("streetNumber", streetNumber);
    formData.append("city", city);
    formData.append("postalCode", postalCode);
    formData.append("region", region);
    formData.append("country", country);
    const response = await saveDestination(formData);
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
        <CardHeader title="Create you destination" />

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
                    Place type
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
                <AddressInput onChange={handleAddressChange} required={true} />
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
