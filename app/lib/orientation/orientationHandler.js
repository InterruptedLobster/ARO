
export default HANDLE_ORIENTATION = `
  <script>

    var degreeToRad = function( degree ) {
      return Math.PI / 180 * degree;
    }

    var leftOrRight = function( A, B ) {
      return ( -1 * A.x * B.z ) + ( A.z * B.x ) > 0;
    }

    var angleFromCamera = function( vector ) {
      return camera.getWorldDirection().angleTo( vector );
    }

    var inFrustum = function( vector ) {
      return frustum.containsPoint( vector );
    }

    var getDistanceFromCamera = function( vector ) {
      return Math.sqrt( Math.pow( vector.x, 2 ) + Math.pow( vector.z, 2 ) );
    }

    var renderDirection = function( vector ) {
      $(".left").addClass( "hidden" );
      $(".right").addClass( "hidden" );
      if( !inFrustum( vector ) ) {
        if( leftOrRight( camera.getWorldDirection(), vector ) ) {
          $(".left").removeClass( "hidden" );
        } else {
          $(".right").removeClass( "hidden" );
        }
      }
    }

    var updateHUDForTarget = function( targetLoc ) {
      renderDirection( targetLoc.position );
      $("#target").text( targetLoc.title + ": " + getDistanceFromCamera( targetLoc.position ).toFixed(0) + " feet" );
    }

    if (window.DeviceOrientationEvent) {
      // Listen for the deviceorientation event and handle the raw data
      window.addEventListener('deviceorientation', function( e ) {
        var compassdir;

        if( e.webkitCompassHeading) {
          // Apple works only with this, alpha doesn't work
          compassdir = e.webkitCompassHeading + window.orientation;  
        }
        else compassdir = e.alpha;

        // Set camera's heading
        camera.rotation.y = -degreeToRad( compassdir);
        
        // Configure frustum
        camera.updateMatrix(); // make sure camera's local matrix is updated
        camera.updateMatrixWorld(); // make sure camera's world matrix is updated
        camera.matrixWorldInverse.getInverse( camera.matrixWorld );
        frustum.setFromMatrix( new THREE.Matrix4().multiply( camera.projectionMatrix, camera.matrixWorldInverse ) );

        $("#alpha").text( "Heading: " + compassdir );

        updateHUDForTarget( meshes[targetLocIdx] );

      }, false );
    }

  </script>
`;
