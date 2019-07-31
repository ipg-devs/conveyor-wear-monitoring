const getUserByUsernameAction = ({ userRepo }) => async username => await userRepo.getByUsername(username);

export default getUserByUsernameAction;
