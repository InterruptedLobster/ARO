import React from 'react-native';

export const getCurrent = (callback) => {
  navigator.geolocation.getCurrentPosition(
      (position) => {
        var coords = {};
        coords.longitude = position.coords.longitude;
        coords.latitude = position.coords.latitude;
        coords.longitudeDelta = 0.005;
        coords.latitudeDelta = 0.005;
        callback(coords);
      },
      (error) => {
        alert(error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
};

export const setWatch = (callback) => {
  return navigator.geolocation.watchPosition(
    (position) => {
      var coords = {};
      coords.longitude = position.coords.longitude;
      coords.latitude = position.coords.latitude;
      coords.longitudeDelta = 0.005;
      coords.latitudeDelta = 0.005;
      callback(coords);
    }
  );
};

export const clearWatch = (watchID) => {
  navigator.geolocation.clearWatch(
    watchID
  );
};
