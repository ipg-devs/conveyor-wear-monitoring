import Site from "../../models/site";
import { AssertionError } from "assert";

const createSiteAction = ({ siteRepo }) => async ({ name, contact }) => {
  const [err, result] = Site.validate({ name, contact });

  if (err) throw err;

  return await siteRepo.create(result);
};

export default createSiteAction;
