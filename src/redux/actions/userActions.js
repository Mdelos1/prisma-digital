import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, database } from "../../firebase/firebaseConfig";
import { google } from "../../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { userTypes } from "../types/userTypes";

const searchInfo=async(uid,displayName,email,photoURL,phoneNumber)=>{
  const docRef=doc(dataBase,`usuarios/${uid}`)
        const docu=  await  getDoc(docRef)
        const dataFinal= docu.data()
        console.log(dataFinal);
        
        if (dataFinal) {
          
        }
        else{
          setDoc(docRef,{email:email,rol:"usuario",name:displayName,phoneNumber,avatar: photoURL})

        }

}

export const actionSignPhoneAsync = (codigo) => {
  return (dispatch) => {
    const confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(codigo)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const { displayName, email, phoneNumber, accessToken, photoURL, uid } =
          user.auth.currentUser;
        dispatch(
          actionSignPhoneSync({
            name: displayName,
            email,
            accessToken,
            phoneNumber,
            avatar: photoURL,
            uid,
            error: false,
          })
        );
        searchInfo(uid, displayName, email, photoURL, phoneNumber)


      })
      .catch((error) => {
        console.log(error);
        dispatch(
          actionSignPhoneSync({ error: true, errorMessage: error.message })
        );
      });
  };
};
export const actionSignPhoneSync = (user) => {
  return {
    type: userTypes.USER_SIGNPHONE,
    payload: { ...user },
  };
};
export const actionAuthenticationSync = () => {
  return {
    type: userTypes.USER_AUTHENTICATION,
  };
};

export const actionRegisterAsync = ({ email, password, name, avatar, phoneNumber }) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        console.log(user);
        const { accessToken } = user.auth.currentUser;
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: avatar,
          phoneNumber
        });
        dispatch(
          actionRegisterSync({
            email,
            name,
            accessToken,
            photoURL: avatar,
            phoneNumber,
            error: false,
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        dispatch(actionRegisterSync({ error: true, errorMessage }));
      });
  };
};
const actionRegisterSync = (user) => {
  return {
    type: userTypes.USER_REGISTER,
    payload: { ...user },
  };
};

export const actionLoginAsync = ({ email, password }) => {
  return (dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const { displayName, accessToken, phoneNumber } = user.auth.currentUser
        dispatch(actionLoginSync({
          email, name: displayName,
          accessToken,
          phoneNumber,
          error: false
        }))
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        dispatch(actionLoginSync({
          email,
          error: true,
          errorMessage
        }))
      })

  }
}

export const loginProviderAsync = (provider) => {
  return (dispatch) => {
    signInWithPopup(auth, google)
      .then((result) => {
        const user = result.user;
        console.log(user)
        const { displayName, accessToken, photoURL, phoneNumber } = user.auth.currentUser
        dispatch(actionLoginSync({
          email: user.email,
          name: displayName,
          accessToken,
          avatar: photoURL,
          phoneNumber,
          error: false
        }))
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        dispatch(actionLoginSync({
          error: true,
          errorMessage
        }))
      })
  }
}

export const actionLoginSync = (user) => {
  return {
    type: userTypes.USER_LOGIN,
    payload: { ...user }
  }
}

export const actionLogoutAsync = () => {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(actionLogoutSync())
      })
      .catch((error) => {
        console.log(error);
      })
  }
}
const actionLogoutSync = () => {
  return {
    type: userTypes.USER_LOGOUT
  }

}