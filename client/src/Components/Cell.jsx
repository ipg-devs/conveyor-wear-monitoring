import React from "react";
import WearDepthAlert from "./WearDepthAlert";
import WearLocation from "./WearLocation";
import TimeStamp from "./TimeStamp";

export const wearDepths = ["1/16", "1/8", "1/4"];

export default ({ variant, value }) => {
  if (variant === "location" || variant === "Location") return <WearLocation values={value} />;
  if (wearDepths.includes(variant)) return <WearDepthAlert value={value} />;
  if (variant === "timestamp") return <TimeStamp value={value} />;
  return <span>{value}</span>;
};
