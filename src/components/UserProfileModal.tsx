import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UserProfile from "./UserProfile";
import { SiteTheme } from "../App";
import User from "../interfaces/User";
import { getUserByEmail } from "../services/usersService";

interface UserProfileModalProps {
    show:boolean;
    onHide:Function;
    userInfo:any;
    setUserInfo:Function;
}
 
const UserProfileModal: FunctionComponent<UserProfileModalProps> = ({show,onHide,userInfo,setUserInfo}) => {
    let theme = useContext(SiteTheme);
    let [editForm,setEditForm] = useState<boolean>(true)
let [userProfile,setUserProfile] = useState<User>({
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
      
       useEffect(() => {
    getUserByEmail(userInfo.email).then((res)=> {setUserProfile(res.data[0])
    }).catch((err)=> console.log(err))
  }, [userInfo.email]);
    return ( <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
      className={`${theme} set-modal`} 
        show={show}
        onHide={() => onHide()}
        // backdrop="static"
        keyboard={false}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered  >
        <Modal.Header closeButton>
            <div className="row w-100">
             <div className="col-12 text-center">
            <img src={userProfile.userImgURL}
                className="img-fluid rounded-start"
                alt="Set Profile Pic"
                style={{ maxWidth: "200px" }}
              />
              
              {/* <div className="col-6 text-start mt-5"> */}
          <Modal.Title className="display-3">
             User Profile</Modal.Title>
             {/* </div> */}
             </div>
             <div className="col-3 w-100 text-end ">
              <Button variant="secondary" onClick={()=>setEditForm(!editForm)}>
            Edit Profile <i className="fa-solid fa-pen-to-square"></i>
          </Button>
          </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <UserProfile onHide={onHide} 
        //   render={render} 
        setUserInfo={setUserInfo}
          userInfo={userInfo} 
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          editForm={editForm}
          setEditForm={setEditForm}

          />
        </Modal.Body>
      </Modal>
    </div>  );
}
 
export default UserProfileModal;