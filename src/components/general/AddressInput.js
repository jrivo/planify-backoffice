import { Box, TextField } from "@mui/material";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { GoogleAutoComplete, GetPostalCode } from "../../utils.js/thirdParty";

const AddressInput = ({ value, onChange }) => {
  const [addresses, setAddresses] = useState([]); // these are the options for the autocomplete
  const [fullAddress, setFullAddress] = useState("");

  const handleChangeAddress = async (searchValue) => {
    const results = await GoogleAutoComplete(searchValue.target.value);
    if (results) {
      setAddresses(results);
    }
  };

  console.log("onChange from AddressInput", onChange);
  const handleChange = async (value) => {
    for (let x = 0; x < addresses.length; x++) {
      if (value === addresses[x].description) {
        const result = await GetPostalCode(addresses[x].place_id);
        const addressObject = {};
        addressObject.placeId = addresses[x].place_id;
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
        width: 350,
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
          label={"Adresse du bien"}
          name="Address"
          onChange={(value) => {
            handleChangeAddress(value);
          }}
          variant="outlined"
          placeholder="*Adresse du bien"
        />
      )}
    />
  );
};

export default AddressInput;
