import Site from "../../models/site";

const updateSiteAction = ({ siteRepo }) => async editedSite => {
  const [err, result] = Site.validate({ editedSite });

  if (err) throw err;

  return await siteRepo.update(result)
};

export default updateSiteAction;
