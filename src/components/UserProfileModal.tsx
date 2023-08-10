import { FunctionComponent, useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UserProfile from "./UserProfile";
import { SiteTheme } from "../App";

interface UserProfileModalProps {
  show: boolean;
  onHide: Function;
  userInfo: any;
  userProfile: any;
  setUserProfile: Function;
  render: Function;
  passwordShown: boolean;
  togglePassword: Function;
}

const UserProfileModal: FunctionComponent<UserProfileModalProps> = ({ show, onHide, userInfo, userProfile, setUserProfile, render, passwordShown, togglePassword }) => {
  let theme = useContext(SiteTheme);
  let [editForm, setEditForm] = useState<boolean>(true)

  return (<div
    className="modal show"
    style={{ display: "block", position: "initial" }}
  >
    <Modal
      className={`${theme} set-modal`}
      show={show}
      onHide={() => { onHide(); setEditForm(true) }}
      keyboard={false}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered  >
      <Modal.Header closeButton>
        <div className="row w-100">
          <div className="col-12 text-center">
            <img src={userProfile ? (`${userProfile.userImgURL}`) : ("")}
              className="img-fluid rounded-start"
              alt="Set Profile Pic"
              style={{ maxWidth: "200px" }} />
            <Modal.Title className="display-3">
              User Profile</Modal.Title>
          </div>
          <div className="col-3 w-100 text-end ">
            <Button variant="secondary" onClick={() => setEditForm(false)}>
              Edit Profile <i className="fa-solid fa-pen-to-square"></i>
            </Button>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body>
        <UserProfile onHide={onHide}
          userInfo={userInfo}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          editForm={editForm}
          setEditForm={setEditForm}
          render={render}
          passwordShown={passwordShown}
          togglePassword={togglePassword}
        />
      </Modal.Body>
    </Modal>
  </div>);
}

export default UserProfileModal;