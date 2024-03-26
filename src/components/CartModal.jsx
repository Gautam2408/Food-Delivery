import { useContext, useState } from "react";
import Modal from "./UI/Modal.jsx";
import CartItem from "./CartItem.jsx";
import Button from "./UI/Button.jsx";
import CheckoutModal from "./CheckoutModal.jsx";
import { CartContext } from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import { ProgressContext } from "../store/UserProgressContext.jsx";
export default function CartModal() {
  const cxtValue = useContext(CartContext);
  const totalPrice = cxtValue.items.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );

  const formattedTotalPrice = currencyFormatter.format(totalPrice);
  const progressCtx = useContext(ProgressContext);

  function handleOpenCheckout() {
    progressCtx.showProgress("checkout");
  }

  function handleCloseCart() {
    progressCtx.hideProgress("");
  }

  return (
    <>
      <CheckoutModal totalPrice={formattedTotalPrice} />
      <Modal
        open={progressCtx.progress === "cart"}
        className="cart"
        onClose={progressCtx.progress === "cart" ? handleCloseCart : null}
      >
        <h2>You Cart</h2>
        <ul>
          {cxtValue.items.map((meal) => (
            <CartItem key={meal.id} meal={meal} />
          ))}
        </ul>
        <p className="cart-total">{formattedTotalPrice}</p>
        <p className="modal-actions">
          <Button textOnly type="button" onClick={handleCloseCart}>
            Close
          </Button>
          {cxtValue.items.length > 0 && (
            <Button onClick={handleOpenCheckout}>Go to Checkout</Button>
          )}
        </p>
      </Modal>
    </>
  );
}
