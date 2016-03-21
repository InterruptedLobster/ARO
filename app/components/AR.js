import React, { Component, StyleSheet, Dimensions, View } from 'react-native';
import Camera from 'react-native-camera';
import WebViewBridge from 'react-native-webview-bridge';
import THREE_RENDER_MARKER from '../lib/threejs/marker.js';
import HANDLE_ORIENTATION from '../lib/orientation/orientationHandler.js';
import Location from '../lib/orientation/locationMath.js';
import _ from 'underscore';
const REF_WEBVIEW_BRIDGE = 'webviewbridge';

const WEBVIEW_STYLE = `
  * {
    color: white;
    margin: 0;
    padding: 0;
    font: 62.5% arial, sans-serif;
    background: transparent;
  }
`;

const WEBVIEW_SCRIPTS = `
  <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r74/three.min.js"></script>
  ${ THREE_RENDER_MARKER }
  ${ HANDLE_ORIENTATION }
`;

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>findAR WebView</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
    ${ WEBVIEW_STYLE }
    </style>
  </head>
  <body>
    <p id="alpha"></p>
    ${ WEBVIEW_SCRIPTS }
  </body>
</html>
`;

const BRIDGE_INJECT_SCRIPT = `
  function webViewBridgeReady(cb) {
    //checks whether WebViewBridge exists in global scope.
    if (window.WebViewBridge) {
      cb(window.WebViewBridge);
      return;
    }

    function handler() {
      //remove the handler from listener since we don't need it anymore
      document.removeEventListener('WebViewBridge', handler, false);
      //pass the WebViewBridge object to the callback
      cb(window.WebViewBridge);
    }

    //if WebViewBridge doesn't exist in global scope attach itself to document
    //event system. Once the code is being injected by extension, the handler will
    //be called.
    document.addEventListener('WebViewBridge', handler, false);
  }

  webViewBridgeReady( function (webViewBridge) {
    webViewBridge.send( "BRIDGE_READY" );
    webViewBridge.onMessage = function (message) {
      // Message is an array of all of the pins we want to display,
      // where x and z on each pin is the relative location to the
      // device in feet.
      var locs = JSON.parse( message );

      mesh.visible = false;

      locs.forEach( function( loc, i ) {
        if( !( meshes[i] instanceof THREE.Mesh ) ) {
          meshes[i] = mesh.clone();
          meshes[i].visible = true;
          scene.add( meshes[i] );
        }
        meshes[i].position.x = loc.x;
        meshes[i].position.z = loc.z;
      });

      // TODO: Delete any meshes in indices greater than or equal to locs.length;
    };
  });
`;

export default class AR extends Component {
  constructor(props) {
    super(props);
  }


  calculateLocs( currentLocation, objectOfPins ) {

    var locs = [];

    // For each pin in the array of pins,
      // Calculate the relative x and z ( where -x is west, x is east, -z is north, and z is south )
      // Each unit being a foot.



    _.each( objectOfPins, function( pin ) {
      locs.push( Location.relativeLocsInFeet( currentLocation, pin ) );
    });

    return locs;
  }

  sendLocsToBridge( props ) {
    var locs = JSON.stringify( this.calculateLocs( props.currLoc, props.pins ) );
    this.refs.webviewbridge.sendToBridge( locs );
  }

  onBridgeMessage( message ) {
    if( message === "BRIDGE_READY" ) {

      this.sendLocsToBridge( this.props );
    }
  }

  // TODO: When we receive a new state, we should recalculate the rendered pins and send them to the webview.
  componentDidUpdate( prevProps ) {
    this.sendLocsToBridge( prevProps );
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <View style={styles.webviewcont}>
          <WebViewBridge
            ref={ REF_WEBVIEW_BRIDGE }
            automaticallyAdjustContentInsets={true}
            source={{ html: HTML }}
            style={styles.webView}
            onBridgeMessage={this.onBridgeMessage.bind(this)}
            injectedJavaScript={ BRIDGE_INJECT_SCRIPT }
            javaScriptEnabled={true}
            scalesPageToFit={true}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    position: 'absolute',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  webviewcont: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent'
  },
  webView: {
    backgroundColor: 'transparent'
  },
});
