const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    `http://api.weatherstack.com/current?access_key=026cd97cacc7a3bd1587ddc0f5ced390&&query=${latitude},${longitude}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (response.body.error) {
      callback("unable to find location", undefined);
    } else
      callback(undefined, 
        response.body.current.weather_descriptions[0] + ", The temperature is: " + response.body.current.temperature + " degress out." 
      );
  });
};

module.exports = forecast;
