import React from "react";
import { Typography } from "@material-ui/core";

const SiteContact = ({ contact }) => {
  const { person, address, phone, email } = contact;

  return (
    <div>
      <Typography>{person}</Typography>
      <Typography>{phone}</Typography>
      <Typography>{email}</Typography>
      <Typography>{address.street}</Typography>
      <Typography>{address.cityAndState}</Typography>
    </div>
  );
};

export default SiteContact;
