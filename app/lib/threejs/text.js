/*
    THREE_RENDER_TEXT
    This script inserts a function called createTextModel that builds a 3D card for some text.
    It does not add the model to the scene.
    Its intended purpose is to provide captions for the pins rendered in AR view.
*/
const THREE_RENDER_TEXT = `
<script src="http://mrdoob.github.com/three.js/examples/fonts/helvetiker_regular.typeface.js"></script>
<script>
  var textmodels = [];

  var createTextModel = function( text ) {

    var canvas = document.createElement('canvas');
    canvas.width = 2000;
    canvas.height = 400;
    var curve = 75;
    var context = canvas.getContext('2d');
    context.font = "Bold 300px Helvetica";
    context.textAlign = "center"; 
    context.fillStyle = "rgba( 0, 0, 0, 0.5 )";
    context.beginPath();
    context.moveTo( 0, curve );
    context.lineTo( 0, canvas.height-curve );
    context.quadraticCurveTo( 0, canvas.height, curve, canvas.height);
    context.lineTo( canvas.width-curve, canvas.height );
    context.quadraticCurveTo( canvas.width, canvas.height, canvas.width, canvas.height-curve );
    context.lineTo( canvas.width, curve );
    context.quadraticCurveTo( canvas.width, 0, canvas.width-curve, 0);
    context.lineTo( curve, 0 );
    context.quadraticCurveTo( 0, 0, 0, curve);
    context.fill();
    context.fillStyle = "rgba( 0, 0, 0, 1.0 )";
    context.fillText( text, canvas.width/2+10, canvas.height*2/3+10 );
    context.fillStyle = "rgba( 255, 255, 255, 1.0 )";
    context.fillText( text, canvas.width/2, canvas.height*2/3 );

    var texture = new THREE.Texture( canvas );
    texture.needsUpdate = true;

    var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );

    return new THREE.Mesh(
      new THREE.PlaneGeometry( 50, 10 ),
      material
    );
  }
</script>
`;

export default THREE_RENDER_TEXT;
