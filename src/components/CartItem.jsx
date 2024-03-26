import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import { CartContext } from "../store/CartContext";
export default function CartItem({ meal }) {
  const cxtVal = useContext(CartContext);

  function handleMinusButton() {
    cxtVal.removeItem(meal.id);
  }

  function handleAddButton() {
    cxtVal.addItem(meal);
  }

  return (
    <li className="cart-item">
      <p>
        {meal.name} - {meal.quantity} x {currencyFormatter.format(meal.price)}
      </p>
      <p className="cart-item-actions">
        <button textOnly onClick={handleMinusButton}>
          -
        </button>
        <span>{meal.quantity}</span>
        <button textOnly onClick={handleAddButton}>
          +
        </button>
      </p>
    </li>
  );
}
