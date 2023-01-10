import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { GoogleAutoComplete, GetPostalCode } from "../../utils.js/thirdParty";

const AddressInput = ({ onChange, required, defaultValue }) => {
  console.log("defaultValue", defaultValue);
  const [addresses, setAddresses] = useState([]); // these are the options for the autocomplete
  const [fullAddress, setFullAddress] = useState(
    defaultValue ? defaultValue : ""
  ); // this is the full address that is displayed in the text field

  const handleChangeAddress = async (searchValue) => {
    const results = await GoogleAutoComplete(searchValue.target.value);
    if (results) {
      setAddresses(results);
    }
  };

  useEffect(() => {
    setFullAddress(defaultValue ? defaultValue : "");
  }, [defaultValue]);

  const getCoordinates = async (placeId) => {
    console.log("api key", process.env.GOOGLE_MAPS_KEY);
    const response = await fetch(
      // `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`
      process.env.REACT_APP_SERVER_URL + "address-details?placeId=" + placeId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
      }
    );
    const data = await response.json();
    return data?.result?.geometry?.location;
  };

  const handleChange = async (value) => {
    for (let x = 0; x < addresses.length; x++) {
      if (value === addresses[x].description) {
        console.log("address value", addresses[x]);
        setFullAddress(addresses[x].description);

        const coordinates = await getCoordinates(addresses[x].place_id);
        console.log("coordinates", coordinates);
        const result = await GetPostalCode(addresses[x].place_id);
        const addressObject = {};
        // latitude
        // longitude
        // googleAddressId
        addressObject.latitude = coordinates?.lat;
        addressObject.longitude = coordinates?.lng;
        addressObject.googleAddressId = addresses[x].place_id;
        console.log("address results", result);
        result.address_components.forEach((component) => {
          if (component.types.includes("postal_code")) {
            addressObject.postalCode = component.long_name;
          }
          if (component.types.includes("street_number")) {
            addressObject.streetNumber = component.long_name;
          }
          if (component.types.includes("route")) {
            addressObject.streetName = component.long_name;
          }
          if (component.types.includes("locality")) {
            addressObject.city = component.long_name;
          }
          if (component.types.includes("country")) {
            addressObject.country = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            addressObject.region = component.long_name;
          }
        });
        onChange(addressObject);
      }
    }
  };

  return (
    <Autocomplete
      id="address"
      name="address"
      inputProps={{
        shrink: false,
        min: 0,
        style: { transitionDuration: "0s !important" },
      }}
      disableAnimation={true}
      shrink={false}
      options={addresses.map((option) => option.description)}
      style={{
        backgroundColor: "#FFF",
        borderRadius: "10px",
      }}
      value={fullAddress}
      onInputChange={(event, value) => {
        handleChange(value);
      }}
      renderInput={(params) => (
        <TextField
          disableAnimation={true}
          {...params}
          shrink={false}
          label={
            required ? (
              <span>
                Address
                <span
                  style={{
                    color: "red",
                    fontSize: "18px",
                  }}
                >
                  *
                </span>
              </span>
            ) : (
              "Address"
            )
          }
          name="Address"
          onChange={(value) => {
            handleChangeAddress(value);
          }}
          variant="outlined"
        />
      )}
    />
  );
};

export default AddressInput;
