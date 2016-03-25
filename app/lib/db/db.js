const Firebase = require('firebase');
export const ref = new Firebase("https://interruptedlobster.firebaseio.com/tiff");
export const refTest = new Firebase("https://interruptedlobster.firebaseio.com/");
export const userData = ref.child('user');
export const userRecent = ref.child('recent');
