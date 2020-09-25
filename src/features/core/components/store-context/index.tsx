import React, { useMemo } from "react";

import { useLocalStore } from "mobx-react-lite";

import { StoreState } from "../stores-types";
import { createCoreStore } from "../../store";

type StoreProviderProps = {
  children?: React.ReactNode;
};

export const StoreProvider: React.FC = ({ children }: StoreProviderProps) => {
  const core = useLocalStore(createCoreStore);

  const store = useMemo(() => ({ core }), [core]);

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const storeContext = React.createContext<StoreState | null>(null);

export default StoreProvider;
