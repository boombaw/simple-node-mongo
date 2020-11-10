// get pagination
module.exports = (page, limit) => {
  var offset = 0;

  if (page > 1) {
      offset = ( (page /1) * limit) - limit;
  }

  return { offset };
};