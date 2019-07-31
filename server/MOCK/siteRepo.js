export default ({ siteStore }) => ({
  getAll:() => Promise.resolve(siteStore.getAll()),
  create: data => Promise.resolve(siteStore.create(data)),
  edit: site => Promise.resolve(siteStore.edit(site)),
  destroy: id => Promise.resolve(siteStore.edit(id)),
});