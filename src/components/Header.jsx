import Logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";
import { useContext, useState } from "react";
import { ProgressContext } from "../store/UserProgressContext";

export default function Header() {
  const cxtVal = useContext(CartContext);
  const progressCtx = useContext(ProgressContext);

  const cartItems = cxtVal.items.reduce(
    (totalItems, item) => totalItems + item.quantity,
    0
  );

  function handleOpenCart() {
    progressCtx.showProgress("cart");
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={Logo} alt="Food Order Logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleOpenCart}>
          Cart ({cartItems})
        </Button>
      </nav>
    </header>
  );
}
