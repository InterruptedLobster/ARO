import { LOG_IN, LOG_OUT} from '../constants/constants.js';
import { ref } from '../lib/db/db.js';

export const logIn = (payload) => {
  return {
    type: LOG_IN,
    payload
  };
};

export const firebase_check = (userCredentials) => {
  let id = userCredentials.userId;
  let token = userCredentials.token;
  let api = "https://graph.facebook.com/v2.3/"+id+"?fields=name,email,picture&access_token="+token;
  function checkIfUserExists(userId) {
    ref.once('value', function(snapshot) {
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
        let newUser = ref.child(id).set(userInfo);
        dispatch(logIn(userInfo));
        });
      } else {
        ref.child(id).on("value", function(snapshot) {
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
