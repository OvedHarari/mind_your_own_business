import { FunctionComponent, useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { successMsg } from "../services/feedbacksService";
import { SiteTheme } from "../App";
import { changeUserRole } from "../services/usersService";

interface ChangeRoleModalProps {
  show: boolean;
  onHide: Function;
  render: Function;
  userProfile: any;
}

const ChangeRoleModal: FunctionComponent<ChangeRoleModalProps> = ({
  show,
  onHide,
  render,
  userProfile,
}) => {
  let theme = useContext(SiteTheme);
  let [selectedRole, setSelectedRole] = useState<string>(userProfile.role)
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

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
          <Modal.Title>Select the new Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select className="form-select form-select-sm" style={{ width: "10rem" }} aria-label="Small select example" value={selectedRole}
            onChange={handleRoleChange} >
            <option value="casual">Casual</option>
            <option value="business">Business</option>
            <option value="admin">Admin</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() =>
              changeUserRole(userProfile.id, selectedRole as string)
                .then((res) => {
                  render();
                  onHide();
                  successMsg(`${userProfile.firstName} ${userProfile.lastName} is now ${selectedRole}`)
                })
                .catch((err) => console.log(err))}>Save</Button>
          <Button variant="secondary" onClick={() => onHide()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangeRoleModal;
