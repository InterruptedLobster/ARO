
export default HANDLE_ORIENTATION = `
  <script>

    var degreeToRad = function( degree ) {
      return Math.PI / 180 * degree;
    }

    if (window.DeviceOrientationEvent) {
      // Listen for the deviceorientation event and handle the raw data
      window.addEventListener('deviceorientation', function( e ) {
        var compassdir;

        if( e.webkitCompassHeading) {
          // Apple works only with this, alpha doesn't work
          compassdir = e.webkitCompassHeading;  
        }
        else compassdir = e.alpha;

        camera.rotation.y = -degreeToRad( compassdir );

        $("#alpha").text( compassdir );
      }, false );
    }

  </script>
`;
