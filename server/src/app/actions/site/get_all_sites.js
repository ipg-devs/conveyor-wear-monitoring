const getAllSitesAction = ({ siteRepo }) => async () => await siteRepo.getAll();

export default getAllSitesAction;
