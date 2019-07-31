export default ({ bwmsStore }) => ({
  getAll:() => Promise.resolve(bwmsStore.getAll()),
  getById: id => Promise.resolve(bwmsStore.getById(id)),
  create: data => Promise.resolve(bwmsStore.create(data))
});
