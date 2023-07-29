import { FunctionComponent, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { successMsg } from "../services/feedbacksService";
import { deleteCard } from "../services/cardService";
import { SiteTheme } from "../App";
import { deleteUserById } from "../services/usersService";

interface DeleteUserModalProps {
  show: boolean;
  onHide: Function;
  render: Function;
  userId: number;
  userFirstName: number;
  userLastName: number;
}

const DeleteUserModal: FunctionComponent<DeleteUserModalProps> = ({
  show,
  onHide,
  render,
  userId,
  userFirstName,
  userLastName,
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
          <span className="fw-bold"> "{userFirstName} {userLastName}"</span> ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() =>
              deleteUserById(userId)
                .then((res) => {
                  render();
                  onHide();
                  successMsg(`The User of ${userFirstName} ${userLastName} was deleted successfully!`);
                })
                .catch((err) => console.log(err)) }>Yes</Button>
          <Button variant="secondary" onClick={() => onHide()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteUserModal;