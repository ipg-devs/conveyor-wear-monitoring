// TIMESTAMP METHOD ROUTE

export default (req, res, next) => {
  console.log(`${Date.now()}     ${req.method.padEnd(6)} ${req.path}`)

  next()
}