import { FunctionComponent, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { successMsg } from "../services/feedbacksService";
import { SiteTheme } from "../App";
import { activateUser } from "../services/usersService";

interface LockUserModalProps {
  show: boolean;
  onHide: Function;
  render: Function;
  userId: number;
  userFirstName: number;
  userLastName: number;
  isActive: boolean
}

const LockUserModal: FunctionComponent<LockUserModalProps> = ({
  show,
  onHide,
  render,
  userId,
  userFirstName,
  userLastName,
  isActive
}) => {
  let theme = useContext(SiteTheme);
  return (
    <>
      <Modal
        className={`${theme} set-modal`}
        show={show}
        onHide={() => onHide()}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Lock/Unlock User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isActive ? (<p>Are you sure you want to LOCK
            <span className="fw-bold"> "{userFirstName} {userLastName}"</span> ?</p>) : (<p>Are you sure you want to UNLOCK
              <span className="fw-bold"> "{userFirstName} {userLastName}"</span> ?</p>)}

        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() =>
              activateUser(userId, !isActive)
                .then((res) => {
                  render();
                  onHide();
                  isActive ? (successMsg(`User ${userFirstName} ${userLastName} was LOCKED !`)) : (successMsg(`User ${userFirstName} ${userLastName} is now UNLOCKED!`))

                })
                .catch((err) => console.log(err))}>Yes</Button>
          <Button variant="secondary" onClick={() => onHide()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LockUserModal;
