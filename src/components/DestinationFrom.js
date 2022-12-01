import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import Button from "./general/Button";
import AddressInput from "./general/AddressInput";

const DestinationForm = ({ style, ...rest }) => {
  const [name, setName] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  function handleAddressChange(address) {
    console.log(address);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submited the form ");
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
                <TextField
                  fullWidth
                  label="Place type"
                  name="placeType"
                  value={placeType}
                  onChange={(e) => setPlaceType(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
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
                  // maxRows={4}
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
