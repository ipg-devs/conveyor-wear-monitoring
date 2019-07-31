const destroySiteAction = ({ siteRepo }) => async id => await siteRepo.destroy(id);

export default destroySiteAction;
