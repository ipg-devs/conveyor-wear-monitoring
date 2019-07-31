import path from "path";

module.exports = {
  development: (req, res) => {
    res.send("hello");
  },
  production: (req, res) => {
    res.send("Production not set up yet");
  }
};
