const getBWMSBysiteIdAction = ({ bwmsRepo }) => async ids => await bwmsRepo.getDataByIds(ids);

export default getBWMSBysiteIdAction;
