const request = require("request");

const geocode = (address, callback) => {
  const geoUrl =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}
    .json?access_token=pk.eyJ1IjoicmFqYWFnaGFuZW0iLCJhIjoiY2t5YTlkeDVsMDM4NzJ1bjBhc3Rmdm5wOCJ9.V0Pj86Ql9ewIQwk6iEil2g&limit=1`;
  request({ url: geoUrl, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (response.body.features.length === 0) {
      callback("unable to find location", undefined);
    } else
      callback(undefined, {
        latitude: response.body.features[0].geometry.coordinates[1],
        longtude: response.body.features[0].geometry.coordinates[0],
        location: response.body.features[0].place_name,
      });
  });
};

module.exports = geocode;
