import { MenuItem, Select, TextField } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "./Button";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const SearchBar = ({ value, onChange, placeholder }) => {
  const [selected, setSelected] = useState("activities");
  return (
    <div
      style={{
        backgroundColor: "#F9FAFC",
        borderRadius: "5px",
        padding: "10px",
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
      }}
    >
      <Select
        style={{
          border: "1px solid #eee",
          border: "none",
          borderRadius: "5px 0 0 5px",
          padding: "10px",
          paddingLeft: "10px",
          paddingRight: "10px",
          minWidth: "150px",
          height: "38px",
          outline: "none",
          fontSize: "14px",
          borderLeft: "none",
          backgroundColor: "#FFF",
          color: "#555",
          backgroundColor: "#F9FAFC",
        }}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <MenuItem
          value="activities"
          sx={{
            color: "#333",
          }}
        >
          Activities
        </MenuItem>
        <MenuItem
          sx={{
            color: "#333",
          }}
          value="destination"
        >
          Destinations
        </MenuItem>
      </Select>

      <div
        style={{
          display: "inline-block",
          position: "relative",
        }}
      >
        <SearchIcon
          style={{
            position: "absolute",
            top: "10px",
            // top: "50%",
            // transform: "translateY(-50%)",
            left: "10px",
            color: "#555",
            fontSize: "20px",
          }}
        />
        <input
          value={value}
          onChange={onChange}
          style={{
            border: "1px solid #eee",
            borderLeft: "none",
            borderRadius: "0 5px 5px 0",
            padding: "10px",
            paddingLeft: "36px",
            width: "400px",
            height: "38px",
            outline: "none",
            backgroundColor: "#FFF",
          }}
          placeholder={placeholder ? placeholder : "Search"}
        />
      </div>

      <Button
        style={{
          marginLeft: "20px",
          boxShadow: "none",
          height: "35px",
          fontSize: "12px",
          padding: "0 17px",
        }}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
