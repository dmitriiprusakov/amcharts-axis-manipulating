import { StoreState } from "features/core/components/stores-types";
import { storeContext } from "features/core/components/store-context";
import { useStoreData } from "./use-store-data";

export const useRootData = <Selection>(
  dataSelector: (store: StoreState) => Selection
): Selection =>
  useStoreData(storeContext, (contextData) => contextData!, dataSelector);
