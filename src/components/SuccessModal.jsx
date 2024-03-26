import Button from "./UI/Button";
import Modal from "./UI/Modal";

export default function SuccessModal({ openModal, onCloseSuccessModal }) {
  return (
    <Modal open={openModal} onClose={onCloseSuccessModal}>
      <h2>Success</h2>
      <p>Your order was submitted successfully</p>
      <p>
        We will get back to you with more details via email within next few
        minutes
      </p>
      <Button onClick={onCloseSuccessModal}>Okay</Button>
    </Modal>
  );
}
