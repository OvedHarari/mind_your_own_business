import { FunctionComponent, useContext } from "react";
import { Modal } from "react-bootstrap";
import UpdateCard from "./UpdateCard";
import { SiteTheme } from "../App";

interface UpdateCardModalProps {
  show: boolean;
  onHide: Function;
  render: Function;
  cardId: number;
  cardTitle: string;
}

const UpdateCardModal: FunctionComponent<UpdateCardModalProps> = ({ show, onHide, render, cardId, cardTitle }) => {
  let theme = useContext(SiteTheme);
  return (<div
    className="modal show"
    style={{ display: "block", position: "initial" }}  >
    <Modal
      className={`${theme} set-modal`}
      show={show}
      onHide={() => onHide()}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="display-3">{`Update ${cardTitle} Card`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <UpdateCard onHide={onHide} render={render} cardId={cardId} cardTitle={cardTitle} />
      </Modal.Body>
    </Modal>
  </div>);
}

export default UpdateCardModal;