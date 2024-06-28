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

  const getTotalCartAmount = () => {
    // This function used to calculated the total amount of price in cartItems which will be then used in the Cart.jsx page
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        // get item info from the food_list array of object by using item key in the cartItems (item key is the product id of the object in food_list)
        // itemInfo will retutn the product object if the item key is matching with the product id in food_list
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCarts,
    removeFromCarts,
    getTotalCartAmount,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
