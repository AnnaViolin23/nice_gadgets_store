import React, { useContext } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FavContextType = {
  fav: Product[];
  setFav: (value: Product[]) => void;
  handleAddToFav: (item: Product) => void;
};

export const FavContext = React.createContext<FavContextType>({
  fav: [],
  setFav: () => { },
  handleAddToFav: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const FavProvider: React.FC<Props> = ({ children }) => {
  const [fav, setFav] = useLocalStorage<Product>('fav', []);

  function handleAddToFav(item: Product) {
    if (fav.find(prod => prod.itemId === item.itemId)) {
      setFav([...fav].filter(prod => prod.itemId !== item.itemId));
    } else {
      setFav([...fav, item]);
    }
  }

  const value = ({
    fav,
    setFav,
    handleAddToFav,
  });

  return (
    <FavContext.Provider value={value}>
      {children}
    </FavContext.Provider>
  );
};

export const useFav = () => {
  return useContext(FavContext);
};
