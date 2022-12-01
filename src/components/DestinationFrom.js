import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
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
import { getPlaceTypes, saveDestination } from "../utils.js/apicalls";
import { Save } from "@mui/icons-material";

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

  const loadData = async () => {
    const placeTypes = await getPlaceTypes();
    console.log(placeTypes);
    setPlaceTypeList(placeTypes);
  };

  useEffect(() => {
    loadData();
  }, []);

  function handleAddressChange(address) {
    console.log(address);
    setCity(address.city);
    setCountry(address.country);
    setPostalCode(address.postalCode);
    setRegion(address.region);
    setStreet(address.streetName);
    setStreetNumber(address.streetNumber);
    setPlaceId(address.placeId);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await saveDestination({
      name,
      placeTypeId,
      email,
      phone,
      website,
      description,
      street,
      streetNumber,
      city,
      postalCode,
      region,
      country,
      // placeId,
    });
    console.log(response);
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
                  label="Destination Name"
                  name="name"
                  InputLabelProps={{ shrink: true }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="placeType">Place type</InputLabel>
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
                      <MenuItem key={placeType.id} value={placeType.id}>
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
                  label="Date of birth"
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
                <AddressInput onChange={handleAddressChange} />
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
          <Button color="primary" variant="contained" type="submit">
            Create Destination
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default DestinationForm;
