import React from "react";
import * as moment from "moment";

export default ({ value }) => <span>{moment(value).add(6, 'hours').format("MM/DD/YYYY hh:mm:ss")}</span>;
