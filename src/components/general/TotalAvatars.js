import * as React from "react";
// import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "../Avatar";
import { Box } from "@mui/material";

const TotalAvatars = ({ total, data }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AvatarGroup total={total}>
        {data.map((item) => (
          <Avatar key={item.id} {...item} />
        ))}
      </AvatarGroup>
    </Box>
  );
};

export default TotalAvatars;
