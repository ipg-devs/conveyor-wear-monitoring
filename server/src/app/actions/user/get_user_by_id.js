const getUserByIdAction = ({ userRepo }) => async id => await userRepo.getById(id);

export default getUserByIdAction;
