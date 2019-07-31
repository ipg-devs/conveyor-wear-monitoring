const getAllUsersAction = ({ userRepo }) => async () => await userRepo.getAll();

export default getAllUsersAction;
