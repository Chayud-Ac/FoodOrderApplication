import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
// StoreContext allows components to access shared data without passing props manually
// We create food_list using store context allowing every component to access
{
  /* <StoreContextProvider>
<App /> // All component in App Component are now allowed to access StoreContext variable
</StoreContextProvider> */
}

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // create cartItems for storing the added Items
  const [cartItems, setCartItems] = useState({});

  const addToCarts = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prevState) => ({ ...prevState, [itemId]: 1 }));
    } else {
      setCartItems((prevState) => ({
        ...prevState,
        [itemId]: prevState[itemId] + 1,
      }));
    }
  };

  const removeFromCarts = (itemId) => {
    setCartItems((prevState) => ({
      ...prevState,
      [itemId]: prevState[itemId] - 1,
    }));
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCarts,
    removeFromCarts,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
