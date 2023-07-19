import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import { successMsg } from "../services/feedbacksService";
import { deleteCard } from "../services/cardService";

interface DeleteProductModalProps {
  show: boolean;
  onHide: Function;
  cardId: number;
  render: Function;
  cardTitle: string;
}

const DeleteProductModal: FunctionComponent<DeleteProductModalProps> = ({
  show,
  onHide,
  cardId,
  render,
  cardTitle,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => onHide()}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Business Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this business's card:
          <span className="fw-bold"> {cardTitle}</span> ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() =>
              deleteCard(cardId)
                .then((res) => {
                  render();
                  onHide();
                  successMsg(`${cardTitle} business card was deleted successfully!`);
                })
                .catch((err) => console.log(err))
            }
          >
            Yes
          </Button>
          <Button variant="danger" onClick={() => onHide()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteProductModal;
