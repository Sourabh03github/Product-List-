import { createContext, useEffect, useState } from "react";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export const Context = createContext(null);

const ProductContext = ({ children }) => {
  // list of products
  const [products, setProducts] = useState([]);

  // loading state
  const [loading, setLoading] = useState(false);

  // favorites

  const [favoriteItem, setFavoriteItems] = useState([]);

  const addToFavorites = (productId, reason) => {
    let cpyfavoriteItems = [...favoriteItem];
    const index = cpyfavoriteItems.findIndex((item) => item.id === productId);
    if (index === -1) {
      const getCurrentProductItem = products.find(
        (item) => item.id === productId
      );
      cpyfavoriteItems.push({
        title: getCurrentProductItem.title,
        id: productId,
        reason,
      });
    } else {
      cpyfavoriteItems[index] = {
        ...cpyfavoriteItems[index],
        reason,
      };
    }
    setFavoriteItems(cpyfavoriteItems);
  };

  const handleRemovefavorites = (getCurrentId) => {
    let cpyfavoriteItems = [...favoriteItem];

    cpyfavoriteItems = cpyfavoriteItems.filter(
      (item) => item.id !== getCurrentId
    );
    setFavoriteItems(cpyfavoriteItems);
  };

  useEffect(() => {
    setLoading(true);
    async function getProductsFromApi() {
      const apiRes = await fetch("https://dummyjson.com/products");
      const finalResult = await apiRes.json();
      if (finalResult) {
        setLoading(false);
        setProducts(finalResult.products);
      }
    }
    getProductsFromApi();
  }, []);

  console.log(favoriteItem);

  return (
    <Context.Provider
      value={{
        products,
        loading,
        handleRemovefavorites,
        addToFavorites,
        favoriteItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ProductContext;
