import CartModal from "./components/CartModal";
import Header from "./components/Header";
import Products from "./components/Products";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContext } from "./store/UserProgressContext";

function App() {
  return (
    <UserProgressContext>
      <CartContextProvider>
        <Header />
        <Products />
        <CartModal />
      </CartContextProvider>
    </UserProgressContext>
  );
}

export default App;
