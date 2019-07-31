const getBWMSBysite_idAction = ({ bwmsRepo }) => async ids => await bwmsRepo.getDataByIds(ids);

export default getBWMSBysite_idAction;
