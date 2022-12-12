import { MenuItem, Select, TextField } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "./Button";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { HandymanOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ placeholder }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("all");
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search-results", { state: { query: value, object: selected } });
  };

  return (
    <form
      style={{
        backgroundColor: "#F9FAFC",
        borderRadius: "5px",
        padding: "10px",
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
      }}
      onSubmit={handleSubmit}
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
          value="all"
          sx={{
            color: "#333",
          }}
        >
          All
        </MenuItem>
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
          value="places"
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
            left: "10px",
            color: "#555",
            fontSize: "20px",
          }}
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
        type="submit"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
