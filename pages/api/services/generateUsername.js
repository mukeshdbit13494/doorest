exports.generateUsername = function (name, arr) {
  const random = Math.floor(Math.random * 999999);
  const username = name.charAt(0).toUpperCase() + random;
  if (arr.indexOf(username) >= 0) {
    return username;
  }
};
