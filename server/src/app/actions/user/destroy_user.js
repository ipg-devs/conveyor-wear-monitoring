const destroyUserAction = ({ userRepo }) => async id =>
  await userRepo.destroy(id);

export default destroyUserAction;
