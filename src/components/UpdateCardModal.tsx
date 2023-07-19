import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import UpdateCard from "./UpdateCard";

interface UpdateCardModalProps {
  show: boolean;
  onHide: Function;
  render: Function;
  userInfo: any;
  cardId:number;
  cardTitle:string;
    
}
 
const UpdateCardModal: FunctionComponent<UpdateCardModalProps> = ({ show,onHide, render,userInfo,cardId,cardTitle}) => {
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
          <Modal.Title className="display-3">{`Update ${cardTitle} Card`}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <UpdateCard onHide={onHide} render={render} userInfo={userInfo} cardId={cardId} cardTitle={cardTitle}/>
        </Modal.Body>
      </Modal>
    </div> );
}
 
export default UpdateCardModal;