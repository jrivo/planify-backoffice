import * as React from "react";
// import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "../Avatar";

const TotalAvatars = ({ total, data }) => {
  return (
    <AvatarGroup total={24}>
      {data.map((item) => (
        <Avatar key={item.id} {...item} />
      ))}
    </AvatarGroup>
  );
};

export default TotalAvatars;
