import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SiteTheme } from "../App";
import { successMsg } from "../services/feedbacksService";
import { getUserByEmail } from "../services/usersService";
import UserProfileModal from "./UserProfileModal";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: Function;
  userInfo: any;
  setUserInfo: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({
  setDarkMode,
  darkMode,
  userInfo,
  setUserInfo,
}) => {
  let theme = useContext(SiteTheme);
  let [userProfileModal,setOpenUserProfileModal] = useState<boolean>(true)
  let [userProfile,setUserProfile] = useState<any>({
    id:0,
  firstName: "",
  middleName:"",
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
  })
  let navigate = useNavigate();
  let signOut = () => {
    sessionStorage.removeItem("userInfo");
    setUserInfo({ email: false, role: false });
    navigate("/");
    successMsg("You'v just signed out");
  };
    useEffect(() => {
    getUserByEmail(userInfo.email).then((res)=> {setUserProfile(res.data[0])
    }).catch((err)=> console.log(err))
  }, [userInfo.email]);

  return (
    <>
        <div>
      <nav
        className="navbar navbar-expand-md bg-body-tertiary "
        data-bs-theme={`${theme}`}
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold" to="/">
            M.Y.O.B
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/about">
                  About
                </NavLink>
              </li>
              {userInfo.email  && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/favorites">
                      Fav Cards
                    </NavLink>
                  </li>
                  {(userInfo.role === "business" || userInfo.role ==="admin") && (
                    <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/mycards">
                      My Cards
                    </NavLink>
                  </li>
                  { userInfo.role ==="admin" && (
                    
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/usersmanagement">
                      Admin
                    </NavLink>
                  </li>
                  )}
                  </>
                  )}
                </>
              )} 
            </ul>

            <form className="d-flex">
              <div className="container">
                <div className="row justify-content-center mt-1">
                  <div className="col-md-12">
                    <div className="search-bar">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                      />
                      <i className="search-icon fa-solid fa-magnifying-glass"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input mt-3"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={() => {
                    setDarkMode(!darkMode);
                    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
                  }}
                  checked={JSON.parse(localStorage.getItem("darkMode")!)}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                ></label>
              </div>
              {userInfo.email  && (
                <>
              <button className="btn btn-outline" onClick={signOut}>
                SignOut
              </button>
              <Link to="" onClick={()=>setOpenUserProfileModal(true)}><img src={userProfile.userImgURL}               
              className="rounded-circle" width="50"
               alt="user"></img></Link>
              
               </>
              )}
 {!userInfo.email && (
                <>
              <Link to="/signup" className="btn btn-outline">
                SignUp
              </Link>
              <Link to="/signin" className="btn btn-outline">
                SignIn
              </Link>
</>)}
            </form>
          </div>
        </div>
      </nav>
    </div>

     <UserProfileModal
          show={userProfileModal}
          onHide={() => setOpenUserProfileModal(false)}
          // render={render}
           userInfo= {userInfo}
           setUserInfo={setUserInfo}
        />
    </>

  );
};

export default Navbar;
