module.exports = () => {
  if (process.env.APP_ENV === "lite") {
    return require("./app.lite.json");
  } else {
    return require("./app.pro.json");
  }
};
