import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import NewCard from "./NewCard";

interface NewCardModalProps {
  show: boolean;
  onHide: Function;
  render: Function;
  userInfo: any;
    
}
 
const NewCardModal: FunctionComponent<NewCardModalProps> = ({ show,onHide, render,userInfo}) => {
    return ( <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        show={show}
        onHide={() => onHide()}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="display-3">New Business Card</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <NewCard onHide={onHide} render={render} userInfo={userInfo} />
        </Modal.Body>
      </Modal>
    </div> );
}
 
export default NewCardModal;