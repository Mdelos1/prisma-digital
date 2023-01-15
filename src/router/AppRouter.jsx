import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom"
import CodeVerificaction from "../components/login/CodeVerification";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";


// import Navigationbar from "./components/nav/Navigationbar";
import DashBoardRouter from "./DashBoardRouter";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

import IniciarSesion from "../components/login/IniciarSesion";
import Registrarse from "../components/login/Registrarse";



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [check, setCheck] = useState(true);
  const userStore = useSelector((store) => store.userStore);
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setIsLoggedIn(true);

      } else {
        setIsLoggedIn(false);
      }
      setCheck(false)
      if (Object.entries(userStore).length === 0) {
        const {
          displayName,
          email,
          phoneNumber,
          accessToken,
          photoURL,
          uid,
        } = user.auth.currentUser;
        dispatch(
          actionLoginSync({
            name: displayName,
            email,
            accessToken,
            phoneNumber,
            avatar: photoURL,
            uid,
            error: false,
          })
        );
      }

    }

    );
  }, [setIsLoggedIn, dispatch, userStore]);

  return (
    <HashRouter>
      <div className="App">


        <Routes>

          <Route element={<PublicRouter isAuthentication={isLoggedIn} />}>
            <Route path="/register" element={<Registrarse />} />
            <Route path="/verification" element={<CodeVerificaction />} />
            <Route path="/" element={<IniciarSesion />} />
          </Route>
          <Route element={<PrivateRouter isAuthentication={isLoggedIn} />}>
            <Route path="/*" element={<DashBoardRouter />} />
          </Route>
          {/* <Route path="*" element={<Nomtach/>}/> */}
        </Routes>

      </div>
    </HashRouter>
  )
}

export default App
