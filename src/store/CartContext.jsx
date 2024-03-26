import { createContext, useReducer } from "react";
export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEMS") {
    const updatedItems = [...state.items];

    const existingItemIdx = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    if (existingItemIdx > -1) {
      const existingItem = state.items[existingItemIdx];
      const updateItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[existingItemIdx] = updateItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEMS") {
    const updatedItems = [...state.items];

    const removeItemIdx = state.items.findIndex(
      (item) => item.id === action.id
    );

    const removeItem = state.items[removeItemIdx];

    if (removeItem.quantity === 1) {
      updatedItems.splice(removeItemIdx, 1);
    } else {
      const updatedItem = { ...removeItem, quantity: removeItem.quantity - 1 };
      updatedItems[removeItemIdx] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCart] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item) {
    dispatchCart({ type: "ADD_ITEMS", item });
  }

  function removeItem(id) {
    dispatchCart({ type: "REMOVE_ITEMS", id });
  }

  const cartContextValue = {
    items: cart.items,
    addItem,
    removeItem,
  };

  console.log(cart);

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}
