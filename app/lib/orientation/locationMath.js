/*
  Location

  Constants:
    EARTH_RADIUS_IN_FEET

  Methods:
    locDegreesToKilometers( degrees )
      Returns degrees converted to kilometers
    locDegreesToFeet( degrees )
      Returns degrees converted to feet
    haversine( start, end, R )
      start -- object with longitude and latitude
      end -- object with longitude and latitude
      R -- number referring to radius of planet
      Returns distance between two points taking radius of planet into account.
    haversineFeet( start, end )
      start -- object with longitude and latitude
      end -- object with longitude and latitude
      Returns distance between two points taking radius of earth in feet into account.
    pythag( start, end )
      start -- object with longitude and latitude
      end -- object with longitude and latitude
      Returns distance between two points using pythagorean theorem.
    bearing( x, z )
      Given relative coordinates of an object from 0, 0,
      Returns the direction of those coordinates
    relativeLocsInFeet( start, end )
      start -- object with longitude and latitude
      end -- object with longitude and latitude
      Returns a new object that inherits
        end.id
        end.title
      and generates end.x and end.z as relative coordinates
      assuming start is at 0, 0, and converting longitude
      and latitude to feet

*/
let Location = {};

  Location.EARTH_RADIUS_IN_FEET = 5280 * 3961; // feet times miles
  
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
    return this.haversine( start, end, this.EARTH_RADIUS_IN_FEET );
  }

  Location.pythag = function( start, end ) {
    var a = end.longitude - start.longitude;
    var b = end.latitude - start.latitude;
    var c = Math.sqrt( Math.pow( a, 2 ) + Math.pow( b, 2 ) );
    return this.locDegreesToFeet( c );
  }

  Location.bearing = function( x, z ) {
    return Math.atan2( z, x );
  }

  Location.relativeLocsInFeet = function ( start, end ) {
    const title = end.title || undefined;
    const id = end.id || undefined;
    const z = -1 * this.locDegreesToFeet( end.latitude - start.latitude ).toFixed(1);
    const x = this.locDegreesToFeet( end.longitude - start.longitude ).toFixed(1);
    return { id, title, x, z };
  }

export default Location;
