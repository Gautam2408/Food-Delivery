import { useContext, useState } from "react";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { updateOrderData } from "../http";
import { ProgressContext } from "../store/UserProgressContext";
import Input from "./UI/Input";
import ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";

export default function CheckoutModal({ totalPrice }) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState();
  const cxtVal = useContext(CartContext);
  const progressCtx = useContext(ProgressContext);

  async function storeFormData(customer) {
    //console.log(JSON.stringify({ orderData }));
    setIsSending(true);
    try {
      const result = await updateOrderData({
        items: cxtVal.items,
        customer,
      });
      // console.log(result);
      progressCtx.showProgress("success");
    } catch (error) {
      // console.log(error);
      // console.log("a");
      setError(error.message || "Error Occured");
      progressCtx.showProgress("loadError");
    }

    setIsSending(false);
  }

  function handelSubmit(event) {
    // console.log("submit");
    event.preventDefault();
    const fd = new FormData(event.target);
    const customer = Object.fromEntries(fd.entries());

    //console.log(order);
    storeFormData(customer);
  }

  function handleCloseCheckout() {
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
    progressCtx.hideProgress("");
  }

  function handleCloseErrorModal() {
    // console.log("****************8");
    progressCtx.hideProgress("");
  }

  function handleCloseSuccessModal() {
    progressCtx.hideProgress("");
    cxtVal.items.splice(0);
  }

  return (
    <>
      <SuccessModal
        openModal={progressCtx.progress === "success"}
        onCloseSuccessModal={handleCloseSuccessModal}
      />
      <ErrorModal
        openModal={progressCtx.progress === "loadError"}
        title="Failed to submit order data"
        message={error}
        onCloseErrorModal={handleCloseErrorModal}
      />
      <Modal
        open={progressCtx.progress === "checkout"}
        onClose={
          progressCtx.progress === "checkout" ? handleCloseCheckout : null
        }
      >
        <form onSubmit={handelSubmit}>
          <h2>Checkout</h2>
          <p>Total Amount: {totalPrice}</p>
          <Input label="Full Name" type="text" id="name" />
          <Input label="E-mail Address" type="email" id="email" />
          <Input label="Street" type="text" id="street" />
          <div className="control-row">
            <Input label="Postal Code" type="text" id="postal-code" />
            <Input label="City" type="text" id="city" />
          </div>
          <p className="modal-actions">
            {isSending ? (
              <span>Sending order data....</span>
            ) : (
              <>
                <Button textOnly type="button" onClick={handleCloseCheckout}>
                  Close
                </Button>
                <Button>Submit Order</Button>
              </>
            )}
          </p>
        </form>
      </Modal>
    </>
  );
}
