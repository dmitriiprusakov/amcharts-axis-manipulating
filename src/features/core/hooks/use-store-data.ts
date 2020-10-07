import React from "react";

// import { useObserver } from 'mobx-react-lite';

export const useStoreData = <Selection, ContextData, Store>(
  context: React.Context<ContextData>,
  storeSelector: (contextData: ContextData) => Store,
  dataSelector: (store: Store) => Selection
): Selection => {
  const value = React.useContext(context);
  if (!value) {
    throw new Error();
  }
  const store = storeSelector(value);
  return dataSelector(store);
  // return useObserver(() => {
  //   return dataSelector(store);
  // });
};
