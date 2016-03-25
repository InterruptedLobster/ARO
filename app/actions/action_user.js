import { LOG_IN, LOG_OUT} from '../constants/constants.js';
import { refTest } from '../lib/db/db.js';

export const logIn = (payload) => {
  return {
    type: LOG_IN,
    payload
  };
};

export const firebase_check = (userCredentials) => {
  let id = userCredentials.userId;
  console.log('this is user id', id);
  let token = userCredentials.token;
  let api = "https://graph.facebook.com/v2.3/"+id+"?fields=name,email,picture&access_token="+token;
  function checkIfUserExists(userId) {
    refTest.once('value', function(snapshot) {
    let userExistsBool = snapshot.hasChild(userId);
      return userExistsBool;
    });
  }
  return(dispatch) => {
    let userExist = checkIfUserExists(id);
      if(!userExist) {
        let userInfo={};
        userInfo.uid = id;
        //fetch the other info
        return fetch(api)
        .then((response) => response.json())
        .then((responseData)=> {
          userInfo.name = responseData.name;
          userInfo.email = responseData.email;
          userInfo.picture = responseData.picture.data.url;

        //pushes all gathereed infor to database
        let newUser = refTest.child(id).set(userInfo);
        dispatch(logIn(userInfo));
        });
      } else {
        refTest.child(id).on("value", function(snapshot) {
          let found = snapshot.val();
          dispatch(logIn(found));
        });
      }
  };
};

export const logOut = function () {
  return {
    type: LOG_OUT
  };
};

