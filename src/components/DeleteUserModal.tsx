import { FunctionComponent, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { successMsg } from "../services/feedbacksService";
import { SiteTheme } from "../App";
import { deleteUserById } from "../services/usersService";

interface DeleteUserModalProps {
  show: boolean;
  onHide: Function;
  render: Function;
  userProfile: any;
}

const DeleteUserModal: FunctionComponent<DeleteUserModalProps> = ({
  show,
  onHide,
  render,
  userProfile
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
          <Modal.Title>User Deletion!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          <span className="fw-bold"> "{userProfile.firstName} {userProfile.lastName}"</span> ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() =>
              deleteUserById(userProfile.id)
                .then((res) => {
                  render();
                  onHide();
                  successMsg(`The User of ${userProfile.firstName} ${userProfile.lastName} was deleted successfully!`);
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

export default DeleteUserModal;
