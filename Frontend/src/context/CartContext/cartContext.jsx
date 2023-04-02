import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  items: [],
  getProductQty: () => {},
  addOneProductToCart: () => {},
  removeOneProductFromCart: () => {},
  deleteCart: () => {},
  getTotalPrice: () => {},
});

const initState = [];

const getUserCartLocal = () => {
  const cart = localStorage.getItem("userCart");
  return cart ? JSON.parse(cart) : initState;
};

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState(getUserCartLocal);

  useEffect(() => {
    localStorage.setItem("userCart", JSON.stringify(cartProducts));
  }, [cartProducts]);

  function getProductQty(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  function addOneProductToCart(id) {
    const quantity = getProductQty(id);

    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function removeOneProductFromCart(id) {
    const quantity = getProductQty(id);

    if (quantity == 1) {
      deleteCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((product) => {
        return product.id !== id;
      })
    );
  }

  function getTotalPrice() {
    let totalPrice = 0;
    cartProducts.map((item) => {
      const productData = item.id;
      totalPrice += productData.price * item.quantity;
    });
    return totalPrice;
  }

  const contextValue = {
    items: cartProducts,
    getProductQty,
    addOneProductToCart,
    removeOneProductFromCart,
    deleteCart,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
