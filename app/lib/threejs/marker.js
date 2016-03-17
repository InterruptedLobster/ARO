export default THREE_RENDER_MARKER = `
  <script>
    var camera, scene, renderer;
    var meshes = [];
    var mesh;
    var hemiLight;

    init();
    animate();

    function init() {

      /* CAMERA */

      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5280 );

      scene = new THREE.Scene();

      /* LIGHTS */
      hemiLight = new THREE.HemisphereLight( 0x2194ce, 0x2194ce, 1.25 );
      hemiLight.groundColor.setHSL( 0.6, 1, 0.6 );
      hemiLight.color.setHSL( 0.095, 1, 1.0 );
      hemiLight.position.set( 0, 500, 0 );
      scene.add( hemiLight );

      /* MARKER */

      var geometry = new THREE.Geometry();

      var height = 10;
      var heightsplit = .75
      var width = 4;

      geometry.vertices.push(
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( width/2, height * heightsplit, 0 ),
        new THREE.Vector3( 0, height * heightsplit, -1 * width/2 ),
        new THREE.Vector3( -1 * width/2, height * heightsplit, 0 ),
        new THREE.Vector3( 0, height * heightsplit, width/2 ),
        new THREE.Vector3( 0, height, 0 )
      );

      geometry.faces.push(
        new THREE.Face3( 0, 1, 2 ),
        new THREE.Face3( 0, 2, 3 ),
        new THREE.Face3( 0, 3, 4 ),
        new THREE.Face3( 4, 1, 0 ),
        new THREE.Face3( 5, 2, 1 ),
        new THREE.Face3( 5, 3, 2 ),
        new THREE.Face3( 4, 3, 5 ),
        new THREE.Face3( 1, 4, 5 )
      );

      geometry.computeFaceNormals();
      geometry.computeVertexNormals();

      geometry.computeBoundingBox();

      var material = new THREE.MeshPhongMaterial( { specular: 0x111111, color: 0xffffff, shininess: 100, shading: THREE.FlatShading, side: THREE.FrontSide } );

      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      mesh.position.z = -50;

      /* RENDER SCENE */

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      
      document.body.appendChild( renderer.domElement );

      window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

      camera.aspect = 70;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

      requestAnimationFrame( animate );

      render();

    }

    function render() {

      mesh.rotation.y += 0.01;

      renderer.render( scene, camera );

    }
  </script>
`;
