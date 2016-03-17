let Location = {};

  Location.EARTH_RADIUS_IN_FEET = 5280 * 3961; // feet times miles

  Location.SF_MAGNETIC
  
  Location.locDegreesToKilometers = function ( degrees ) {
    const kmPerNinety = 10000/90;
    // 10,000 km per 90 degrees
    return degrees * kmPerNinety;
  }

  Location.locDegreesToFeet = function ( degrees ) {
    const ftPerKm = 3280.4;
    // 3280.4 feet per kilometer
    var km = this.locDegreesToKilometers( degrees );
    return ftPerKm * km;
  }

  Location.haversine = function ( start, end, R ) {
    var dlon = end.longitude - start.longitude;
    var dlat = end.latitude - start.latitude;
    // a = sin(dlat/2)^2 + cos(sLat) * cos( eLat ) * (sin(dlon/2))^2
    var a = Math.pow( Math.sin( dlat/2 ), 2 ) + Math.cos( start.latitude ) * Math.cos( end.latitude ) * Math.pow( Math.sin( dlon/2 ), 2 );
    // c = 2 * atan2( sqrt(a), sqrt(1-a) )
    var c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1-a ) );
    // d = R * c where R is the radius of the earth.
    var d = R * c;

    return d;
  }

  Location.haversineFeet = function ( start, end ) {
    return haversine( start, end, this.EARTH_RADIUS_IN_FEET );
  }

  Location.relativeLocsInFeet = function ( start, end ) {
    const name = end.name || undefined;
    const z = -1 * this.locDegreesToFeet( end.latitude - start.latitude ).toFixed(1);
    const x = this.locDegreesToFeet( end.longitude - start.longitude ).toFixed(1);
    return { name, x, z };
  }

export default Location;
