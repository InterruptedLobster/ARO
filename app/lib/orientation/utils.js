import React from 'react-native';


/* 
    getCurrent( callback )
      callback( {longitude, latitude, longitudeDelta, latitudeDelta} )
*/
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

/* 
    setWatch( callback )
      callback( {longitude, latitude, longitudeDelta, latitudeDelta} )
      Returns a reference to the position that is constantly updated
*/
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

/* 
    getCurrent( watchID )
      Clears the listener on the watchID object, which is expected
      to be a reference created by navigator.geolocation.watchPosition.
*/

export const clearWatch = (watchID) => {
  navigator.geolocation.clearWatch(
    watchID
  );
};

