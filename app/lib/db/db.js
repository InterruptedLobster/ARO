const Firebase = require('firebase');
export const ref = new Firebase("https://interruptedlobster.firebaseio.com/");
export const currLoc = ref.child('currLoc');
export let myCurrLoc = currLoc.child('anonymous');
export let user = ref.child('anonymous');
export let userData = user.child('pins');
export let userRecent = user.child('recent');
export const refTest = new Firebase("https://interruptedlobster.firebaseio.com/");

export const changeUser = function( uid ) {
  if( typeof uid !== 'string' ) {
    console.error( 'uid must have typeof string in changeUser( uid )' );
    return;
  }
    user = ref.child( uid );
    myCurrLoc = currLoc.child( uid );
    userData = user.child( 'pins' );
    userRecent = user.child( 'recent' );
};


