import { createContext } from "react";
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
  const contextValue = {
    food_list,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
