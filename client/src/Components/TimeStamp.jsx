import React from "react";
import * as moment from "moment";

export default ({ value }) => <span>{moment(value).format("D/M/YYYY")}</span>;
