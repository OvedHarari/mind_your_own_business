import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";

interface BusinessDetailsProps {
    onHide:Function;
    render:Function; 
    userInfo:any;
    cardId:number;
    cardTitle:string;
}
 
const BusinessDetails: FunctionComponent<BusinessDetailsProps> = ({onHide,render,userInfo, cardId,cardTitle}) => {
    return ( <>
    business details
     {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>business details</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
       */}
      </> );
}
 
export default BusinessDetails;