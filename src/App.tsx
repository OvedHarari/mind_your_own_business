import { createContext, useState } from "react";
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

let theme = {
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
          />
          <Routes>
            <Route path="/" element={<Bcards userInfo={userInfo} setUserInfo={setUserInfo} />} />
            <Route path="/signin" element={<SignIn setUserInfo={setUserInfo} />} />
            <Route path="/signup" element={<SignUp setUserInfo={setUserInfo} />} />
            <Route path="/mycards" element={<MyCards setUserInfo={setUserInfo} userInfo={userInfo} />}/>
            <Route path="/favorites" element={<Favorites setUserInfo={setUserInfo} userInfo={userInfo} />}/>
            <Route path="/usersmanagement" element={<UsersManagement />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
    </SiteTheme.Provider>
  );
}

export default App;
