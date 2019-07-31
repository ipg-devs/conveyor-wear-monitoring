export default ({ userStore }) => ({
  getAll: () => Promise.resolve(userStore.getAll()),
  getById: id => Promise.resolve(userStore.getById(id)),
  getByUsername: username => Promise.resolve(userStore.getByUsername(username)),
  create: user => Promise.resolve(userStore.create(user)),
  edit: user => Promise.resolve(userStore.edit(user)),
  destroy: id => Promise.resolve(userStore.edit(id))
});
