import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Bcards from "./components/Bcards";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PageNotFound from "./components/PageNotFound";
import UsersManagement from "./components/UsersManagement";
import MyCards from "./components/MyCards";
import Favorites from "./components/Favorites";
import { getUserByEmail } from "./services/usersService";
import About from "./components/About";
import Map from "./components/BusinessMap";


const theme = {
  light: "light",
  dark: "dark",
};
export let SiteTheme = createContext(theme.light);

function App() {
  let [darkMode, setDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("darkMode")!)
  );
  let [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo") as string) == null
      ? { email: false, isAdmin: false }
      : JSON.parse(sessionStorage.getItem("userInfo") as string)
  );
  let [dataUpdated, setDataUpdated] = useState<boolean>(false);
  let render = () => setDataUpdated(!dataUpdated)
  let [userProfile, setUserProfile] = useState<any>({
    id: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    userImgURL: "",
    gender: "",
    role: "",
    country: "",
    state: "",
    city: "",
    street: "",
    houseNumber: "",
    zipcode: "",
    isActive: ""
  })
  let [passwordShown, setPasswordShown] = useState(false);
  let togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    getUserByEmail(userInfo.email).then((res) => {
      setUserProfile(res.data[0]);
    }).catch((err) => console.log(err))
  }, [userInfo.email, dataUpdated]);
  return (
    <SiteTheme.Provider value={darkMode ? theme.dark : theme.light}>
      <ToastContainer theme={`${darkMode ? "dark" : "light"}`} />
      <div className={`App  ${darkMode ? "dark" : "light"}`}>
        <Router>
          <Navbar
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            setDarkMode={setDarkMode}
            darkMode={darkMode}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            render={render}
            passwordShown={passwordShown}
            togglePassword={togglePassword}
          />
          <Routes>
            <Route path="/" element={<Bcards userInfo={userInfo} setUserInfo={setUserInfo} />} />
            <Route path="/signin" element={<SignIn setUserInfo={setUserInfo} passwordShown={passwordShown} togglePassword={togglePassword} />} />
            <Route path="/signup" element={<SignUp setUserInfo={setUserInfo} passwordShown={passwordShown}
              togglePassword={togglePassword} />} />
            <Route path="/mycards" element={<MyCards userInfo={userInfo} />} />
            <Route path="/favorites" element={<Favorites setUserInfo={setUserInfo} userInfo={userInfo} />} />
            <Route path="/about" element={<About userInfo={userInfo} />} />
            <Route path="/map" element={<Map />} />
            <Route path="/usersmanagement" element={<UsersManagement darkMode={darkMode} render={render} setUserInfo={setUserInfo} userProfile={userProfile} setUserProfile={setUserProfile} passwordShown={passwordShown} togglePassword={togglePassword} userInfo={userInfo} dataUpdated={dataUpdated} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
    </SiteTheme.Provider>
  );
}

export default App;
