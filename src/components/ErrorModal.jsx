import Button from "./UI/Button";
import Modal from "./UI/Modal";
export default function ErrorModal({
  openModal,
  title,
  message,
  onCloseErrorModal,
}) {
  console.log(message, onCloseErrorModal);
  return (
    <Modal open={openModal} className="error" onClose={onCloseErrorModal}>
      <h2>{title}</h2>
      <p>{message}</p>
      <Button type="button" onClick={onCloseErrorModal}>
        Okay
      </Button>
    </Modal>
  );
}
