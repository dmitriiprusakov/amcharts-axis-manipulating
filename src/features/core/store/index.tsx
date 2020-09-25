/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const createCoreStore = () => {
  return {
    isLoaded: 0,
  };
};

export type CoreStore = ReturnType<typeof createCoreStore>;
